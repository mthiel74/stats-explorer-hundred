
import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Cat } from 'lucide-react';

type DistributionType = 'uniform' | 'normal' | 'skewed';

const CentralLimitTheoremSimulation = () => {
  const [sampleSize, setSampleSize] = useState(30);
  const [numSamples, setNumSamples] = useState(1000);
  const [distribution, setDistribution] = useState<DistributionType>('uniform');
  const [sampleMeans, setSampleMeans] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const populationDistributions = {
    uniform: {
      name: "Unicorn Lifespans",
      description: "A uniform distribution where every lifespan from 100 to 200 years is equally likely.",
      generator: () => 100 + Math.random() * 100,
    },
    normal: {
      name: "Dragon-Cat Weights",
      description: "A normal distribution (bell curve) of weights, centered around 50kg.",
      generator: () => {
        let u = 0, v = 0;
        while(u === 0) u = Math.random();
        while(v === 0) v = Math.random();
        const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
        return 50 + z * 10; // Mean 50, StdDev 10
      },
    },
    skewed: {
      name: "Gremlin Mischief-Levels",
      description: "A right-skewed distribution. Most gremlins are only slightly mischievous, but a few are off the charts!",
      generator: () => Math.pow(Math.random(), 3) * 1000,
    },
  };

  const runSimulation = () => {
    setIsRunning(true);
    setTimeout(() => {
        const means: number[] = [];
        const populationGenerator = populationDistributions[distribution].generator;

        for (let i = 0; i < numSamples; i++) {
            let sampleSum = 0;
            for (let j = 0; j < sampleSize; j++) {
                sampleSum += populationGenerator();
            }
            means.push(sampleSum / sampleSize);
        }
        setSampleMeans(means);
        setIsRunning(false);
    }, 50); // Small timeout to allow UI to update
  };
  
  const histogramData = useMemo(() => {
    if (sampleMeans.length === 0) return [];

    const min = Math.min(...sampleMeans);
    const max = Math.max(...sampleMeans);
    const numBins = Math.max(20, Math.floor(Math.sqrt(sampleMeans.length) / 2));
    const binWidth = (max - min) / numBins;

    const bins = Array(numBins).fill(0).map((_, i) => ({
      name: (min + i * binWidth).toFixed(2),
      count: 0,
    }));

    sampleMeans.forEach(mean => {
      const binIndex = Math.min(Math.floor((mean - min) / binWidth), numBins - 1);
      if(bins[binIndex]) {
        bins[binIndex].count++;
      }
    });

    return bins;
  }, [sampleMeans]);


  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Tabs value={distribution} onValueChange={(v) => setDistribution(v as DistributionType)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="uniform">Uniform</TabsTrigger>
                <TabsTrigger value="normal">Normal</TabsTrigger>
                <TabsTrigger value="skewed">Skewed</TabsTrigger>
              </TabsList>
            </Tabs>
            <Card>
              <CardHeader>
                <CardTitle>{populationDistributions[distribution].name}</CardTitle>
                <CardDescription>{populationDistributions[distribution].description}</CardDescription>
              </CardHeader>
            </Card>
            <div className="space-y-4">
              <label className="block font-medium">Sample Size (n): <span className="text-primary font-bold">{sampleSize}</span></label>
              <Slider value={[sampleSize]} onValueChange={(v) => setSampleSize(v[0])} min={2} max={500} step={1} />
            </div>
            <div className="space-y-4">
              <label className="block font-medium">Number of Samples: <span className="text-primary font-bold">{numSamples}</span></label>
              <Slider value={[numSamples]} onValueChange={(v) => setNumSamples(v[0])} min={100} max={10000} step={100} />
            </div>
            <Button onClick={runSimulation} className="w-full" disabled={isRunning}>
              <Cat className="mr-2" /> {isRunning ? 'Simulating...' : 'Run Simulation'}
            </Button>
          </div>
          <div className="lg:col-span-2 min-h-[400px]">
            <h3 className="text-lg font-semibold mb-2 text-center">Distribution of Sample Means</h3>
            {sampleMeans.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={histogramData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} interval="preserveStartEnd" tick={{ fontSize: 12 }} />
                  <YAxis allowDecimals={false} />
                  <Tooltip cursor={{fill: 'hsl(var(--muted))'}} />
                  <Bar dataKey="count" name="Frequency">
                    {histogramData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill="hsl(var(--primary))" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Click "Run Simulation" to see the results</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CentralLimitTheoremSimulation;

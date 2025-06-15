
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, Label } from 'recharts';
import { CircleCheck } from 'lucide-react';

// Function to calculate log-likelihood for a binomial distribution
const calculateLogLikelihood = (p: number, trials: number, successes: number): number => {
  if (p === 0 && successes > 0) return -Infinity;
  if (p === 1 && successes < trials) return -Infinity;
  if (p > 0 && p < 1) {
    return successes * Math.log(p) + (trials - successes) * Math.log(1 - p);
  }
  return 0;
};

const MaximumLikelihoodEstimationSimulation = () => {
  const [trueProbability, setTrueProbability] = useState(0.6);
  const [sampleSize, setSampleSize] = useState(100);
  const [sample, setSample] = useState<{ successes: number; trials: number } | null>(null);

  const generateSample = () => {
    let successes = 0;
    for (let i = 0; i < sampleSize; i++) {
      if (Math.random() < trueProbability) {
        successes++;
      }
    }
    setSample({ successes, trials: sampleSize });
  };

  const mle = useMemo(() => {
    if (!sample) return null;
    return sample.successes / sample.trials;
  }, [sample]);

  const likelihoodData = useMemo(() => {
    if (!sample) return [];
    const data = [];
    for (let i = 0; i <= 100; i++) {
      const p = i / 100;
      data.push({
        p: p,
        logLikelihood: calculateLogLikelihood(p, sample.trials, sample.successes),
      });
    }
    return data.filter(d => isFinite(d.logLikelihood));
  }, [sample]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CircleCheck /> Glimmerwing Butterfly Estimation</CardTitle>
                <CardDescription>
                  We estimate the true proportion of Glimmerwing Butterflies with iridescent wings by finding the value that maximizes the likelihood of observing our sample.
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="space-y-4">
              <label className="block font-medium">True Proportion of Iridescence: <span className="text-primary font-bold">{(trueProbability * 100).toFixed(0)}%</span></label>
              <Slider value={[trueProbability]} onValueChange={(v) => setTrueProbability(v[0])} min={0} max={1} step={0.01} />
            </div>
            <div className="space-y-4">
              <label className="block font-medium">Sample Size (Butterflies Observed): <span className="text-primary font-bold">{sampleSize}</span></label>
              <Slider value={[sampleSize]} onValueChange={(v) => setSampleSize(v[0])} min={10} max={500} step={5} />
            </div>
            <Button onClick={generateSample} className="w-full">
              Generate New Sample
            </Button>
          </div>
          <div className="lg:col-span-2 min-h-[400px] space-y-4">
            <h3 className="text-lg font-semibold mb-2 text-center">Log-Likelihood Function</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                {sample ? (
                  <LineChart data={likelihoodData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="p" type="number" domain={[0, 1]} label={{ value: 'Hypothesized Proportion (p)', position: 'insideBottom', offset: -10 }}/>
                    <YAxis allowDecimals={false} label={{ value: 'Log-Likelihood', angle: -90, position: 'insideLeft' }}/>
                    <Tooltip formatter={(value: number) => value.toFixed(3)} />
                    <Legend verticalAlign="top" />
                    <Line type="monotone" dataKey="logLikelihood" stroke="hsl(var(--primary))" dot={false} strokeWidth={2} name="Log-Likelihood of Sample"/>
                    {mle !== null && (
                        <ReferenceLine x={mle} stroke="hsl(var(--destructive))" strokeDasharray="3 3" label={{ value: "MLE", position: "top", fill: "hsl(var(--destructive))"}} />
                    )}
                  </LineChart>
                ) : <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg"><p className="text-muted-foreground">Generate a sample to see the likelihood function.</p></div>}
              </ResponsiveContainer>
            </div>
            {sample && mle !== null && (
              <Card>
                <CardHeader>
                  <CardTitle>Estimation Results</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-muted-foreground">Sampled Iridescent</p>
                    <p className="text-2xl font-bold">{sample.successes}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Sample Size</p>
                    <p className="text-2xl font-bold">{sample.trials}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Maximum Likelihood Estimate</p>
                    <p className="text-2xl font-bold">{mle.toFixed(3)}</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MaximumLikelihoodEstimationSimulation;

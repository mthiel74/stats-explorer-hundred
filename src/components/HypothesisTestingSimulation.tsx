
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { TestTube2, Frown, Smile } from 'lucide-react';

const POPULATION_MEAN = 100; // km/h
const POPULATION_STD_DEV = 15; // km/h
const ALPHA = 0.05;

// Standard Normal CDF approximation
function standardNormalCdf(x: number) {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    if (x > 0) {
        prob = 1 - prob;
    }
    return prob;
}

// Box-Muller transform to generate normally distributed random numbers
function randomNormal(mean: number, stdDev: number) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    return z * stdDev + mean;
}

const HypothesisTestingSimulation = () => {
  const [sampleSize, setSampleSize] = useState(30);
  const [trueEffect, setTrueEffect] = useState(5); // This is the boost in km/h
  const [result, setResult] = useState<{
    sampleMean: number;
    zScore: number;
    pValue: number;
    conclusion: string;
    criticalValue: number;
  } | null>(null);

  const runSimulation = () => {
    const trueMean = POPULATION_MEAN + trueEffect;
    let sampleSum = 0;
    for (let i = 0; i < sampleSize; i++) {
        sampleSum += randomNormal(trueMean, POPULATION_STD_DEV);
    }
    const sampleMean = sampleSum / sampleSize;
    const zScore = (sampleMean - POPULATION_MEAN) / (POPULATION_STD_DEV / Math.sqrt(sampleSize));
    const pValue = 1 - standardNormalCdf(zScore);
    const criticalZ = 1.645; // for one-tailed test at alpha = 0.05
    const criticalValue = POPULATION_MEAN + criticalZ * (POPULATION_STD_DEV / Math.sqrt(sampleSize));

    let conclusion;
    if (pValue < ALPHA) {
        conclusion = "Reject the Null Hypothesis. The potion seems to have an effect!";
    } else {
        conclusion = "Fail to Reject the Null Hypothesis. We don't have enough evidence that the potion works.";
    }

    setResult({ sampleMean, zScore, pValue, conclusion, criticalValue });
  };
  
  const chartData = useMemo(() => [
    { name: 'Known Population Mean', speed: POPULATION_MEAN },
    { name: 'Your Sample Mean', speed: result ? parseFloat(result.sampleMean.toFixed(2)) : POPULATION_MEAN },
  ], [result]);

  const isSignificant = result && result.pValue < ALPHA;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><TestTube2 /> Phoenix Feather Potion Test</CardTitle>
                <CardDescription>
                  We want to test if a new potion increases griffin flight speed.
                  <br /><strong>H₀ (Null):</strong> Speed ≤ 100 km/h.
                  <br /><strong>H₁ (Alternative):</strong> Speed &gt; 100 km/h.
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="space-y-4">
              <label className="block font-medium">Sample Size (Griffins Tested): <span className="text-primary font-bold">{sampleSize}</span></label>
              <Slider value={[sampleSize]} onValueChange={(v) => setSampleSize(v[0])} min={5} max={200} step={1} />
            </div>
            <div className="space-y-4">
              <label className="block font-medium">True Potion Effect (Speed Boost): <span className="text-primary font-bold">{trueEffect} km/h</span></label>
              <Slider value={[trueEffect]} onValueChange={(v) => setTrueEffect(v[0])} min={0} max={20} step={0.5} />
            </div>
            <Button onClick={runSimulation} className="w-full">
              Run Experiment
            </Button>
          </div>
          <div className="lg:col-span-2 min-h-[400px] space-y-4">
            <h3 className="text-lg font-semibold mb-2 text-center">Experiment Results</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[80, 130]}/>
                  <YAxis type="category" dataKey="name" width={150} />
                  <Tooltip cursor={{fill: 'hsl(var(--muted))'}} />
                  <Bar dataKey="speed" fill="hsl(var(--primary))" barSize={30} />
                  {result && (
                    <ReferenceLine x={result.criticalValue} stroke="hsl(var(--destructive))" strokeDasharray="3 3">
                       <Label value="Significance Threshold" position="insideTopLeft" fill="hsl(var(--destructive))" />
                    </ReferenceLine>
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
            {result ? (
                <Card className={isSignificant ? "border-green-500" : "border-destructive"}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           {isSignificant ? <Smile className="text-green-500"/> : <Frown className="text-destructive" />}
                           Conclusion
                        </CardTitle>
                        <CardDescription>{result.conclusion}</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-sm text-muted-foreground">Sample Mean</p>
                            <p className="text-2xl font-bold">{result.sampleMean.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Z-Score</p>
                            <p className="text-2xl font-bold">{result.zScore.toFixed(2)}</p>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">p-value</p>
                            <p className="text-2xl font-bold">{result.pValue < 0.001 ? "< 0.001" : result.pValue.toFixed(3)}</p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
              <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Click "Run Experiment" to see the results</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HypothesisTestingSimulation;

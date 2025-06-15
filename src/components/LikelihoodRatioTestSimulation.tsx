
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Function to calculate log-likelihood for a normal distribution
const logLikelihoodNormal = (data: number[], mean: number, stdDev: number) => {
    let ll = 0;
    const log_std_dev = Math.log(stdDev);
    const c = 2 * stdDev * stdDev;
    for (const x of data) {
        ll -= log_std_dev + Math.pow(x - mean, 2) / c;
    }
    return ll;
};

const LikelihoodRatioTestSimulation = () => {
    const [trueMean, setTrueMean] = useState(0.5);
    const [sampleSize, setSampleSize] = useState(50);
    const [results, setResults] = useState<{ llNull: number, llAlt: number, lrStat: number, pValue: number, conclusion: string } | null>(null);

    const generateAndTest = () => {
        // Generate data from N(trueMean, 1)
        const sample = Array.from({ length: sampleSize }, () => {
            let u = 0, v = 0;
            while(u === 0) u = Math.random();
            while(v === 0) v = Math.random();
            return trueMean + 1 * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        });

        const sampleMean = sample.reduce((a, b) => a + b, 0) / sampleSize;

        // H0: mean = 0
        const llNull = logLikelihoodNormal(sample, 0, 1);
        // H1: mean = sampleMean
        const llAlt = logLikelihoodNormal(sample, sampleMean, 1);

        const lrStat = 2 * (llAlt - llNull);
        // df = 1 (1 parameter 'mean' in alt, 0 in null)
        // p-value from chi-squared distribution with 1 df. A simple approximation:
        const pValue = Math.exp(-lrStat / 2); // For chi-squared(1)

        setResults({
            llNull,
            llAlt,
            lrStat,
            pValue,
            conclusion: pValue < 0.05 ? `Reject H0. The data likely does not have a mean of 0.` : `Fail to reject H0. The data is consistent with a mean of 0.`
        });
    };
    
    const chartData = useMemo(() => [
        { name: 'Log-Likelihood (H0: μ=0)', value: results?.llNull || 0 },
        { name: 'Log-Likelihood (H1: μ=û)', value: results?.llAlt || 0 },
    ], [results]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Likelihood-Ratio Test</CardTitle>
                <CardDescription>
                    Compares the fit of two nested models. Here we test if a sample's mean is significantly different from zero.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Label>True Mean of Data: {trueMean.toFixed(2)}</Label>
                        <Slider value={[trueMean]} onValueChange={v => setTrueMean(v[0])} min={0} max={2} step={0.05} />
                        <Label>Sample Size: {sampleSize}</Label>
                        <Slider value={[sampleSize]} onValueChange={v => setSampleSize(v[0])} min={10} max={200} step={5} />
                        <Button onClick={generateAndTest} className="w-full">Run Test</Button>
                    </div>
                    {results && (
                        <div className="space-y-4">
                            <Card className="bg-muted p-4">
                               <p className="text-center font-bold text-lg">{results.conclusion}</p>
                               <div className="flex justify-around text-center mt-2">
                                   <div>
                                       <p className="text-muted-foreground">LR Statistic</p>
                                       <p className="font-bold">{results.lrStat.toFixed(3)}</p>
                                   </div>
                                   <div>
                                       <p className="text-muted-foreground">P-value</p>
                                       <p className="font-bold">{results.pValue.toFixed(3)}</p>
                                   </div>
                               </div>
                            </Card>
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={chartData} layout="vertical" margin={{ left: 150 }}>
                                    <XAxis type="number" />
                                    <YAxis type="category" dataKey="name" width={150} />
                                    <Tooltip />
                                    <Bar dataKey="value" fill="hsl(var(--primary))" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default LikelihoodRatioTestSimulation;

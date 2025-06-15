
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FlaskConical } from 'lucide-react';

function randomNormal(mean: number, stdDev: number) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    return z * stdDev + mean;
}

const calculateTTest = (sample1: number[], sample2: number[]) => {
    const n1 = sample1.length;
    const n2 = sample2.length;
    if (n1 < 2 || n2 < 2) return null;

    const mean1 = sample1.reduce((a, b) => a + b, 0) / n1;
    const mean2 = sample2.reduce((a, b) => a + b, 0) / n2;

    const var1 = sample1.reduce((a, b) => a + Math.pow(b - mean1, 2), 0) / (n1 - 1);
    const var2 = sample2.reduce((a, b) => a + Math.pow(b - mean2, 2), 0) / (n2 - 1);
    
    const tStat = (mean1 - mean2) / Math.sqrt(var1 / n1 + var2 / n2);
    // Simplified conclusion, not using p-value. Critical t for df > 30 is approx 2.
    const conclusion = Math.abs(tStat) > 2 ? "Means appear significantly different." : "No significant difference detected.";

    return { mean1, mean2, tStat, conclusion };
}

const TTestSimulation = () => {
    const [sampleSize, setSampleSize] = useState(30);
    const [meanDiff, setMeanDiff] = useState(0.5);
    const [result, setResult] = useState<{ mean1: number, mean2: number, tStat: number, conclusion: string } | null>(null);

    const runSimulation = () => {
        const sample1 = Array.from({ length: sampleSize }, () => randomNormal(10, 2));
        const sample2 = Array.from({ length: sampleSize }, () => randomNormal(10 + meanDiff, 2));
        setResult(calculateTTest(sample1, sample2));
    }

    const chartData = useMemo(() => [
        { name: 'Group A Mean', value: result ? parseFloat(result.mean1.toFixed(2)) : 0 },
        { name: 'Group B Mean', value: result ? parseFloat(result.mean2.toFixed(2)) : 0 },
    ], [result]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><FlaskConical /> T-Test Simulator</CardTitle>
                <CardDescription>
                    A T-Test is used to determine if there is a significant difference between the means of two groups.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-1 space-y-4">
                    <div className="space-y-2">
                        <label className="font-semibold">Sample Size (per group): {sampleSize}</label>
                        <Slider value={[sampleSize]} onValueChange={([val]) => setSampleSize(val)} min={5} max={200} step={1} />
                    </div>
                    <div className="space-y-2">
                        <label className="font-semibold">True Mean Difference: {meanDiff.toFixed(1)}</label>
                        <Slider value={[meanDiff]} onValueChange={([val]) => setMeanDiff(val)} min={0} max={5} step={0.1} />
                    </div>
                    <Button onClick={runSimulation} className="w-full">Run T-Test</Button>
                    {result && (
                        <Card className="text-center p-4">
                             <p className="text-sm text-muted-foreground">Conclusion</p>
                            <p className="font-semibold">{result.conclusion}</p>
                            <p className="text-sm text-muted-foreground mt-2">T-Statistic: {result.tStat.toFixed(2)}</p>
                        </Card>
                    )}
                </div>
                 <div className="lg:col-span-2 min-h-[400px]">
                    {result ? (
                         <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData} layout="vertical" margin={{ left: 100 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" width={110}/>
                                <Tooltip />
                                <Bar dataKey="value" fill="hsl(var(--primary))" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground">Click "Run T-Test" to see results</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default TTestSimulation;

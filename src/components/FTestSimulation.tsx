
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Scaling } from 'lucide-react';

function randomNormal(mean: number, stdDev: number) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    return z * stdDev + mean;
}

const calculateFTest = (sample1: number[], sample2: number[]) => {
    const n1 = sample1.length;
    const n2 = sample2.length;
    if (n1 < 2 || n2 < 2) return null;

    const mean1 = sample1.reduce((a, b) => a + b, 0) / n1;
    const mean2 = sample2.reduce((a, b) => a + b, 0) / n2;

    const var1 = sample1.reduce((a, b) => a + Math.pow(b - mean1, 2), 0) / (n1 - 1);
    const var2 = sample2.reduce((a, b) => a + Math.pow(b - mean2, 2), 0) / (n2 - 1);
    
    const fStat = var1 / var2;
    // Simplified conclusion
    const conclusion = fStat > 2 || fStat < 0.5 ? "Variances appear significantly different." : "No significant difference in variances detected.";
    
    return { var1, var2, fStat, conclusion };
};

const FTestSimulation = () => {
    const [sampleSize, setSampleSize] = useState(50);
    const [varianceRatio, setVarianceRatio] = useState(1.5);
    const [result, setResult] = useState<{ var1: number, var2: number, fStat: number, conclusion: string } | null>(null);

    const runSimulation = () => {
        const stdDev1 = 2;
        const stdDev2 = stdDev1 / Math.sqrt(varianceRatio);
        const sample1 = Array.from({ length: sampleSize }, () => randomNormal(10, stdDev1));
        const sample2 = Array.from({ length: sampleSize }, () => randomNormal(10, stdDev2));
        setResult(calculateFTest(sample1, sample2));
    };
    
    const chartData = useMemo(() => [
        { name: 'Group A Variance', value: result ? parseFloat(result.var1.toFixed(2)) : 0 },
        { name: 'Group B Variance', value: result ? parseFloat(result.var2.toFixed(2)) : 0 },
    ], [result]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Scaling /> F-Test Simulator</CardTitle>
                <CardDescription>
                    An F-Test is used to check if two samples have equal variances. This is important for choosing the right T-Test.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                <div className="lg:col-span-1 space-y-4">
                     <div className="space-y-2">
                        <label className="font-semibold">Sample Size (per group): {sampleSize}</label>
                        <Slider value={[sampleSize]} onValueChange={([val]) => setSampleSize(val)} min={5} max={200} step={1} />
                    </div>
                     <div className="space-y-2">
                        <label className="font-semibold">True Variance Ratio (Var1/Var2): {varianceRatio.toFixed(2)}</label>
                        <Slider value={[varianceRatio]} onValueChange={([val]) => setVarianceRatio(val)} min={0.25} max={4} step={0.05} />
                    </div>
                    <Button onClick={runSimulation} className="w-full">Run F-Test</Button>
                    {result && (
                         <Card className="text-center p-4">
                            <p className="text-muted-foreground">Conclusion</p>
                            <p className="font-semibold">{result.conclusion}</p>
                            <p className="text-sm text-muted-foreground mt-2">F-Statistic: {result.fStat.toFixed(2)}</p>
                        </Card>
                    )}
                </div>
                <div className="lg:col-span-2 min-h-[400px]">
                     {result ? (
                        <ResponsiveContainer width="100%" height={300}>
                             <BarChart data={chartData} layout="vertical" margin={{ left: 120 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" />
                                <YAxis type="category" dataKey="name" width={130} />
                                <Tooltip />
                                <Bar dataKey="value" name="Variance" fill="hsl(var(--primary))" />
                            </BarChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg">
                            <p className="text-muted-foreground">Click "Run F-Test" to see results</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default FTestSimulation;

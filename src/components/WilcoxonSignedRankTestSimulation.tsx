
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

const randomNormal = (mean = 0, stdDev = 1) => {
    let u1 = 0, u2 = 0;
    while(u1 === 0) u1 = Math.random();
    while(u2 === 0) u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdDev + mean;
};

const WilcoxonSignedRankTestSimulation = () => {
    const [effectSize, setEffectSize] = useState(0.5);
    const n = 30;

    const { chartData, wStat, pValue } = useMemo(() => {
        const sample1 = Array.from({ length: n }, () => randomNormal(5, 1.5));
        const sample2 = sample1.map(v => v + randomNormal(effectSize, 0.5));
        
        const differences = sample1.map((v, i) => ({ id: i, diff: sample2[i] - v, absDiff: Math.abs(sample2[i] - v) }))
            .filter(d => d.diff !== 0)
            .sort((a, b) => a.absDiff - b.absDiff)
            .map((d, i) => ({ ...d, rank: i + 1 }));

        const W_plus = differences.filter(d => d.diff > 0).reduce((sum, d) => sum + d.rank, 0);
        const W_minus = differences.filter(d => d.diff < 0).reduce((sum, d) => sum + d.rank, 0);

        const w = Math.min(W_plus, W_minus);
        
        // p-value approximation
        const N = differences.length;
        const meanW = N * (N + 1) / 4;
        const stdDevW = Math.sqrt(N * (N + 1) * (2 * N + 1) / 24);
        const z = (w - meanW) / stdDevW;
        const p = 2 * (1 - (0.5 * (1 + Math.tanh(Math.sqrt(Math.PI) * z / Math.sqrt(2))))); // Approximation of p-value from Z

        return { chartData: differences.sort((a,b) => a.id - b.id), wStat: w, pValue: p };

    }, [effectSize]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Wilcoxon Signed-Rank Test</CardTitle>
                <CardDescription>Adjust the effect size to see the impact on paired sample differences.</CardDescription>
            </CardHeader>
             <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <Label>Effect Size: {effectSize.toFixed(1)}</Label>
                        <Slider value={[effectSize]} onValueChange={(v) => setEffectSize(v[0])} min={-2} max={2} step={0.1} />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData}>
                                <CartesianGrid />
                                <XAxis dataKey="id" name="Pair ID" />
                                <YAxis name="Difference" />
                                <Tooltip />
                                <Bar dataKey="diff" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>
                         <div className="flex gap-4">
                            <Card className="flex-1 text-center">
                                <CardHeader>
                                    <CardTitle>W Statistic</CardTitle>
                                    <CardDescription className="text-2xl font-bold">{wStat.toFixed(0)}</CardDescription>
                                </CardHeader>
                            </Card>
                             <Card className="flex-1 text-center">
                                <CardHeader>
                                    <CardTitle>p-value</CardTitle>
                                    <CardDescription className={`text-2xl font-bold ${pValue < 0.05 ? 'text-green-500' : 'text-red-500'}`}>{pValue.toFixed(3)}</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default WilcoxonSignedRankTestSimulation;

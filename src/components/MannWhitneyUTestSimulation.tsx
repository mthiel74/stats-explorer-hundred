
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter } from 'recharts';

const randomNormal = (mean = 0, stdDev = 1) => {
    let u1 = 0, u2 = 0;
    while(u1 === 0) u1 = Math.random();
    while(u2 === 0) u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdDev + mean;
};

const MannWhitneyUTestSimulation = () => {
    const [medianShift, setMedianShift] = useState(0.5);
    const n = 30;

    const { chartData, uStat, pValue } = useMemo(() => {
        const sample1 = Array.from({ length: n }, () => randomNormal(5, 1.5));
        const sample2 = Array.from({ length: n }, () => randomNormal(5 + medianShift, 1.5));

        const combined = [
            ...sample1.map(v => ({ value: v, group: 'A' })),
            ...sample2.map(v => ({ value: v, group: 'B' }))
        ].sort((a, b) => a.value - b.value);

        const ranked = combined.map((d, i) => ({ ...d, rank: i + 1 }));
        
        const r1 = ranked.filter(r => r.group === 'A').reduce((sum, r) => sum + r.rank, 0);
        
        const u1 = (n * n) + (n * (n + 1) / 2) - r1;
        const u2 = (n * n) - u1;
        const u = Math.min(u1, u2);

        // Normal approximation for p-value
        const meanU = (n * n) / 2;
        const stdDevU = Math.sqrt((n * n * (n + n + 1)) / 12);
        const z = (u - meanU) / stdDevU;
        const p = 2 * (1 - (0.5 * (1 + Math.tanh(Math.sqrt(Math.PI) * z / Math.sqrt(2))))); // Approximation of p-value from Z

        const chartPoints = [
            ...sample1.map(v => ({ group: 'Sample 1', value: v })),
            ...sample2.map(v => ({ group: 'Sample 2', value: v })),
        ];

        return { chartData: chartPoints, uStat: u, pValue: p };

    }, [medianShift]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Mann-Whitney U Test</CardTitle>
                <CardDescription>Adjust the median difference between two samples to see how it affects the U statistic.</CardDescription>
            </CardHeader>
             <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <Label>Sample 2 Median Shift: {medianShift.toFixed(1)}</Label>
                        <Slider value={[medianShift]} onValueChange={(v) => setMedianShift(v[0])} min={0} max={5} step={0.1} />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <ResponsiveContainer width="100%" height={300}>
                            <ScatterChart>
                                <CartesianGrid />
                                <XAxis dataKey="group" type="category" name="Sample" />
                                <YAxis dataKey="value" type="number" name="Value" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Sample 1" data={chartData.filter(p => p.group === 'Sample 1')} fill="#8884d8" />
                                <Scatter name="Sample 2" data={chartData.filter(p => p.group === 'Sample 2')} fill="#82ca9d" />
                            </ScatterChart>
                        </ResponsiveContainer>
                         <div className="flex gap-4">
                            <Card className="flex-1 text-center">
                                <CardHeader>
                                    <CardTitle>U Statistic</CardTitle>
                                    <CardDescription className="text-2xl font-bold">{uStat.toFixed(0)}</CardDescription>
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
export default MannWhitneyUTestSimulation;

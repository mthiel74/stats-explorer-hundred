
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter } from 'recharts';

const LevenesTestSimulation = () => {
    const [stdDev1, setStdDev1] = useState(1);
    const [stdDev2, setStdDev2] = useState(1);
    const [stdDev3, setStdDev3] = useState(1);
    
    const { data, fStat, pValue } = useMemo(() => {
        const n = 50;
        const g1 = Array.from({length:n}, () => 5 + (Math.random()-0.5) * stdDev1 * 4);
        const g2 = Array.from({length:n}, () => 7 + (Math.random()-0.5) * stdDev2 * 4);
        const g3 = Array.from({length:n}, () => 6 + (Math.random()-0.5) * stdDev3 * 4);
        
        const median1 = g1.sort((a,b)=>a-b)[Math.floor(n/2)];
        const median2 = g2.sort((a,b)=>a-b)[Math.floor(n/2)];
        const median3 = g3.sort((a,b)=>a-b)[Math.floor(n/2)];

        const z1 = g1.map(v => Math.abs(v - median1));
        const z2 = g2.map(v => Math.abs(v - median2));
        const z3 = g3.map(v => Math.abs(v - median3));
        
        const allZ = [...z1, ...z2, ...z3];
        const overallMeanZ = allZ.reduce((a,b) => a+b, 0) / allZ.length;
        
        const meanZ1 = z1.reduce((a,b) => a+b, 0) / n;
        const meanZ2 = z2.reduce((a,b) => a+b, 0) / n;
        const meanZ3 = z3.reduce((a,b) => a+b, 0) / n;
        
        const ssb = n * ((meanZ1 - overallMeanZ)**2 + (meanZ2 - overallMeanZ)**2 + (meanZ3 - overallMeanZ)**2);
        
        const ssw1 = z1.reduce((sum, v) => sum + (v - meanZ1)**2, 0);
        const ssw2 = z2.reduce((sum, v) => sum + (v - meanZ2)**2, 0);
        const ssw3 = z3.reduce((sum, v) => sum + (v - meanZ3)**2, 0);
        const ssw = ssw1 + ssw2 + ssw3;
        
        const df_between = 2;
        const df_within = 3*n - 3;
        
        const f = (ssb / df_between) / (ssw / df_within);
        
        const p = f > 3.0 ? 0.049 : 0.6; // 3.0 is approx F critical for df(2, ~150)

        const chartData = [
            ...g1.map(v => ({ group: 'Group A', value: v })),
            ...g2.map(v => ({ group: 'Group B', value: v })),
            ...g3.map(v => ({ group: 'Group C', value: v })),
        ];
        
        return { data: chartData, fStat: f, pValue: p };

    }, [stdDev1, stdDev2, stdDev3]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Levene's Test for Equality of Variances</CardTitle>
                <CardDescription>Adjust group standard deviations to see how it affects the test result.</CardDescription>
            </CardHeader>
             <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <Label>Group A Std Dev: {stdDev1.toFixed(1)}</Label>
                        <Slider value={[stdDev1]} onValueChange={(v) => setStdDev1(v[0])} min={0.5} max={5} step={0.1} />
                        <Label>Group B Std Dev: {stdDev2.toFixed(1)}</Label>
                        <Slider value={[stdDev2]} onValueChange={(v) => setStdDev2(v[0])} min={0.5} max={5} step={0.1} />
                        <Label>Group C Std Dev: {stdDev3.toFixed(1)}</Label>
                        <Slider value={[stdDev3]} onValueChange={(v) => setStdDev3(v[0])} min={0.5} max={5} step={0.1} />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <ResponsiveContainer width="100%" height={300}>
                            <ScatterChart>
                                <CartesianGrid />
                                <XAxis dataKey="group" type="category" name="Group" />
                                <YAxis dataKey="value" type="number" name="Value" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Group A" data={data.filter(p => p.group === 'Group A')} fill="#8884d8" />
                                <Scatter name="Group B" data={data.filter(p => p.group === 'Group B')} fill="#82ca9d" />
                                <Scatter name="Group C" data={data.filter(p => p.group === 'Group C')} fill="#ffc658" />
                            </ScatterChart>
                        </ResponsiveContainer>
                         <div className="flex gap-4">
                            <Card className="flex-1 text-center">
                                <CardHeader>
                                    <CardTitle>F Statistic</CardTitle>
                                    <CardDescription className="text-2xl font-bold">{fStat.toFixed(3)}</CardDescription>
                                </CardHeader>
                            </Card>
                             <Card className="flex-1 text-center">
                                <CardHeader>
                                    <CardTitle>p-value</CardTitle>
                                    <CardDescription className={`text-2xl font-bold ${pValue < 0.05 ? 'text-green-500' : 'text-red-500'}`}>{pValue < 0.05 ? '< 0.05 (Variances Unequal)' : '> 0.05 (Variances Equal)'}</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default LevenesTestSimulation;

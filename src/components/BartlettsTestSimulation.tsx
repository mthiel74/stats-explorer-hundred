
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter } from 'recharts';

const BartlettsTestSimulation = () => {
    const [stdDev1, setStdDev1] = useState(1);
    const [stdDev2, setStdDev2] = useState(1);
    const [stdDev3, setStdDev3] = useState(1);
    
    const { data, bStat, pValue } = useMemo(() => {
        const n = 50;
        const k = 3;
        const N = n * k;

        const g1 = Array.from({length:n}, () => 5 + (Math.random()-0.5) * stdDev1 * 4);
        const g2 = Array.from({length:n}, () => 7 + (Math.random()-0.5) * stdDev2 * 4);
        const g3 = Array.from({length:n}, () => 6 + (Math.random()-0.5) * stdDev3 * 4);
        
        const variance = (arr: number[]) => {
            const mean = arr.reduce((a, b) => a + b) / arr.length;
            return arr.reduce((sum, v) => sum + (v - mean)**2, 0) / (arr.length - 1);
        };

        const s1_sq = variance(g1);
        const s2_sq = variance(g2);
        const s3_sq = variance(g3);

        const all_data = [...g1, ...g2, ...g3];
        const s_p_sq = ((n-1)*s1_sq + (n-1)*s2_sq + (n-1)*s3_sq) / (N - k);

        const numerator = (N - k) * Math.log(s_p_sq) - ((n-1)*Math.log(s1_sq) + (n-1)*Math.log(s2_sq) + (n-1)*Math.log(s3_sq));
        const denominator = 1 + (1/(3*(k-1))) * (3*(1/(n-1)) - (1/(N-k)));
        const B = numerator / denominator;

        // p-value from chi-squared distribution with k-1 df. Simple approximation.
        const chi_crit_df2 = 5.991; // for alpha=0.05, df=2
        const p = B > chi_crit_df2 ? 0.049 : 0.6;
        
        const chartData = [
            ...g1.map(v => ({ group: 'Group A', value: v })),
            ...g2.map(v => ({ group: 'Group B', value: v })),
            ...g3.map(v => ({ group: 'Group C', value: v })),
        ];
        
        return { data: chartData, bStat: B, pValue: p };

    }, [stdDev1, stdDev2, stdDev3]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bartlett's Test for Equality of Variances</CardTitle>
                <CardDescription>Adjust group standard deviations to see the effect. Bartlett's test is sensitive to non-normal data.</CardDescription>
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
                                    <CardTitle>Bartlett's Statistic (B)</CardTitle>
                                    <CardDescription className="text-2xl font-bold">{bStat.toFixed(3)}</CardDescription>
                                </CardHeader>
                            </Card>
                             <Card className="flex-1 text-center">
                                <CardHeader>
                                    <CardTitle>p-value</CardTitle>
                                    <CardDescription className={`text-2xl font-bold ${pValue < 0.05 ? 'text-green-500' : 'text-red-500'}`}>{pValue < 0.05 ? '< 0.05' : '> 0.05'}</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default BartlettsTestSimulation;

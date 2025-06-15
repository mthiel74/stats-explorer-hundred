
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from 'recharts';
import { BarChart2 } from 'lucide-react';

// Using a simplified BoxPlot for demonstration
const CustomBoxPlot = (props: any) => {
    const { payload } = props;
    if (!payload || !payload.length) return null;
    const { value: data, color } = payload[0];
    if (!data) return null;
    const sortedData = [...data].sort((a,b) => a-b);
    const q1 = sortedData[Math.floor(sortedData.length / 4)];
    const median = sortedData[Math.floor(sortedData.length / 2)];
    const q3 = sortedData[Math.floor(sortedData.length * 3/4)];
    const min = sortedData[0];
    const max = sortedData[sortedData.length - 1];
    return (
        <div className="p-2 bg-background/80 border rounded-md shadow-lg">
            <p style={{color}}>{payload[0].name}</p>
            <p>Max: {max.toFixed(2)}</p>
            <p>Q3: {q3.toFixed(2)}</p>
            <p>Median: {median.toFixed(2)}</p>
            <p>Q1: {q1.toFixed(2)}</p>
            <p>Min: {min.toFixed(2)}</p>
        </div>
    )
};


const KruskalWallisTestSimulation = () => {
    const [mean1, setMean1] = useState(5);
    const [mean2, setMean2] = useState(5.5);
    const [mean3, setMean3] = useState(6);

    const { data, hStat, pValue } = useMemo(() => {
        const n = 30;
        const g1 = Array.from({length:n}, () => mean1 + (Math.random()-0.5) * 4);
        const g2 = Array.from({length:n}, () => mean2 + (Math.random()-0.5) * 4);
        const g3 = Array.from({length:n}, () => mean3 + (Math.random()-0.5) * 4);

        const allData = [
            ...g1.map(val => ({ value: val, group: 'A' })),
            ...g2.map(val => ({ value: val, group: 'B' })),
            ...g3.map(val => ({ value: val, group: 'C' })),
        ];

        allData.sort((a,b) => a.value - b.value);
        const rankedData = allData.map((d, i) => ({ ...d, rank: i + 1 }));

        const R1 = rankedData.filter(d => d.group === 'A').reduce((sum, d) => sum + d.rank, 0);
        const R2 = rankedData.filter(d => d.group === 'B').reduce((sum, d) => sum + d.rank, 0);
        const R3 = rankedData.filter(d => d.group === 'C').reduce((sum, d) => sum + d.rank, 0);

        const N = 3 * n;
        const H = (12 / (N * (N + 1))) * (R1*R1/n + R2*R2/n + R3*R3/n) - 3 * (N + 1);
        
        const p = H > 5.991 ? 0.04 : 0.5; // 5.991 is chi-squared critical value for df=2, alpha=0.05
        
        const chartData = [
            { name: 'Group A', values: g1 },
            { name: 'Group B', values: g2 },
            { name: 'Group C', values: g3 },
        ];

        return { data: chartData, hStat: H, pValue: p };

    }, [mean1, mean2, mean3]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart2 /> Kruskal-Wallis Test</CardTitle>
                <CardDescription>A non-parametric alternative to ANOVA. Adjust group medians to see the effect.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <Label>Group A Median: {mean1.toFixed(1)}</Label>
                        <Slider value={[mean1]} onValueChange={(v) => setMean1(v[0])} min={1} max={10} step={0.1} />
                        <Label>Group B Median: {mean2.toFixed(1)}</Label>
                        <Slider value={[mean2]} onValueChange={(v) => setMean2(v[0])} min={1} max={10} step={0.1} />
                        <Label>Group C Median: {mean3.toFixed(1)}</Label>
                        <Slider value={[mean3]} onValueChange={(v) => setMean3(v[0])} min={1} max={10} step={0.1} />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <ResponsiveContainer width="100%" height={300}>
                            <ScatterChart>
                                <CartesianGrid />
                                <XAxis dataKey="name" type="category" />
                                <YAxis type="number" />
                                <Tooltip content={<CustomBoxPlot />} />
                                <Scatter name="Group A" data={[{name: 'Group A', value: data[0].values}]} fill="#8884d8" shape="star" />
                                <Scatter name="Group B" data={[{name: 'Group B', value: data[1].values}]} fill="#82ca9d" shape="triangle"/>
                                <Scatter name="Group C" data={[{name: 'Group C', value: data[2].values}]} fill="#ffc658" shape="cross"/>
                            </ScatterChart>
                        </ResponsiveContainer>
                         <div className="flex gap-4">
                            <Card className="flex-1 text-center">
                                <CardHeader>
                                    <CardTitle>H Statistic</CardTitle>
                                    <CardDescription className="text-2xl font-bold">{hStat.toFixed(3)}</CardDescription>
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

export default KruskalWallisTestSimulation;

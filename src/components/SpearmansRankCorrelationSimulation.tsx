
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

// Helper to rank data
const getRanks = (data: number[]) => {
    const sorted = [...data].map((value, index) => ({ value, index })).sort((a, b) => a.value - b.value);
    const ranks = new Array(data.length);
    sorted.forEach(({ index }, i) => { ranks[index] = i + 1; });
    return ranks;
};

const SpearmansRankCorrelationSimulation = () => {
    const [dataset, setDataset] = useState('monotonic');

    const { data, pearson, spearman } = useMemo(() => {
        let x: number[], y: number[];
        const n = 50;

        switch (dataset) {
            case 'linear':
                x = Array.from({ length: n }, (_, i) => i);
                y = x.map(val => val + (Math.random() - 0.5) * 20);
                break;
            case 'monotonic':
                 x = Array.from({ length: n }, (_, i) => i);
                 y = x.map(val => val * val + (Math.random() - 0.5) * 500);
                 break;
            case 'random':
            default:
                x = Array.from({ length: n }, () => Math.random() * 50);
                y = Array.from({ length: n }, () => Math.random() * 50);
                break;
        }

        const chartData = x.map((val, i) => ({ x: val, y: y[i] }));
        
        // Pearson
        const meanX = x.reduce((a,b) => a+b, 0) / n;
        const meanY = y.reduce((a,b) => a+b, 0) / n;
        const pearsonNum = x.reduce((sum, val, i) => sum + (val - meanX) * (y[i] - meanY), 0);
        const pearsonDenX = Math.sqrt(x.reduce((sum, val) => sum + Math.pow(val - meanX, 2), 0));
        const pearsonDenY = Math.sqrt(y.reduce((sum, val) => sum + Math.pow(val - meanY, 2), 0));
        const pearson_r = pearsonNum / (pearsonDenX * pearsonDenY);

        // Spearman
        const rankX = getRanks(x);
        const rankY = getRanks(y);
        const d_squared = rankX.reduce((sum, rank, i) => sum + Math.pow(rank - rankY[i], 2), 0);
        const spearman_rho = 1 - (6 * d_squared) / (n * (n * n - 1));

        return { data: chartData, pearson: pearson_r, spearman: spearman_rho };
    }, [dataset]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp /> Spearman's Rank Correlation</CardTitle>
                <CardDescription>Comparing Pearson's r and Spearman's rho on different datasets.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center gap-4 mb-4">
                    <Button onClick={() => setDataset('linear')} variant={dataset === 'linear' ? 'default' : 'outline'}>Linear</Button>
                    <Button onClick={() => setDataset('monotonic')} variant={dataset === 'monotonic' ? 'default' : 'outline'}>Monotonic (Non-linear)</Button>
                    <Button onClick={() => setDataset('random')} variant={dataset === 'random' ? 'default' : 'outline'}>Random</Button>
                </div>
                 <div className="grid md:grid-cols-2 gap-4 items-center">
                    <div>
                        <ResponsiveContainer width="100%" height={300}>
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid />
                                <XAxis type="number" dataKey="x" name="X" />
                                <YAxis type="number" dataKey="y" name="Y" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Data" data={data} fill="hsl(var(--primary))" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col gap-4">
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Pearson's r</CardTitle>
                                <CardDescription className="text-3xl font-bold">{pearson.toFixed(3)}</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Spearman's rho</CardTitle>
                                <CardDescription className="text-3xl font-bold text-primary">{spearman.toFixed(3)}</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default SpearmansRankCorrelationSimulation;

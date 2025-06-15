
import React, { useState, useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot, Label } from 'recharts';
import { Ruler } from 'lucide-react';

// Function to calculate normal distribution PDF
const normalPDF = (x, mu, sigma) => {
    return (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mu) / sigma, 2));
};

const ZScoreSimulation = () => {
    const [mu, setMu] = useState(100);
    const [sigma, setSigma] = useState(15);
    const [x, setX] = useState(120);

    const zScore = useMemo(() => (x - mu) / sigma, [x, mu, sigma]);

    const chartData = useMemo(() => {
        const data = [];
        const step = sigma / 10;
        for (let i = mu - 4 * sigma; i <= mu + 4 * sigma; i += step) {
            data.push({ x: i, y: normalPDF(i, mu, sigma) });
        }
        return data;
    }, [mu, sigma]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Ruler /> Z-Score Calculator</CardTitle>
                <CardDescription>
                    A Z-score measures how many standard deviations a data point is from the mean.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
                 <div className="lg:col-span-1 space-y-4">
                    <div className="space-y-2">
                        <label className="font-semibold">Data Point (X): {x.toFixed(1)}</label>
                        <Slider value={[x]} onValueChange={([val]) => setX(val)} min={mu - 4 * sigma} max={mu + 4 * sigma} step={0.1} />
                    </div>
                     <div className="space-y-2">
                        <label className="font-semibold">Mean (μ): {mu.toFixed(1)}</label>
                        <Slider value={[mu]} onValueChange={([val]) => setMu(val)} min={50} max={150} step={1} />
                    </div>
                     <div className="space-y-2">
                        <label className="font-semibold">Std Dev (σ): {sigma.toFixed(1)}</label>
                        <Slider value={[sigma]} onValueChange={([val]) => setSigma(val)} min={5} max={30} step={0.5} />
                    </div>
                    <Card className="text-center p-4">
                        <p className="text-sm text-muted-foreground">Z-Score</p>
                        <p className="text-3xl font-bold">{zScore.toFixed(2)}</p>
                    </Card>
                 </div>
                <div className="lg:col-span-2 min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" dataKey="x" name="Value" domain={['dataMin', 'dataMax']} />
                            <YAxis hide />
                            <Tooltip />
                            <Line type="monotone" dataKey="y" stroke="hsl(var(--primary))" dot={false} name="Probability Density" />
                            <ReferenceDot x={x} y={normalPDF(x, mu, sigma)} r={8} fill="hsl(var(--destructive))" stroke="white">
                                <Label value="X" position="top" />
                            </ReferenceDot>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default ZScoreSimulation;

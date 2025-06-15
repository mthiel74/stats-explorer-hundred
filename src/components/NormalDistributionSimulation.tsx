import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { Dice5 } from 'lucide-react';

// Generate normal random variable using Box-Muller transform
function randomNormal(mean: number, stdDev: number) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
    return z * stdDev + mean;
}

const NormalDistributionSimulation = () => {
    const [mean, setMean] = useState(0);
    const [stdDev, setStdDev] = useState(1);
    const [sample, setSample] = useState<number[]>([]);

    const generateSample = () => {
        const newSample = Array.from({ length: 500 }, () => randomNormal(mean, stdDev));
        setSample(newSample);
    };

    const histogramData = useMemo(() => {
        if (sample.length === 0) return [];
        const binWidth = stdDev / 2;
        const min = Math.floor(Math.min(...sample) / binWidth) * binWidth;
        const max = Math.ceil(Math.max(...sample) / binWidth) * binWidth;
        const bins = new Map<number, number>();
        for (let x = min; x <= max; x += binWidth) {
            bins.set(Number(x.toFixed(2)), 0);
        }
        sample.forEach(v => {
            const bin = Math.floor(v / binWidth) * binWidth;
            const key = Number(bin.toFixed(2));
            bins.set(key, (bins.get(key) || 0) + 1);
        });
        return Array.from(bins.entries()).map(([x, count]) => ({ x, count }));
    }, [sample, stdDev]);

    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Dice5 /> Normal Distribution</CardTitle>
                <CardDescription>Generate random samples from a normal distribution and visualize their histogram.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-4 lg:col-span-1">
                    <div>
                        <label className="font-semibold">Mean: {mean.toFixed(1)}</label>
                        <Slider value={[mean]} onValueChange={([v]) => setMean(v)} min={-5} max={5} step={0.1} />
                    </div>
                    <div>
                        <label className="font-semibold">Std. Dev.: {stdDev.toFixed(1)}</label>
                        <Slider value={[stdDev]} onValueChange={([v]) => setStdDev(v)} min={0.5} max={5} step={0.1} />
                    </div>
                    <Button onClick={generateSample} className="w-full">Generate Sample</Button>
                </div>
                <div className="lg:col-span-2 min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={histogramData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" name="Value" type="number" />
                            <YAxis allowDecimals={false} />
                            <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} />
                            <Bar dataKey="count" name="Frequency" fill="hsl(var(--primary))" />
                            <ReferenceLine x={mean} stroke="hsl(var(--destructive))" strokeWidth={2}>
                                <Label value="Mean" position="top" fill="hsl(var(--destructive))" />
                            </ReferenceLine>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default NormalDistributionSimulation;

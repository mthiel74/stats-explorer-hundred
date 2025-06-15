
import React, { useState, useMemo, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { Waves } from 'lucide-react';

// Function to generate normally distributed random numbers
function randomNormal(mean: number, stdDev: number) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    return z * stdDev + mean;
}

// Function to calculate mean
const calculateMean = (data: number[]) => data.reduce((a, b) => a + b, 0) / data.length;

// Function to calculate variance
const calculateVariance = (data: number[], mean: number) => {
    if (data.length < 2) return 0;
    return data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (data.length - 1);
};

const VarianceSimulation = () => {
    const [trueStdDev, setTrueStdDev] = useState(10);
    const [data, setData] = useState<number[]>([]);
    const [mean, setMean] = useState<number>(0);
    const [variance, setVariance] = useState<number>(0);

    const generateData = (stdDev: number) => {
        const newData = Array.from({ length: 150 }, () => randomNormal(50, stdDev));
        const newMean = calculateMean(newData);
        const newVariance = calculateVariance(newData, newMean);
        setData(newData);
        setMean(newMean);
        setVariance(newVariance);
    };

    useEffect(() => {
        generateData(trueStdDev);
    }, [trueStdDev]);

    // Bin data for histogram
    const binnedData = useMemo(() => {
        if (data.length === 0) return [];
        const binSize = 5;
        const min = Math.floor(Math.min(...data) / binSize) * binSize;
        const max = Math.ceil(Math.max(...data) / binSize) * binSize;
        const bins = new Map<number, number>();

        for (let i = min; i <= max; i += binSize) {
            bins.set(i, 0);
        }

        data.forEach(value => {
            const bin = Math.floor(value / binSize) * binSize;
            if (bins.has(bin)) {
                bins.set(bin, bins.get(bin)! + 1);
            }
        });

        return Array.from(bins.entries()).map(([value, count]) => ({ value, count })).sort((a,b) => a.value - b.value);
    }, [data]);

    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Waves /> Variance Explorer</CardTitle>
                <CardDescription>
                    Variance measures how far a set of numbers are spread out from their average value. Higher variance means more spread.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                     <div className="space-y-2">
                        <label className="font-semibold">Population Spread (Std. Dev.): {trueStdDev.toFixed(1)}</label>
                        <Slider value={[trueStdDev]} onValueChange={([val]) => setTrueStdDev(val)} min={2} max={25} step={0.5} />
                        <p className="text-xs text-muted-foreground mt-1">Controls the standard deviation of the population from which we sample. True Variance is this value squared.</p>
                    </div>
                    {data.length > 0 && (
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">True Variance</p>
                                        <p className="text-2xl font-bold">{(trueStdDev * trueStdDev).toFixed(1)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Sample Variance</p>
                                        <p className="text-2xl font-bold">{variance.toFixed(1)}</p>
                                    </div>
                                </div>
                                 <div className="mt-4">
                                    <p className="text-sm text-muted-foreground">Sample Mean</p>
                                    <p className="text-2xl font-bold">{mean.toFixed(1)}</p>
                                 </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
                <div className="lg:col-span-2 min-h-[400px]">
                    <h3 className="text-lg font-semibold mb-2 text-center">Sample Data Distribution</h3>
                    <ResponsiveContainer width="100%" height={400}>
                       <BarChart data={binnedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="value" name="Value" />
                            <YAxis allowDecimals={false} />
                            <Tooltip cursor={{fill: 'hsl(var(--muted))'}} />
                            <Bar dataKey="count" fill="hsl(var(--primary))" name="Frequency" />
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

export default VarianceSimulation;

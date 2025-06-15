
import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { Flame } from 'lucide-react';

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

// Function to calculate standard deviation
const calculateStdDev = (data: number[], mean: number) => {
    if (data.length < 2) return 0;
    const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / (data.length - 1);
    return Math.sqrt(variance);
};

const StandardDeviationSimulation = () => {
    const [data, setData] = useState<number[]>([]);
    const [mean, setMean] = useState<number>(0);
    const [stdDev, setStdDev] = useState<number>(0);

    const generateData = () => {
        const newData = Array.from({ length: 100 }, () => randomNormal(1000, 50)); // Dragon fire temperature in Celsius
        const newMean = calculateMean(newData);
        const newStdDev = calculateStdDev(newData, newMean);
        setData(newData);
        setMean(newMean);
        setStdDev(newStdDev);
    };

    useEffect(() => {
        generateData();
    }, []);

    // Bin data for histogram
    const binnedData = useMemo(() => {
        if (data.length === 0) return [];
        const binSize = 20;
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

        return Array.from(bins.entries()).map(([temp, count]) => ({ temp, count })).sort((a,b) => a.temp - b.temp);
    }, [data]);
    
    const coverage1 = data.filter(d => d >= mean - stdDev && d <= mean + stdDev).length / data.length * 100;
    const coverage2 = data.filter(d => d >= mean - 2 * stdDev && d <= mean + 2 * stdDev).length / data.length * 100;
    const coverage3 = data.filter(d => d >= mean - 3 * stdDev && d <= mean + 3 * stdDev).length / data.length * 100;


    return (
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Flame /> Dragon Fire Consistency</CardTitle>
                                <CardDescription>
                                    Standard deviation measures how spread out the data is. A low value means the dragon's fire is very consistent. A high value means it's erratic.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Button onClick={generateData} className="w-full">
                            Generate New Fire Samples
                        </Button>
                        {data.length > 0 && (
                            <Card>
                                <CardContent className="pt-6 text-center">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Mean Temp.</p>
                                            <p className="text-2xl font-bold">{mean.toFixed(1)}°C</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">Std. Dev.</p>
                                            <p className="text-2xl font-bold">{stdDev.toFixed(1)}°C</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-sm text-left space-y-1 text-muted-foreground">
                                       <p>Within 1σ (~68%): <span className="font-bold text-foreground">{coverage1.toFixed(1)}%</span></p>
                                       <p>Within 2σ (~95%): <span className="font-bold text-foreground">{coverage2.toFixed(1)}%</span></p>
                                       <p>Within 3σ (~99.7%): <span className="font-bold text-foreground">{coverage3.toFixed(1)}%</span></p>
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                    <div className="lg:col-span-2 min-h-[500px] space-y-4">
                        <h3 className="text-lg font-semibold mb-2 text-center">Dragon Fire Temperature Distribution</h3>
                        <ResponsiveContainer width="100%" height={400}>
                           <BarChart data={binnedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="temp" name="Temperature (°C)" unit="°C" />
                                <YAxis allowDecimals={false} />
                                <Tooltip cursor={{fill: 'hsl(var(--muted))'}} formatter={(value, name) => [value, 'Samples']} />
                                <Bar dataKey="count" fill="hsl(var(--primary))" name="Samples" />
                                <ReferenceLine x={mean} stroke="hsl(var(--destructive))" strokeWidth={2}>
                                    <Label value="Mean" position="top" fill="hsl(var(--destructive))" />
                                </ReferenceLine>
                                <ReferenceLine x={mean + stdDev} stroke="hsl(var(--secondary-foreground))" strokeDasharray="3 3" >
                                    <Label value="+1σ" position="top" fill="hsl(var(--secondary-foreground))" />
                                </ReferenceLine>
                                <ReferenceLine x={mean - stdDev} stroke="hsl(var(--secondary-foreground))" strokeDasharray="3 3" >
                                    <Label value="-1σ" position="top" fill="hsl(var(--secondary-foreground))" />
                                </ReferenceLine>
                                <ReferenceLine x={mean + 2 * stdDev} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" >
                                    <Label value="+2σ" position="top" fill="hsl(var(--muted-foreground))" />
                                </ReferenceLine>
                                <ReferenceLine x={mean - 2 * stdDev} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" >
                                    <Label value="-2σ" position="top" fill="hsl(var(--muted-foreground))" />
                                </ReferenceLine>
                           </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default StandardDeviationSimulation;


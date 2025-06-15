
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Castle, Trees, Mountain } from 'lucide-react';

const randomNormal = (mean: number, stdDev: number) => {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    return mean + stdDev * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
};

const AnovaSimulation = () => {
    const [sampleSize, setSampleSize] = useState(50);
    const [groupParams, setGroupParams] = useState([
        { name: 'Gryphons', mean: 100, stdDev: 15, color: 'hsl(var(--primary))', Icon: Castle },
        { name: 'Manticores', mean: 105, stdDev: 15, color: 'hsl(var(--destructive))', Icon: Trees },
        { name: 'Chimeras', mean: 110, stdDev: 15, color: 'hsl(var(--muted-foreground))', Icon: Mountain },
    ]);
    const [data, setData] = useState<any[]>([]);

    const handleParamChange = (index: number, field: 'mean' | 'stdDev', value: number) => {
        setGroupParams(prev => {
            const newParams = [...prev];
            newParams[index][field] = value;
            return newParams;
        });
    };

    const generateData = () => {
        const newData = groupParams.flatMap((group, groupIndex) => 
            Array.from({ length: sampleSize }, (_, i) => ({
                group: group.name,
                x: groupIndex + 1 + (Math.random() - 0.5) * 0.5, // Jitter for visualization
                value: randomNormal(group.mean, group.stdDev),
                color: group.color,
            }))
        );
        setData(newData);
    };

    const groupAverages = useMemo(() => {
        return groupParams.map(group => {
            const groupData = data.filter(d => d.group === group.name);
            if (groupData.length === 0) return { name: group.name, avg: 0 };
            const sum = groupData.reduce((acc, d) => acc + d.value, 0);
            return { name: group.name, avg: sum / groupData.length };
        });
    }, [data, groupParams]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">Battle of the Beasts (ANOVA)</CardTitle>
                <CardDescription>
                    ANOVA tests if there's a significant difference between the means of three or more groups. Adjust the "true" means of the beast populations and generate samples to see if you can detect a difference.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <Card>
                        <CardContent className="pt-6">
                            {groupParams.map((group, index) => (
                                <div key={group.name} className="space-y-3 mb-4">
                                    <label className="font-semibold flex items-center gap-2"><group.Icon /> {group.name} Mean Strength</label>
                                    <Slider defaultValue={[group.mean]} max={150} min={50} step={1} onValueChange={([val]) => handleParamChange(index, 'mean', val)} />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Button onClick={generateData} className="w-full">Generate Samples</Button>
                    {data.length > 0 && (
                        <Card>
                            <CardHeader><CardTitle>Sample Averages</CardTitle></CardHeader>
                            <CardContent>
                                {groupAverages.map(item => (
                                    <div key={item.name} className="flex justify-between">
                                        <span>{item.name}:</span>
                                        <span className="font-bold">{item.avg.toFixed(2)}</span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    )}
                </div>
                <div className="lg:col-span-2 min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" name="group" domain={[0.5, 3.5]} ticks={[1, 2, 3]} tickFormatter={(tick) => groupParams[tick-1]?.name} />
                            <YAxis type="number" dataKey="value" name="strength" label={{ value: 'Strength', angle: -90, position: 'insideLeft' }} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Legend />
                            {groupParams.map((group) => (
                                <Scatter key={group.name} name={group.name} data={data.filter(d => d.group === group.name)} fill={group.color} />
                            ))}
                            {groupAverages.filter(g => g.avg > 0).map((g, i) => (
                                <ReferenceLine key={g.name} x={i + 1} stroke="black" strokeDasharray="3 3" label={{ value: `Avg: ${g.avg.toFixed(1)}`, position: 'top' }} />
                            ))}
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default AnovaSimulation;

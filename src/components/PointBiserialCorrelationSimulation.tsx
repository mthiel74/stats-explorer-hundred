
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

type PointData = { group: number, score: number };

const generateData = (n: number): PointData[] => {
    return Array.from({ length: n }, () => {
        const group = Math.random() > 0.5 ? 1 : 0;
        // The 20*group term creates a correlation
        const score = 50 + (group * 20) + (Math.random() * 30 - 15);
        return { group: group, score: score };
    });
};

const calculatePointBiserial = (data: PointData[]) => {
    const group0 = data.filter(d => d.group === 0).map(d => d.score);
    const group1 = data.filter(d => d.group === 1).map(d => d.score);

    if (group0.length === 0 || group1.length === 0) return 0;
    
    const mean0 = group0.reduce((a, b) => a + b, 0) / group0.length;
    const mean1 = group1.reduce((a, b) => a + b, 0) / group1.length;
    
    const allScores = data.map(d => d.score);
    const n = allScores.length;
    const mean = allScores.reduce((a,b) => a+b,0)/n;
    const stdDev = Math.sqrt(allScores.map(x => Math.pow(x - mean, 2)).reduce((a,b)=>a+b,0) / n);
    
    if (stdDev === 0) return 0;

    const p0 = group0.length / n;
    const p1 = group1.length / n;
    
    const rpb = ((mean1 - mean0) / stdDev) * Math.sqrt(p0 * p1);
    
    return rpb;
};

const PointBiserialCorrelationSimulation = () => {
    const [data, setData] = useState(generateData(100));
    const correlation = useMemo(() => calculatePointBiserial(data), [data]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Point-Biserial Correlation</CardTitle>
                <CardDescription>
                    Measures the relationship between a binary variable and a continuous variable.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => setData(generateData(100))} className="mb-4">Generate New Data</Button>
                <div className="grid md:grid-cols-2 gap-6">
                    <ResponsiveContainer width="100%" height={300}>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="group" name="Group" ticks={[0, 1]} tickFormatter={(val) => `Group ${val}`} />
                            <YAxis type="number" dataKey="score" name="Score" />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="Data" data={data.map(d => ({ ...d, group: d.group + (Math.random()-0.5)*0.2}))} fill="hsl(var(--primary))" />
                        </ScatterChart>
                    </ResponsiveContainer>
                    <div className="flex flex-col justify-center items-center p-6 bg-muted rounded-lg">
                        <p className="text-muted-foreground">Point-Biserial Correlation (r_pb)</p>
                        <p className="text-4xl font-bold">{correlation.toFixed(3)}</p>
                        <div className="text-sm mt-4 text-center">
                           <p className="mt-2 italic">A value near 0 suggests no correlation. Values near -1 or +1 suggest a strong negative or positive correlation between group membership and the score.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PointBiserialCorrelationSimulation;

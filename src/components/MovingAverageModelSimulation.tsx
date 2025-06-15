
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts';

const generateMAData = (theta: number, n: number) => {
    const noise = () => (Math.random() - 0.5) * 2;
    const errors = Array.from({ length: n }, noise);
    const data = [];
    for (let i = 1; i < n; i++) {
        const value = errors[i] + theta * errors[i-1];
        data.push({ time: i, value });
    }
    return data;
};

const MovingAverageModelSimulation = () => {
    const [theta, setTheta] = useState(0.6);
    const [data, setData] = useState<any[]>([]);

    const generate = () => {
        setData(generateMAData(theta, 100));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Moving Average (MA) Model Simulation</CardTitle>
                <CardDescription>
                    An MA(1) model where the current value is a function of the current and past error terms.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <Label>MA Coefficient (θ): {theta.toFixed(2)}</Label>
                        <Slider value={[theta]} onValueChange={v => setTheta(v[0])} min={-1} max={1} step={0.05} />
                        <Button onClick={generate} className="w-full">Generate Data</Button>
                        <Button variant="outline" onClick={() => setData([])} className="w-full">Clear</Button>
                    </div>
                    <div className="md:col-span-2">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="time" name="Time" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MovingAverageModelSimulation;

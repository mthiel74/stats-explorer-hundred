
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts';

const generateARData = (phi: number, n: number) => {
    const data = [{ time: 0, value: 0 }];
    const noise = () => (Math.random() - 0.5) * 2;
    for (let i = 1; i < n; i++) {
        const value = phi * data[i-1].value + noise();
        data.push({ time: i, value });
    }
    return data;
};

const AutoregressiveModelSimulation = () => {
    const [phi, setPhi] = useState(0.8);
    const [data, setData] = useState<any[]>([]);

    const generate = () => {
        setData(generateARData(phi, 100));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Autoregressive (AR) Model Simulation</CardTitle>
                <CardDescription>
                    An AR(1) model where the current value is a function of the immediately preceding value.
                    Try values of phi close to 1 or -1.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <Label>AR Coefficient (φ): {phi.toFixed(2)}</Label>
                        <Slider value={[phi]} onValueChange={v => setPhi(v[0])} min={-1} max={1} step={0.05} />
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

export default AutoregressiveModelSimulation;

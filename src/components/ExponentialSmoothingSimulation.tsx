
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

const generateBaseData = (n: number) => {
    const data = [];
    let level = 50;
    for (let i = 0; i < n; i++) {
        if (i > n / 2) level = 70; // Introduce a level shift
        data.push({ time: i, value: level + (Math.random() - 0.5) * 20 });
    }
    return data;
};

const applySES = (data: any[], alpha: number) => {
    if (data.length === 0) return [];
    const smoothed = [];
    let s = data[0].value;
    smoothed.push({ time: 0, smoothedValue: s });
    
    for (let i = 1; i < data.length; i++) {
        s = alpha * data[i].value + (1 - alpha) * s;
        smoothed.push({ time: i, smoothedValue: s });
    }
    return smoothed;
}

const ExponentialSmoothingSimulation = () => {
    const [alpha, setAlpha] = useState(0.3);
    const [baseData, setBaseData] = useState<any[]>([]);
    
    const generate = () => setBaseData(generateBaseData(50));
    
    const smoothedData = applySES(baseData, alpha);

    const combinedData = baseData.map((d, i) => ({
        ...d,
        smoothed: smoothedData[i] ? smoothedData[i].smoothedValue : null
    }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Simple Exponential Smoothing</CardTitle>
                <CardDescription>
                    A forecasting method for time series data. A higher alpha places more weight on recent observations.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <Label>Smoothing Factor (α): {alpha.toFixed(2)}</Label>
                        <Slider value={[alpha]} onValueChange={v => setAlpha(v[0])} min={0.01} max={1} step={0.01} />
                        <Button onClick={generate} className="w-full">Generate Data</Button>
                        <Button variant="outline" onClick={() => setBaseData([])} className="w-full">Clear</Button>
                    </div>
                    <div className="md:col-span-2">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={combinedData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="time" name="Time" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="value" name="Original Data" stroke="#8884d8" dot={false} />
                                <Line type="monotone" dataKey="smoothed" name="Smoothed Forecast" stroke="#ffc658" dot={false} strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ExponentialSmoothingSimulation;

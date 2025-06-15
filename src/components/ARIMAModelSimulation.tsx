
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts';

const generateTrendData = (slope: number, n: number) => {
    const data = [];
    const noise = () => (Math.random() - 0.5) * 5;
    for (let i = 0; i < n; i++) {
        const value = slope * i + noise();
        data.push({ time: i, value });
    }
    return data;
};

const differenceData = (data: {time: number, value: number}[]) => {
    if (data.length < 2) return [];
    const diffed = [];
    for (let i = 1; i < data.length; i++) {
        diffed.push({ time: i, value: data[i].value - data[i-1].value });
    }
    return diffed;
};

const ARIMAModelSimulation = () => {
    const [originalData, setOriginalData] = useState<any[]>([]);
    const [differencedData, setDifferencedData] = useState<any[]>([]);

    const generate = () => {
        setOriginalData(generateTrendData(0.5, 100));
        setDifferencedData([]);
    };
    
    const difference = () => {
        setDifferencedData(differenceData(originalData));
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>ARIMA Model Simulation</CardTitle>
                <CardDescription>
                    ARIMA models handle non-stationary data by applying differencing. The 'I' in ARIMA stands for 'Integrated'.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center gap-4 mb-8">
                    <Button onClick={generate}>Generate Data with Trend</Button>
                    <Button onClick={difference} disabled={originalData.length === 0}>Difference Data (d=1)</Button>
                    <Button variant="outline" onClick={() => { setOriginalData([]); setDifferencedData([]); }}>Clear</Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-center font-semibold mb-2">Original Non-Stationary Data</h3>
                         <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={originalData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="time" name="Time" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <h3 className="text-center font-semibold mb-2">Differenced (Stationary) Data</h3>
                         <ResponsiveContainer width="100%" height={250}>
                            <LineChart data={differencedData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="time" name="Time" />
                                <YAxis domain={['auto', 'auto']} />
                                <Tooltip />
                                <Line type="monotone" dataKey="value" stroke="hsl(var(--destructive))" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                        {differencedData.length > 0 && <p className="text-center text-sm text-muted-foreground mt-2">This data can now be modeled with an ARMA model.</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ARIMAModelSimulation;

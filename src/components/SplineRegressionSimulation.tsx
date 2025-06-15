
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter, Line } from 'recharts';

const generateNonLinearData = (n: number) => {
    return Array.from({ length: n }, (_, i) => {
        const x = (i / (n - 1)) * 10;
        const y = Math.sin(x) * 5 + (x/2) + (Math.random() - 0.5) * 2;
        return { x, y };
    });
};

const calculateLinearRegression = (data: { x: number, y: number }[]) => {
    if (data.length === 0) return { m: 0, b: 0 };
    const n = data.length;
    const sumX = data.reduce((acc, p) => acc + p.x, 0);
    const sumY = data.reduce((acc, p) => acc + p.y, 0);
    const sumXY = data.reduce((acc, p) => acc + p.x * p.y, 0);
    const sumX2 = data.reduce((acc, p) => acc + p.x * p.x, 0);

    const m = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    const b = (sumY - m * sumX) / n;

    return { m, b };
};

const SplineRegressionSimulation = () => {
    const [numKnots, setNumKnots] = useState(3);
    const [data, setData] = useState(generateNonLinearData(50));

    const generate = () => setData(generateNonLinearData(50));

    const { lineData, splineData } = useMemo(() => {
        const { m, b } = calculateLinearRegression(data);
        const line = data.map(p => ({ x: p.x, y: m * p.x + b }));

        const sortedData = [...data].sort((a, b) => a.x - b.x);
        const knotIndices = Array.from({ length: numKnots }, (_, i) => 
            Math.floor(i * (sortedData.length - 1) / (numKnots - 1))
        );
        const knots = knotIndices.map(i => sortedData[i]);

        return { lineData: line, splineData: knots };
    }, [data, numKnots]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Spline Regression Simulation</CardTitle>
                <CardDescription>
                    Fit non-linear data using piecewise functions (splines). More knots provide more flexibility.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <Label>Number of Knots: {numKnots}</Label>
                        <Slider value={[numKnots]} onValueChange={v => setNumKnots(v[0])} min={2} max={20} step={1} />
                        <Button onClick={generate} className="w-full">Generate New Data</Button>
                    </div>
                    <div className="md:col-span-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <ComposedChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="x" name="X" domain={[0, 10]} />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Scatter name="Data" dataKey="y" fill="#8884d8" />
                                <Line data={lineData} type="monotone" dataKey="y" name="Linear Fit" stroke="#82ca9d" dot={false} strokeWidth={2}/>
                                <Line data={splineData} type="monotone" dataKey="y" name="Spline Fit" stroke="#ffc658" dot={false} strokeWidth={2}/>
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default SplineRegressionSimulation;

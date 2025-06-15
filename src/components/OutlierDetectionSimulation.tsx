
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter, ZAxis } from 'recharts';

const OutlierDetectionSimulation = () => {
    const [iqrMultiplier, setIqrMultiplier] = useState(1.5);

    const data = useMemo(() => {
        const n = 100;
        const mainData = Array.from({length: n}, () => ({ x: Math.random() * 10, y: Math.random() * 10 + 5 }));
        const outliers = [
            { x: 1, y: 25 },
            { x: 9, y: -5 },
            { x: 5, y: 30 }
        ];
        return [...mainData, ...outliers];
    }, []);

    const { chartData, outlierCount } = useMemo(() => {
        const yValues = data.map(d => d.y).sort((a,b) => a-b);
        const q1 = yValues[Math.floor(yValues.length / 4)];
        const q3 = yValues[Math.floor(yValues.length * 3 / 4)];
        const iqr = q3 - q1;

        const lowerBound = q1 - iqrMultiplier * iqr;
        const upperBound = q3 + iqrMultiplier * iqr;

        const classifiedData = data.map(d => ({
            ...d,
            isOutlier: d.y < lowerBound || d.y > upperBound
        }));

        return {
            chartData: classifiedData,
            outlierCount: classifiedData.filter(d => d.isOutlier).length
        };
    }, [data, iqrMultiplier]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Outlier Detection using IQR</CardTitle>
                <CardDescription>Adjust the IQR multiplier to change the sensitivity of outlier detection.</CardDescription>
            </CardHeader>
             <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <Label>IQR Multiplier: {iqrMultiplier.toFixed(1)}</Label>
                        <Slider value={[iqrMultiplier]} onValueChange={(v) => setIqrMultiplier(v[0])} min={1.0} max={3.0} step={0.1} />
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Outliers Detected</CardTitle>
                                <CardDescription className="text-2xl font-bold">{outlierCount}</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <ResponsiveContainer width="100%" height={300}>
                            <ScatterChart>
                                <CartesianGrid />
                                <XAxis dataKey="x" type="number" name="X" />
                                <YAxis dataKey="y" type="number" name="Y" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Inliers" data={chartData.filter(d => !d.isOutlier)} fill="#8884d8" />
                                <Scatter name="Outliers" data={chartData.filter(d => d.isOutlier)} fill="#ff0000" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default OutlierDetectionSimulation;

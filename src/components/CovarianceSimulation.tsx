
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis } from 'recharts';
import { GitCommitHorizontal } from 'lucide-react';

type DataType = { x: number, y: number };

const generateData = (type: 'positive' | 'negative' | 'zero'): DataType[] => {
    const data: DataType[] = [];
    for (let i = 0; i < 50; i++) {
        const x = Math.random() * 10;
        let y;
        const noise = (Math.random() - 0.5) * 4;
        if (type === 'positive') {
            y = x + noise;
        } else if (type === 'negative') {
            y = 10 - x + noise;
        } else {
            y = Math.random() * 10;
        }
        data.push({ x, y });
    }
    return data;
};

const calculateCovariance = (data: DataType[]): number => {
    if (data.length < 2) return 0;
    const n = data.length;
    const meanX = data.reduce((sum, d) => sum + d.x, 0) / n;
    const meanY = data.reduce((sum, d) => sum + d.y, 0) / n;
    const covariance = data.reduce((sum, d) => sum + (d.x - meanX) * (d.y - meanY), 0) / (n - 1);
    return covariance;
};

const CovarianceSimulation = () => {
    const [dataType, setDataType] = useState<'positive' | 'negative' | 'zero'>('positive');
    
    const data = useMemo(() => generateData(dataType), [dataType]);
    const covariance = useMemo(() => calculateCovariance(data), [data]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><GitCommitHorizontal /> Covariance Explorer</CardTitle>
                <CardDescription>
                    Covariance measures the joint variability of two random variables. It shows how two variables change together.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <Select onValueChange={(value: 'positive' | 'negative' | 'zero') => setDataType(value)} defaultValue={dataType}>
                        <SelectTrigger className="w-full sm:w-[200px]">
                            <SelectValue placeholder="Select data type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="positive">Positive Covariance</SelectItem>
                            <SelectItem value="negative">Negative Covariance</SelectItem>
                            <SelectItem value="zero">Zero Covariance</SelectItem>
                        </SelectContent>
                    </Select>
                    <Card className="flex-1">
                        <CardContent className="pt-6">
                            <p className="text-sm text-muted-foreground">Calculated Covariance</p>
                            <p className="text-2xl font-bold">{covariance.toFixed(2)}</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" name="Variable X" domain={[0, 10]}/>
                            <YAxis type="number" dataKey="y" name="Variable Y" domain={[0, 10]}/>
                            <ZAxis type="number" range={[100]} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="Data points" data={data} fill="hsl(var(--primary))" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
                <div className="text-sm text-muted-foreground">
                    {dataType === 'positive' && "As X increases, Y tends to increase."}
                    {dataType === 'negative' && "As X increases, Y tends to decrease."}
                    {dataType === 'zero' && "There is no clear linear relationship between X and Y."}
                </div>
            </CardContent>
        </Card>
    );
};

export default CovarianceSimulation;


import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Target, CheckCircle, XCircle, BarChart } from 'lucide-react';

const generateData = () => {
    const data = [];
    for (let i = 0; i < 50; i++) {
        data.push({ x: Math.random() * 0.6, y: Math.random(), type: 'A' }); // Class A
        data.push({ x: Math.random() * 0.6 + 0.4, y: Math.random(), type: 'B' }); // Class B
    }
    return data;
};

const ClassificationMetricsSimulation = () => {
    const [data] = useState(generateData());
    const [threshold, setThreshold] = useState(0.5);

    const { tp, fp, tn, fn, precision, recall, f1 } = useMemo(() => {
        let tp = 0, fp = 0, tn = 0, fn = 0;
        data.forEach(d => {
            const predictedPositive = d.x >= threshold;
            const actualPositive = d.type === 'B';
            if (predictedPositive && actualPositive) tp++;
            else if (predictedPositive && !actualPositive) fp++;
            else if (!predictedPositive && !actualPositive) tn++;
            else if (!predictedPositive && actualPositive) fn++;
        });

        const precision = tp / (tp + fp) || 0;
        const recall = tp / (tp + fn) || 0;
        const f1 = 2 * (precision * recall) / (precision + recall) || 0;

        return { tp, fp, tn, fn, precision, recall, f1 };
    }, [data, threshold]);

    const MetricCard = ({ title, value, icon: Icon, description }: { title: string, value: string, icon: React.ElementType, description: string }) => (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground">{description}</p>
            </CardContent>
        </Card>
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target /> Classification Metrics</CardTitle>
                <CardDescription>Explore how a classifier's threshold affects its performance.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="p-4 border rounded-lg">
                            <Label htmlFor="threshold-slider">Classification Threshold ({threshold.toFixed(2)})</Label>
                            <Slider id="threshold-slider" value={[threshold]} onValueChange={(v) => setThreshold(v[0])} min={0} max={1} step={0.01} />
                        </div>
                        <ResponsiveContainer width="100%" height={300}>
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid />
                                <XAxis type="number" dataKey="x" name="Feature" domain={[0, 1]} />
                                <YAxis type="number" dataKey="y" name="Value" domain={[0, 1]} hide/>
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Class A" data={data.filter(d => d.type === 'A')} fill="#8884d8" />
                                <Scatter name="Class B" data={data.filter(d => d.type === 'B')} fill="#82ca9d" />
                                <ReferenceLine x={threshold} stroke="red" strokeWidth={2} label={{ value: "Threshold", position: "insideTop" }} />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-4">
                        <h3 className="font-semibold text-center">Confusion Matrix</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead></TableHead>
                                    <TableHead className="text-center">Predicted: B</TableHead>
                                    <TableHead className="text-center">Predicted: A</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableHead className="font-bold">Actual: B</TableHead>
                                    <TableCell className="text-center bg-green-100 dark:bg-green-900 rounded">TP: {tp}</TableCell>
                                    <TableCell className="text-center bg-red-100 dark:bg-red-900 rounded">FN: {fn}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableHead className="font-bold">Actual: A</TableHead>
                                    <TableCell className="text-center bg-orange-100 dark:bg-orange-900 rounded">FP: {fp}</TableCell>
                                    <TableCell className="text-center bg-blue-100 dark:bg-blue-900 rounded">TN: {tn}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                            <MetricCard title="Precision" value={precision.toFixed(3)} icon={CheckCircle} description="TP / (TP + FP)" />
                            <MetricCard title="Recall" value={recall.toFixed(3)} icon={XCircle} description="TP / (TP + FN)" />
                            <MetricCard title="F1-Score" value={f1.toFixed(3)} icon={BarChart} description="Harmonic mean" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ClassificationMetricsSimulation;

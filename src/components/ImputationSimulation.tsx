
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter } from 'recharts';

const ImputationSimulation = () => {
    const [imputationMethod, setImputationMethod] = useState('mean');
    const n = 50;
    const missingRate = 0.2;

    const originalData = useMemo(() => {
        return Array.from({length: n}, (_, i) => ({ x: i, y: 2 * i + (Math.random() - 0.5) * 20 }));
    }, []);

    const dataWithMissing = useMemo(() => {
        return originalData.map(d => Math.random() < missingRate ? { ...d, y: null } : d);
    }, [originalData]);

    const { imputedData, stats } = useMemo(() => {
        const observed = dataWithMissing.filter(d => d.y !== null);
        const mean = observed.reduce((sum, d) => sum + d.y, 0) / observed.length;
        const median = observed.slice().sort((a,b) => a.y - b.y)[Math.floor(observed.length / 2)].y;

        const imputed = dataWithMissing.map(d => {
            if (d.y !== null) return { ...d, type: 'Observed' };
            let imputedValue;
            if (imputationMethod === 'mean') {
                imputedValue = mean;
            } else { // median
                imputedValue = median;
            }
            return { x: d.x, y: imputedValue, type: 'Imputed' };
        });

        const originalMean = originalData.reduce((sum, d) => sum + d.y, 0) / n;
        const imputedMean = imputed.reduce((sum, d) => sum + d.y, 0) / n;

        return { 
            imputedData: imputed,
            stats: { originalMean, imputedMean }
        };
    }, [dataWithMissing, imputationMethod, originalData]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Data Imputation for Missing Values</CardTitle>
                <CardDescription>Select an imputation method to fill in missing data and see its effect on the distribution.</CardDescription>
            </CardHeader>
             <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <Label>Imputation Method</Label>
                        <Select value={imputationMethod} onValueChange={setImputationMethod}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mean">Mean Imputation</SelectItem>
                            <SelectItem value="median">Median Imputation</SelectItem>
                          </SelectContent>
                        </Select>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Original Mean</CardTitle>
                                <CardDescription className="text-xl font-bold">{stats.originalMean.toFixed(2)}</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Imputed Mean</CardTitle>
                                <CardDescription className="text-xl font-bold">{stats.imputedMean.toFixed(2)}</CardDescription>
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
                                <Scatter name="Observed" data={imputedData.filter(d => d.type === 'Observed')} fill="#8884d8" />
                                <Scatter name="Imputed" data={imputedData.filter(d => d.type === 'Imputed')} fill="#82ca9d" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default ImputationSimulation;

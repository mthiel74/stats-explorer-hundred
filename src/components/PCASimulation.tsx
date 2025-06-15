
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart } from 'recharts';
import { GitCommit } from 'lucide-react';

const generateCorrelatedData = (n, meanX, meanY, stdX, stdY, correlation) => {
    const data = [];
    for (let i = 0; i < n; i++) {
        const u1 = Math.random();
        const u2 = Math.random();
        const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
        const z2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);
        const x = meanX + stdX * z1;
        const y = meanY + stdY * (correlation * z1 + Math.sqrt(1 - correlation * correlation) * z2);
        data.push({ x, y });
    }
    return data;
};

const PCASimulation = () => {
    const [correlation, setCorrelation] = useState(0.8);
    const [data, setData] = useState(generateCorrelatedData(100, 0, 0, 1, 1, 0.8));
    const [pcaResult, setPcaResult] = useState(null);

    const regenerateData = () => {
        setData(generateCorrelatedData(100, 0, 0, 1, 1, correlation));
        setPcaResult(null);
    };

    const runPCA = () => {
        const meanX = data.reduce((s, d) => s + d.x, 0) / data.length;
        const meanY = data.reduce((s, d) => s + d.y, 0) / data.length;
        const covXX = data.reduce((s, d) => s + (d.x - meanX) * (d.x - meanX), 0) / (data.length - 1);
        const covYY = data.reduce((s, d) => s + (d.y - meanY) * (d.y - meanY), 0) / (data.length - 1);
        const covXY = data.reduce((s, d) => s + (d.x - meanX) * (d.y - meanY), 0) / (data.length - 1);
        
        const trace = covXX + covYY;
        const det = covXX * covYY - covXY * covXY;
        const lambda1 = trace / 2 + Math.sqrt(trace * trace / 4 - det);
        
        let v1x = covXY;
        let v1y = lambda1 - covXX;
        const mag1 = Math.sqrt(v1x*v1x + v1y*v1y);
        v1x /= mag1;
        v1y /= mag1;

        setPcaResult({ meanX, meanY, v1x, v1y, explainedVariance: (lambda1 / trace) * 100 });
    };

    const pcLine = useMemo(() => {
        if (!pcaResult) return [];
        const { meanX, meanY, v1x, v1y } = pcaResult;
        return [
            { x: meanX - v1x * 5, y: meanY - v1y * 5 },
            { x: meanX + v1x * 5, y: meanY + v1y * 5 }
        ];
    }, [pcaResult]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><GitCommit /> Dimensionality Drifter (PCA)</CardTitle>
                <CardDescription>
                    Principal Component Analysis finds the directions of greatest variance in data. Generate correlated data and run PCA to find the primary axis (the first principal component).
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <Card>
                        <CardContent className="pt-6 space-y-3">
                            <label className="font-semibold">Data Correlation</label>
                            <Slider defaultValue={[correlation]} max={0.99} min={-0.99} step={0.01} onValueChange={([val]) => setCorrelation(val)} />
                            <Button onClick={regenerateData} className="w-full">Generate New Data</Button>
                        </CardContent>
                    </Card>
                    <Button onClick={runPCA} className="w-full">Run PCA</Button>
                    {pcaResult && (
                        <Card>
                            <CardContent className="pt-6 text-center">
                                <p className="text-sm text-muted-foreground">Variance explained by PC1</p>
                                <p className="text-3xl font-bold">{pcaResult.explainedVariance.toFixed(1)}%</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
                <div className="lg:col-span-2 min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                        <ComposedChart data={data} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" domain={[-4, 4]} />
                            <YAxis type="number" dataKey="y" domain={[-4, 4]} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="Data" dataKey="x" fill="hsl(var(--primary))" />
                            {pcaResult && <Line data={pcLine} dataKey="y" stroke="hsl(var(--destructive))" strokeWidth={3} dot={false} legendType="none" />}
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default PCASimulation;


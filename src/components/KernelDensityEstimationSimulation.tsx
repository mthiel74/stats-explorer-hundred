
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line, ComposedChart } from 'recharts';

const generateBimodalData = (n: number) => {
    const data = [];
    const noise = () => (Math.random() - 0.5) * 2;
    for (let i = 0; i < n; i++) {
        if (Math.random() > 0.5) {
            data.push(5 + noise()); // First mode
        } else {
            data.push(15 + noise()); // Second mode
        }
    }
    return data;
};

const gaussianKernel = (u: number) => (1 / Math.sqrt(2 * Math.PI)) * Math.exp(-0.5 * u * u);

const calculateKDE = (data: number[], bandwidth: number) => {
    const points = Array.from({ length: 100 }, (_, i) => (i / 99) * 20);
    const n = data.length;
    
    const kdeValues = points.map(x => {
        const sum = data.reduce((acc, xi) => acc + gaussianKernel((x - xi) / bandwidth), 0);
        return { x, y: sum / (n * bandwidth) };
    });
    return kdeValues;
};

const KernelDensityEstimationSimulation = () => {
    const [bandwidth, setBandwidth] = useState(1);
    const [data, setData] = useState(generateBimodalData(100));

    const generate = () => setData(generateBimodalData(100));

    const { kdeData, histogramData } = useMemo(() => {
        const kde = calculateKDE(data, bandwidth);
        
        const bins = Array.from({length: 20}, () => 0);
        data.forEach(d => {
            const binIndex = Math.floor(d);
            if (binIndex >= 0 && binIndex < 20) {
                bins[binIndex]++;
            }
        });
        const hist = bins.map((count, i) => ({ x: i + 0.5, count }));

        return { kdeData: kde, histogramData: hist };
    }, [data, bandwidth]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Kernel Density Estimation (KDE)</CardTitle>
                <CardDescription>
                    Estimate the underlying probability distribution of a dataset. Bandwidth controls smoothness.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <Label>Bandwidth (h): {bandwidth.toFixed(2)}</Label>
                        <Slider value={[bandwidth]} onValueChange={v => setBandwidth(v[0])} min={0.1} max={5} step={0.05} />
                        <Button onClick={generate} className="w-full">Generate New Data</Button>
                    </div>
                    <div className="md:col-span-2">
                        <ResponsiveContainer width="100%" height={350}>
                             <ComposedChart data={histogramData} >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="x" name="Value" domain={[0, 20]}/>
                                <YAxis yAxisId="left" orientation="left" stroke="#8884d8" label={{ value: 'Count', angle: -90, position: 'insideLeft' }} />
                                <YAxis yAxisId="right" orientation="right" stroke="#ffc658" label={{ value: 'Density', angle: -90, position: 'insideRight' }}/>
                                <Tooltip />
                                <Legend />
                                <Bar yAxisId="left" name="Histogram" dataKey="count" fill="#8884d8" barSize={20} />
                                <Line yAxisId="right" data={kdeData} type="monotone" dataKey="y" name="KDE" stroke="#ffc658" dot={false} strokeWidth={2}/>
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default KernelDensityEstimationSimulation;

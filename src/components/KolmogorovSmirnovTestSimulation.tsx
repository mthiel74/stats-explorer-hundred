
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, Legend, ReferenceLine } from 'recharts';

const randomNormal = (mean = 0, stdDev = 1) => {
    let u1 = 0, u2 = 0;
    while(u1 === 0) u1 = Math.random();
    while(u2 === 0) u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdDev + mean;
};

const findY = (x, ecdf) => {
    const point = ecdf.slice().reverse().find(p => p.x <= x);
    return point ? point.y : 0;
}

const KolmogorovSmirnovTestSimulation = () => {
    const [mean1, setMean1] = useState(5);
    const [stdDev1, setStdDev1] = useState(1);
    const [mean2, setMean2] = useState(5.5);
    const [stdDev2, setStdDev2] = useState(1.5);
    const n = 50;

    const { chartData, ksStat, pValue, maxDiffPoint } = useMemo(() => {
        const sample1 = Array.from({ length: n }, () => randomNormal(mean1, stdDev1)).sort((a, b) => a - b);
        const sample2 = Array.from({ length: n }, () => randomNormal(mean2, stdDev2)).sort((a, b) => a - b);

        const ecdf1 = sample1.map((val, i) => ({ x: val, y: (i + 1) / n }));
        const ecdf2 = sample2.map((val, i) => ({ x: val, y: (i + 1) / n }));
        
        const allX = [...new Set([...sample1, ...sample2])].sort((a,b) => a-b);
        
        let maxDiff = 0;
        let maxDiffX = 0;

        for (const x of allX) {
            const y1 = findY(x, ecdf1);
            const y2 = findY(x, ecdf2);
            const diff = Math.abs(y1 - y2);
            if (diff > maxDiff) {
                maxDiff = diff;
                maxDiffX = x;
            }
        }
        
        const ks = maxDiff;
        const p = Math.min(1, Math.exp(-2 * n * ks * ks));
        
        const combinedData = allX.map(x => ({
            x: x,
            sample1: findY(x, ecdf1),
            sample2: findY(x, ecdf2),
        }));

        const maxDiffPoint = {
            x: maxDiffX,
            y1: findY(maxDiffX, ecdf1),
            y2: findY(maxDiffX, ecdf2),
        };

        return { chartData: combinedData, ksStat: ks, pValue: p, maxDiffPoint };
    }, [mean1, stdDev1, mean2, stdDev2]);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Kolmogorov-Smirnov Test</CardTitle>
                <CardDescription>Compare the distributions of two samples. Adjust their mean and standard deviation to see the effect on the Empirical Cumulative Distribution Functions (ECDFs).</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <Label>Sample 1 Mean: {mean1.toFixed(1)}</Label>
                        <Slider value={[mean1]} onValueChange={(v) => setMean1(v[0])} min={0} max={10} step={0.1} />
                        <Label>Sample 1 Std Dev: {stdDev1.toFixed(1)}</Label>
                        <Slider value={[stdDev1]} onValueChange={(v) => setStdDev1(v[0])} min={0.5} max={3} step={0.1} />
                         <Label>Sample 2 Mean: {mean2.toFixed(1)}</Label>
                        <Slider value={[mean2]} onValueChange={(v) => setMean2(v[0])} min={0} max={10} step={0.1} />
                        <Label>Sample 2 Std Dev: {stdDev2.toFixed(1)}</Label>
                        <Slider value={[stdDev2]} onValueChange={(v) => setStdDev2(v[0])} min={0.5} max={3} step={0.1} />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={chartData}>
                                <CartesianGrid />
                                <XAxis type="number" dataKey="x" domain={['dataMin', 'dataMax']} allowDataOverflow/>
                                <YAxis domain={[0, 1]} />
                                <Tooltip />
                                <Legend />
                                <Line type="step" dataKey="sample1" stroke="#8884d8" dot={false} name="Sample 1 ECDF" />
                                <Line type="step" dataKey="sample2" stroke="#82ca9d" dot={false} name="Sample 2 ECDF" />
                                {maxDiffPoint && (
                                    <ReferenceLine 
                                        segment={[{ x: maxDiffPoint.x, y: maxDiffPoint.y1 }, { x: maxDiffPoint.x, y: maxDiffPoint.y2 }]} 
                                        stroke="red" 
                                        strokeWidth={2}
                                        label={{ value: `KS Stat: ${ksStat.toFixed(3)}`, position: 'insideTopRight' }}
                                    />
                                )}
                            </LineChart>
                        </ResponsiveContainer>
                        <div className="flex gap-4">
                            <Card className="flex-1 text-center">
                                <CardHeader>
                                    <CardTitle>KS Statistic (D)</CardTitle>
                                    <CardDescription className="text-2xl font-bold">{ksStat.toFixed(3)}</CardDescription>
                                </CardHeader>
                            </Card>
                             <Card className="flex-1 text-center">
                                <CardHeader>
                                    <CardTitle>p-value</CardTitle>
                                    <CardDescription className={`text-2xl font-bold ${pValue < 0.05 ? 'text-green-500' : 'text-red-500'}`}>{pValue < 0.001 ? '< 0.001' : pValue.toFixed(3)}</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default KolmogorovSmirnovTestSimulation;

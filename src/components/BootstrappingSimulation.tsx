
import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Repeat } from 'lucide-react';

const createHistogramData = (data: number[], binWidth: number) => {
    if (data.length === 0) return [];
    const min = Math.min(...data);
    const max = Math.max(...data);
    const bins: { [key: string]: number } = {};
    for (const val of data) {
        const bin = (Math.floor(val / binWidth) * binWidth).toFixed(2);
        bins[bin] = (bins[bin] || 0) + 1;
    }
    return Object.entries(bins)
        .map(([bin, count]) => ({ bin: parseFloat(bin), count }))
        .sort((a, b) => a.bin - b.bin);
};

const BootstrappingSimulation = () => {
    const [initialSampleSize, setInitialSampleSize] = useState(50);
    const [numResamples, setNumResamples] = useState(1000);
    const [originalSample, setOriginalSample] = useState<number[]>([]);
    const [bootstrapMeans, setBootstrapMeans] = useState<number[]>([]);

    const truePopulationMean = Math.exp(0.5);
    
    const generateOriginalSample = useCallback(() => {
        const sample: number[] = [];
        for (let i = 0; i < initialSampleSize; i++) {
            let u1 = Math.random();
            let u2 = Math.random();
            let z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            sample.push(Math.exp(z0));
        }
        setOriginalSample(sample);
        setBootstrapMeans([]);
    }, [initialSampleSize]);
    
    const runBootstrap = useCallback(() => {
        if (originalSample.length === 0) return;
        const means: number[] = [];
        for (let i = 0; i < numResamples; i++) {
            let resampleSum = 0;
            for (let j = 0; j < originalSample.length; j++) {
                const randomIndex = Math.floor(Math.random() * originalSample.length);
                resampleSum += originalSample[randomIndex];
            }
            means.push(resampleSum / originalSample.length);
        }
        setBootstrapMeans(means);
    }, [originalSample, numResamples]);

    const originalSampleMean = useMemo(() => {
        if (originalSample.length === 0) return null;
        return originalSample.reduce((a, b) => a + b, 0) / originalSample.length;
    }, [originalSample]);

    const bootstrapCI = useMemo(() => {
        if (bootstrapMeans.length < 2) return null;
        const sortedMeans = [...bootstrapMeans].sort((a, b) => a - b);
        const lowerIndex = Math.floor(0.025 * sortedMeans.length);
        const upperIndex = Math.ceil(0.975 * sortedMeans.length) - 1;
        return {
            lower: sortedMeans[lowerIndex],
            upper: sortedMeans[upperIndex],
        };
    }, [bootstrapMeans]);

    const originalSampleHistogram = useMemo(() => createHistogramData(originalSample, 0.5), [originalSample]);
    const bootstrapHistogram = useMemo(() => createHistogramData(bootstrapMeans, 0.05), [bootstrapMeans]);
    
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Repeat /> Gem-Hoarding Goblins</CardTitle>
                                <CardDescription>
                                    A goblin shows you a small pouch of gems (a sample). Use bootstrapping to estimate the average weight of all gems in their hoard (the population).
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <div className="space-y-4">
                          <label className="block font-medium">Gems in Pouch (Sample Size): <span className="text-primary font-bold">{initialSampleSize}</span></label>
                          <Slider value={[initialSampleSize]} onValueChange={(v) => setInitialSampleSize(v[0])} min={10} max={200} step={5} />
                        </div>
                        <div className="space-y-4">
                          <label className="block font-medium">Number of Resamples: <span className="text-primary font-bold">{numResamples}</span></label>
                          <Slider value={[numResamples]} onValueChange={(v) => setNumResamples(v[0])} min={100} max={5000} step={100} />
                        </div>
                        <Button onClick={generateOriginalSample} className="w-full">Get a New Pouch of Gems</Button>
                        <Button onClick={runBootstrap} disabled={originalSample.length === 0} className="w-full">Run Bootstrap</Button>
                    </div>
                    <div className="lg:col-span-2 space-y-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-center">Original Sample of Gem Weights</h3>
                            <ResponsiveContainer width="100%" height={200}>
                                {originalSample.length > 0 ? (
                                    <BarChart data={originalSampleHistogram} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="bin" type="number" domain={['dataMin', 'dataMax']} label={{ value: 'Gem Weight', position: 'insideBottom', offset: -5 }} />
                                        <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} allowDecimals={false} />
                                        <Tooltip />
                                        <Bar dataKey="count" fill="hsl(var(--primary))" />
                                        {originalSampleMean !== null && <ReferenceLine x={originalSampleMean} stroke="hsl(var(--destructive))" label="Sample Mean" />}
                                    </BarChart>
                                ) : <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg"><p className="text-muted-foreground">Get a sample to see its distribution.</p></div>}
                            </ResponsiveContainer>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2 text-center">Bootstrap Distribution of Sample Means</h3>
                             <ResponsiveContainer width="100%" height={200}>
                                {bootstrapMeans.length > 0 ? (
                                    <BarChart data={bootstrapHistogram} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="bin" type="number" domain={['dataMin', 'dataMax']} label={{ value: 'Sample Mean Weight', position: 'insideBottom', offset: -5 }} />
                                        <YAxis label={{ value: 'Count', angle: -90, position: 'insideLeft' }} allowDecimals={false}/>
                                        <Tooltip />
                                        <Bar dataKey="count" fill="hsl(var(--secondary))" />
                                        {bootstrapCI && <ReferenceLine x={bootstrapCI.lower} stroke="hsl(var(--destructive))" strokeDasharray="3 3" label="2.5th %ile" />}
                                        {bootstrapCI && <ReferenceLine x={bootstrapCI.upper} stroke="hsl(var(--destructive))" strokeDasharray="3 3" label="97.5th %ile" />}
                                    </BarChart>
                                ) : <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg"><p className="text-muted-foreground">Run bootstrap to see the distribution of means.</p></div>}
                            </ResponsiveContainer>
                        </div>
                        {bootstrapCI && (
                             <Card>
                                <CardHeader>
                                <CardTitle>Bootstrap 95% Confidence Interval for Mean Gem Weight</CardTitle>
                                </CardHeader>
                                <CardContent className="text-center pt-4">
                                <p className="text-3xl font-bold tracking-tight">[{bootstrapCI.lower.toFixed(3)}, {bootstrapCI.upper.toFixed(3)}]</p>
                                <p className="text-sm text-muted-foreground mt-2">The true (but unknown) population mean is <span className="font-bold">{truePopulationMean.toFixed(3)}</span>. Does the interval contain it?</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default BootstrappingSimulation;

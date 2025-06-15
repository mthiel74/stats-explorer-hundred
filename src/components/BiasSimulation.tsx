
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { Scale, RefreshCw } from 'lucide-react';

const POPULATION_SIZE = 1000;
const POPULATION_MEAN = 100;
const POPULATION_STD_DEV = 20;

const generatePopulation = () => {
    const population = [];
    for (let i = 0; i < POPULATION_SIZE; i++) {
        let u = 0, v = 0;
        while (u === 0) u = Math.random();
        while (v === 0) v = Math.random();
        const z = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        population.push(z * POPULATION_STD_DEV + POPULATION_MEAN);
    }
    return population;
};

const BiasSimulation = () => {
    const [population] = useState(generatePopulation);
    const [unbiasedSamples, setUnbiasedSamples] = useState<number[][]>([]);
    const [biasedSamples, setBiasedSamples] = useState<number[][]>([]);
    const sampleSize = 30;

    const drawUnbiasedSample = () => {
        const sample = [];
        for (let i = 0; i < sampleSize; i++) {
            sample.push(population[Math.floor(Math.random() * POPULATION_SIZE)]);
        }
        setUnbiasedSamples(prev => [...prev, sample]);
    };

    const drawBiasedSample = () => {
        // This biased sample only picks from the top 75% of the population
        const sortedPopulation = [...population].sort((a, b) => a - b);
        const biasedPopulation = sortedPopulation.slice(Math.floor(POPULATION_SIZE * 0.25));

        const sample = [];
        for (let i = 0; i < sampleSize; i++) {
            sample.push(biasedPopulation[Math.floor(Math.random() * biasedPopulation.length)]);
        }
        setBiasedSamples(prev => [...prev, sample]);
    };

    const reset = () => {
        setUnbiasedSamples([]);
        setBiasedSamples([]);
    };

    const calculateMean = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

    const unbiasedMeans = useMemo(() => unbiasedSamples.map(calculateMean), [unbiasedSamples]);
    const biasedMeans = useMemo(() => biasedSamples.map(calculateMean), [biasedSamples]);

    const BinnedMeansChart = ({ means, title, color }: { means: number[], title: string, color: string }) => {
        const binnedData = useMemo(() => {
            if (means.length === 0) return [];
            const bins = new Map<number, number>();
            const binSize = 2;
            means.forEach(mean => {
                const bin = Math.floor(mean / binSize) * binSize;
                bins.set(bin, (bins.get(bin) || 0) + 1);
            });
            return Array.from(bins.entries()).map(([value, count]) => ({ value, count })).sort((a, b) => a.value - b.value);
        }, [means]);
    
        return (
            <Card>
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {means.length > 0 && 
                        <CardDescription>
                            Average of sample means: {calculateMean(means).toFixed(2)}
                        </CardDescription>
                    }
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={binnedData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" dataKey="value" domain={[POPULATION_MEAN - 2*POPULATION_STD_DEV, POPULATION_MEAN + 2*POPULATION_STD_DEV]}/>
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Bar dataKey="count" fill={color} />
                            <ReferenceLine x={POPULATION_MEAN} stroke="hsl(var(--destructive))" strokeWidth={2}>
                                <Label value="Pop. Mean" position="top" fill="hsl(var(--destructive))"/>
                            </ReferenceLine>
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        );
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Scale /> Statistical Bias Simulation</CardTitle>
                <CardDescription>
                   See how biased sampling methods produce sample means that are systematically different from the true population mean. Here, the biased sample only draws from the highest 75% of values.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                    <Button onClick={drawUnbiasedSample}>Draw Unbiased Sample</Button>
                    <Button onClick={drawBiasedSample} variant="secondary">Draw Biased Sample</Button>
                    <Button onClick={reset} variant="outline"><RefreshCw className="mr-2 h-4 w-4"/> Reset</Button>
                </div>
                <div className="text-center text-sm text-muted-foreground">
                    Population Mean: <span className="font-bold text-foreground">{POPULATION_MEAN.toFixed(2)}</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <BinnedMeansChart means={unbiasedMeans} title={`Unbiased Sample Means (${unbiasedMeans.length})`} color="hsl(var(--primary))"/>
                    <BinnedMeansChart means={biasedMeans} title={`Biased Sample Means (${biasedMeans.length})`} color="hsl(var(--secondary))"/>
                </div>
            </CardContent>
        </Card>
    );
};

export default BiasSimulation;


import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { Scale } from 'lucide-react';

// Helper functions
function standardNormalCdf(x: number) {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    if (x > 0) prob = 1 - prob;
    return prob;
}

function randomNormal(mean: number, stdDev: number) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    const z = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
    return z * stdDev + mean;
}

const normalPdf = (x: number, mean: number, stdDev: number) => {
    return (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));
};

const PValueSimulation = () => {
    const POPULATION_MEAN = 100;
    const POPULATION_STD_DEV = 15;
    const SAMPLE_SIZE = 30;
    const stdError = POPULATION_STD_DEV / Math.sqrt(SAMPLE_SIZE);
    
    const [result, setResult] = useState<{ sampleMean: number; zScore: number; pValue: number } | null>(null);

    const runSimulation = useCallback(() => {
        // We add a small effect to have interesting results more often
        const sampleMean = randomNormal(POPULATION_MEAN + 5, POPULATION_STD_DEV);
        const zScore = (sampleMean - POPULATION_MEAN) / stdError;
        const pValue = 1 - standardNormalCdf(zScore);
        setResult({ sampleMean, zScore, pValue });
    }, [stdError]);

    const chartData = useMemo(() => {
        const data = [];
        const min = POPULATION_MEAN - 4 * stdError;
        const max = POPULATION_MEAN + 4 * stdError;
        const step = (max - min) / 100;

        for (let x = min; x <= max; x += step) {
            const density = normalPdf(x, POPULATION_MEAN, stdError);
            const pArea = result && x >= result.sampleMean ? density : 0;
            data.push({ x: x, density, pArea });
        }
        return data;
    }, [result, stdError]);

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Scale /> Weighing the Evidence</CardTitle>
                                <CardDescription>
                                    The p-value is the probability of getting a result at least as extreme as the one observed, assuming the null hypothesis is true. A small p-value (&lt; 0.05) suggests that your result is unlikely to be due to chance.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <Button onClick={runSimulation} className="w-full">
                           Run Test & Get P-Value
                        </Button>
                        {result && (
                            <Card>
                                <CardContent className="pt-6 text-center">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Sample Mean</p>
                                            <p className="text-2xl font-bold">{result.sampleMean.toFixed(2)}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm text-muted-foreground">P-Value</p>
                                            <p className="text-2xl font-bold">{result.pValue < 0.001 ? "< 0.001" : result.pValue.toFixed(3)}</p>
                                        </div>
                                    </div>
                                    <p className={`mt-4 text-lg font-semibold ${result.pValue < 0.05 ? 'text-green-500' : 'text-red-500'}`}>
                                        {result.pValue < 0.05 ? 'Statistically Significant' : 'Not Statistically Significant'}
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                    <div className="lg:col-span-2 min-h-[400px] space-y-4">
                        <h3 className="text-lg font-semibold mb-2 text-center">Sampling Distribution under H₀</h3>
                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="x" type="number" domain={['dataMin', 'dataMax']} name="Sample Mean" label={{ value: "Sample Mean", position: "bottom" }} />
                                <YAxis />
                                <Tooltip formatter={(value, name) => [typeof value === 'number' ? value.toFixed(4) : value, name]} />
                                <Area type="monotone" dataKey="density" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" name="Probability Density" />
                                <Area type="monotone" dataKey="pArea" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive) / 0.5)" name="P-Value Area" />
                                {result && (
                                    <ReferenceLine x={result.sampleMean} stroke="hsl(var(--destructive))" strokeWidth={2}>
                                        <Label value="Observed Mean" position="top" fill="hsl(var(--destructive))"/>
                                    </ReferenceLine>
                                )}
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PValueSimulation;

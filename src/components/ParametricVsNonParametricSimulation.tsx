
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ParametricVsNonParametricSimulation = () => {
    const [results, setResults] = useState<{ type: string, mean: number, median: number, test: string } | null>(null);

    const generateNormal = () => {
        const n = 50;
        const mean = 10, std = 2;
        const sample = Array.from({length: n}, () => {
            let u=0, v=0;
            while(u===0) u = Math.random();
            while(v===0) v = Math.random();
            return mean + std * Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
        });
        const sampleMean = sample.reduce((a,b) => a+b, 0) / n;
        const sorted = [...sample].sort((a,b) => a-b);
        const sampleMedian = (sorted[Math.floor(n/2) -1] + sorted[Math.ceil(n/2) -1])/2;
        setResults({
            type: "Normally Distributed",
            mean: sampleMean,
            median: sampleMedian,
            test: "A parametric test (like a t-test) is appropriate here as the data is symmetric and bell-shaped."
        });
    };

    const generateSkewed = () => {
        const n = 50;
        const lambda = 0.1;
        const sample = Array.from({length: n}, () => -Math.log(1.0 - Math.random()) / lambda);
        const sampleMean = sample.reduce((a,b) => a+b, 0) / n;
        const sorted = [...sample].sort((a,b) => a-b);
        const sampleMedian = (sorted[Math.floor(n/2) -1] + sorted[Math.ceil(n/2) -1])/2;
         setResults({
            type: "Right-Skewed",
            mean: sampleMean,
            median: sampleMedian,
            test: "A non-parametric test (like Mann-Whitney U) is more robust as it doesn't assume normality and is less affected by outliers/skew."
        });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Parametric vs. Non-parametric Statistics</CardTitle>
                <CardDescription>
                    Parametric tests assume data follows a specific distribution (e.g., normal), while non-parametric tests make no such assumptions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center gap-4 mb-8">
                    <Button onClick={generateNormal}>Generate Normal Data</Button>
                    <Button onClick={generateSkewed}>Generate Skewed Data</Button>
                </div>
                {results && (
                    <Card className="bg-muted">
                        <CardHeader>
                            <CardTitle>{results.type} Data</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <p className="text-center">For skewed data, the mean is pulled by extreme values, while the median remains a more robust measure of central tendency.</p>
                            <div className="flex justify-around text-center">
                                <div>
                                    <p className="text-muted-foreground">Mean</p>
                                    <p className="text-2xl font-bold">{results.mean.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-muted-foreground">Median</p>
                                    <p className="text-2xl font-bold">{results.median.toFixed(2)}</p>
                                </div>
                            </div>
                            <p className="text-center italic">{results.test}</p>
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>
    );
};

export default ParametricVsNonParametricSimulation;

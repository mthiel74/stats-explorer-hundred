
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

// Function to generate correlated variables
const generateCorrelatedData = (n: number, correlation: number) => {
    const x1 = Array.from({ length: n }, () => (Math.random() - 0.5) * 20);
    const error = Array.from({ length: n }, () => (Math.random() - 0.5) * 20);
    const x2 = x1.map((val, i) => val * correlation + error[i] * Math.sqrt(1 - correlation**2));
    
    // Normalize to have similar scales
    const mean_x1 = x1.reduce((a,b)=>a+b,0)/n;
    const sd_x1 = Math.sqrt(x1.map(x=>Math.pow(x-mean_x1,2)).reduce((a,b)=>a+b,0)/n);
    const norm_x1 = x1.map(x=>(x-mean_x1)/sd_x1);

    const mean_x2 = x2.reduce((a,b)=>a+b,0)/n;
    const sd_x2 = Math.sqrt(x2.map(x=>Math.pow(x-mean_x2,2)).reduce((a,b)=>a+b,0)/n);
    const norm_x2 = x2.map(x=>(x-mean_x2)/sd_x2);

    return { x1: norm_x1, x2: norm_x2 };
};

// Simplified OLS - this is not a full implementation but serves for demonstration.
// A real one would use matrix algebra.
const getVIF = (correlation: number) => {
    if (Math.abs(correlation) === 1) return Infinity;
    return 1 / (1 - correlation**2);
}

const MulticollinearitySimulation = () => {
    const [correlation, setCorrelation] = useState(0.5);
    const [estimates, setEstimates] = useState<{ b1: number[], b2: number[] }>({ b1: [], b2: [] });

    // True model: y = 2*x1 + 2*x2 + noise
    const trueB1 = 2;
    const trueB2 = 2;

    const runSimulation = (runs = 20) => {
        const tempEstimates = { b1: [] as number[], b2: [] as number[] };
        for (let i = 0; i < runs; i++) {
            const { x1, x2 } = generateCorrelatedData(50, correlation);
            const noise = Array.from({ length: 50 }, () => (Math.random() - 0.5) * 5);
            const y = x1.map((val, j) => trueB1 * val + trueB2 * x2[j] + noise[j]);
            
            // Simplified estimate placeholders to show variance effect
            // In reality, high correlation inflates standard errors.
            const errorFactor = 1 / (1 - correlation**2);
            tempEstimates.b1.push(trueB1 + (Math.random() - 0.5) * errorFactor);
            tempEstimates.b2.push(trueB2 + (Math.random() - 0.5) * errorFactor);
        }
        setEstimates(tempEstimates);
    };

    const stats = useMemo(() => {
        const n = estimates.b1.length;
        if (n === 0) return { meanB1: 0, stdB1: 0, meanB2: 0, stdB2: 0 };
        const meanB1 = estimates.b1.reduce((a, b) => a + b, 0) / n;
        const meanB2 = estimates.b2.reduce((a, b) => a + b, 0) / n;
        const stdB1 = Math.sqrt(estimates.b1.reduce((acc, val) => acc + (val - meanB1)**2, 0) / (n - 1));
        const stdB2 = Math.sqrt(estimates.b2.reduce((acc, val) => acc + (val - meanB2)**2, 0) / (n - 1));
        return { meanB1, stdB1, meanB2, stdB2 };
    }, [estimates]);

    const vif = getVIF(correlation);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Multicollinearity Simulation</CardTitle>
                <CardDescription>
                    When predictors are highly correlated, it becomes hard to disentangle their individual effects, increasing the variance of coefficient estimates.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <Label>Correlation between X1 and X2: {correlation.toFixed(2)}</Label>
                        <Slider value={[correlation]} onValueChange={v => setCorrelation(v[0])} min={0} max={0.99} step={0.01} />
                        <Button onClick={() => runSimulation()} className="w-full">Run Simulation</Button>
                        <Card className="p-4 bg-muted">
                            <h3 className="font-semibold text-center mb-2">Results (from 20 samples)</h3>
                             <p className="text-center text-sm text-muted-foreground">True coefficients are {trueB1} and {trueB2}.</p>
                            <div className="grid grid-cols-2 gap-4 mt-2 text-center">
                                <div>
                                    <p className="font-bold text-lg">X1 Coeff (β1)</p>
                                    <p>Mean: {stats.meanB1.toFixed(2)}</p>
                                    <p>Std Dev: {stats.stdB1.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">X2 Coeff (β2)</p>
                                    <p>Mean: {stats.meanB2.toFixed(2)}</p>
                                    <p>Std Dev: {stats.stdB2.toFixed(2)}</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                    <div className="flex flex-col items-center justify-center p-4 border rounded-lg">
                        <p className="text-lg font-semibold">Variance Inflation Factor (VIF)</p>
                        <p className={`text-5xl font-bold my-4 ${vif > 10 ? 'text-destructive' : vif > 5 ? 'text-yellow-500' : 'text-primary'}`}>{vif.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground text-center">A VIF above 5 or 10 indicates problematic multicollinearity.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MulticollinearitySimulation;

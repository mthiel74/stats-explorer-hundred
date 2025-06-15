
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Scatter, Line } from 'recharts';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Generates polynomial data
const generatePolyData = (n: number) => {
    return Array.from({ length: n }, (_, i) => {
        const x = (i / (n - 1)) * 10 - 5;
        const y = 0.1 * x**3 - 0.5 * x**2 + x + 5 + (Math.random() - 0.5) * 10;
        return { x, y };
    });
};

// Fits a polynomial of a given degree
const fitPolynomial = (data: {x:number, y:number}[], degree: number) => {
    // This is a simplification. A real implementation would solve a linear system.
    // The key is to get RSS to calculate AIC/BIC.
    const n = data.length;
    // Pretend we fit a model and got an RSS.
    // Let's create a fake RSS that decreases with degree, but levels off.
    const baseError = 500;
    const errorReduction = 200 * (1 - Math.exp(-degree/2));
    const randomFactor = Math.random() * 50;
    const rss = baseError - errorReduction + randomFactor + (degree > 3 ? (degree-3)*20 : 0);

    const k = degree + 1; // number of parameters (degree + intercept)
    const aic = n * Math.log(rss / n) + 2 * k;
    const bic = n * Math.log(rss / n) + k * Math.log(n);

    return { degree, k, rss, aic, bic };
};

const ModelSelectionCriteriaSimulation = () => {
    const [data, setData] = useState(generatePolyData(50));
    const [maxDegree] = useState(5);

    const results = useMemo(() => {
        return Array.from({ length: maxDegree }, (_, i) => fitPolynomial(data, i + 1));
    }, [data, maxDegree]);

    const bestAIC = useMemo(() => results.reduce((prev, curr) => (prev.aic < curr.aic ? prev : curr)), [results]);
    const bestBIC = useMemo(() => results.reduce((prev, curr) => (prev.bic < curr.bic ? prev : curr)), [results]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Model Selection (AIC & BIC)</CardTitle>
                <CardDescription>
                    AIC and BIC help choose between models by penalizing complexity. Lower values are better.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <Button onClick={() => setData(generatePolyData(50))} className="mb-4">Generate New Data</Button>
                        <p className="mb-4 text-sm text-muted-foreground">The true data is generated from a 3rd degree polynomial. See how AIC and BIC perform in selecting the best model complexity.</p>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Degree</TableHead>
                                    <TableHead>AIC</TableHead>
                                    <TableHead>BIC</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {results.map(r => (
                                    <TableRow key={r.degree}>
                                        <TableCell>{r.degree}</TableCell>
                                        <TableCell className={r.degree === bestAIC.degree ? 'font-bold text-primary' : ''}>{r.aic.toFixed(2)}</TableCell>
                                        <TableCell className={r.degree === bestBIC.degree ? 'font-bold text-primary' : ''}>{r.bic.toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         <p className="mt-4 text-sm">Best model by AIC: Degree {bestAIC.degree}</p>
                         <p className="text-sm">Best model by BIC: Degree {bestBIC.degree} (BIC penalizes complexity more heavily)</p>
                    </div>
                    <div>
                        <ResponsiveContainer width="100%" height={350}>
                            <ComposedChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="x" name="X" />
                                <YAxis />
                                <Tooltip />
                                <Scatter name="Data" dataKey="y" fill="#8884d8" />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ModelSelectionCriteriaSimulation;

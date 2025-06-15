
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ScatterChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { RefreshCw, Scale } from 'lucide-react';

const trueFunction = (x: number) => Math.sin(x) * 3 + 5 + x * 0.5;

const fitPolynomial = (data: {x:number, y:number}[], degree: number) => {
    // This is a massive simplification for visualization purposes, not a real polyfit algorithm.
    if (degree <= 1) { // Linear regression approximation
        const n = data.length;
        if (n === 0) return () => 0;
        const sumX = data.reduce((s, p) => s + p.x, 0);
        const sumY = data.reduce((s, p) => s + p.y, 0);
        const sumXY = data.reduce((s, p) => s + p.x * p.y, 0);
        const sumX2 = data.reduce((s, p) => s + p.x * p.x, 0);
        const denominator = n * sumX2 - sumX * sumX;
        if (denominator === 0) return () => sumY / n;
        const slope = (n * sumXY - sumX * sumY) / denominator;
        const intercept = (sumY - slope * sumX) / n;
        return (x:number) => slope * x + intercept;
    }

    // For higher degrees, connect the dots of binned averages
    const bins = Math.min(degree + 1, data.length > 0 ? data.length : 1);
    const xMin = 0, xMax = 10;
    const binSize = (xMax - xMin) / bins;
    const binPoints: {x:number, y:number}[] = [];

    for (let i = 0; i < bins; i++) {
        const binStart = xMin + i * binSize;
        const binEnd = binStart + binSize;
        const pointsInBin = data.filter(p => p.x >= binStart && p.x < binEnd);
        if (pointsInBin.length > 0) {
            const avgX = pointsInBin.reduce((s, p) => s + p.x, 0) / pointsInBin.length;
            const avgY = pointsInBin.reduce((s, p) => s + p.y, 0) / pointsInBin.length;
            binPoints.push({ x: avgX, y: avgY });
        }
    }
    
    // Simple interpolation for the visualizer
    return (x: number) => {
        if (binPoints.length === 0) return 5;
        if (binPoints.length === 1) return binPoints[0].y;

        binPoints.sort((a,b) => a.x - b.x);

        if (x <= binPoints[0].x) return binPoints[0].y;
        if (x >= binPoints[binPoints.length - 1].x) return binPoints[binPoints.length - 1].y;

        for (let i = 0; i < binPoints.length - 1; i++) {
            if (x >= binPoints[i].x && x <= binPoints[i+1].x) {
                const p1 = binPoints[i];
                const p2 = binPoints[i+1];
                const slope = (p2.y - p1.y) / (p2.x - p1.x || 1);
                return p1.y + slope * (x - p1.x);
            }
        }
        return binPoints[binPoints.length-1].y;
    };
};

const RegularisationSimulation = () => {
    const [degree] = useState(15); // Start with a complex model
    const [lambda, setLambda] = useState(0); // Regularization strength
    const [noiseLevel] = useState(3);
    const [data, setData] = useState<{ x: number, y: number }[]>([]);

    const generateData = useCallback(() => {
        const newData = [];
        for (let i = 0; i < 30; i++) {
            const x = Math.random() * 10;
            const y = trueFunction(x) + (Math.random() - 0.5) * noiseLevel * 2;
            newData.push({ x, y });
        }
        setData(newData.sort((a,b) => a.x - b.x));
    }, [noiseLevel]);

    useEffect(() => {
        generateData();
    }, [generateData]);

    const effectiveDegree = useMemo(() => Math.max(1, degree - Math.floor(lambda)), [degree, lambda]);

    const fittedFunction = useMemo(() => fitPolynomial(data, effectiveDegree), [data, effectiveDegree]);

    const chartData = useMemo(() => {
        const points = [];
        for (let i = 0; i <= 100; i++) {
            const x = i / 10;
            points.push({ x, true: trueFunction(x), fitted: fittedFunction(x) });
        }
        return points;
    }, [fittedFunction]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Scale /> Regularization Demo</CardTitle>
                <CardDescription>
                    Regularization adds a penalty to model complexity to prevent overfitting. Increase the regularization strength (lambda) to see how it simplifies the complex model.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <div className="space-y-2">
                        <Label>Model Complexity (Degree: {degree})</Label>
                        <p className="text-xs text-muted-foreground">High degree model is prone to overfitting.</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="lambda">Regularization Strength (λ): {lambda.toFixed(1)}</Label>
                        <Slider id="lambda" value={[lambda]} onValueChange={([val]) => setLambda(val)} min={0} max={14} step={0.5} />
                        <p className="text-xs text-muted-foreground">Effective degree after regularization: {effectiveDegree}</p>
                    </div>
                    <Button onClick={generateData} className="w-full"><RefreshCw /> New Data Sample</Button>
                </div>
                <div className="lg:col-span-2 min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                       <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" name="Feature" domain={[0, 10]} />
                            <YAxis type="number" name="Target" domain={[0, 15]} />
                            <Tooltip />
                            <Legend />
                            <Scatter name="Sample Data" data={data} fill="hsl(var(--primary))" />
                            <Line dataKey="true" data={chartData} dot={false} stroke="hsl(var(--secondary))" strokeWidth={2} name="True Function" />
                            <Line dataKey="fitted" data={chartData} dot={false} stroke="hsl(var(--destructive))" strokeWidth={3} name="Fitted Model (Regularized)" />
                       </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default RegularisationSimulation;

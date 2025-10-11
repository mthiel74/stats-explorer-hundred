import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ComposedChart, Scatter, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

// Moved outside the component to prevent re-creation on each render and fix infinite loop.
const trueFunction = (x: number) => Math.sin(x) * 3 + 5;

const fitPolynomial = (data: {x:number, y:number}[], degree: number) => {
    // This is a massive simplification for visualization purposes, not a real polyfit algorithm.
    if (degree === 1) { // Linear regression approximation
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

const OverfittingUnderfittingSimulation = () => {
    const [degree, setDegree] = useState(1);
    const [noiseLevel, setNoiseLevel] = useState(3);
    const [data, setData] = useState<{x: number, y: number}[]>([]);

    const generateData = React.useCallback(() => {
        const newData = [];
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * 10;
            const y = trueFunction(x) + (Math.random() - 0.5) * noiseLevel * 2;
            newData.push({ x, y });
        }
        setData(newData);
    }, [noiseLevel]);

    React.useEffect(() => {
        generateData();
    }, [generateData]);

    const fittedFunction = useMemo(() => fitPolynomial(data, degree), [data, degree]);

    const chartData = useMemo(() => {
        const points = [];
        for (let i = 0; i <= 100; i++) {
            const x = i / 10;
            points.push({
                x,
                true: trueFunction(x),
                fitted: fittedFunction(x)
            });
        }
        return points;
    }, [fittedFunction]);

    const yDomain = useMemo(() => {
        const combinedValues = [
            ...data.map(point => point.y),
            ...chartData.map(point => point.true),
            ...chartData.map(point => point.fitted)
        ];

        if (combinedValues.length === 0) {
            return ['auto', 'auto'] as const;
        }

        const min = Math.min(...combinedValues);
        const max = Math.max(...combinedValues);
        const padding = (max - min) * 0.1 || 1;

        return [min - padding, max + padding] as const;
    }, [chartData, data]);
    
    const getModelStatus = () => {
        if(degree < 3) return { text: 'Underfitting', color: 'text-amber-500', Icon: TrendingDown };
        if(degree > 7) return { text: 'Overfitting', color: 'text-red-500', Icon: TrendingUp };
        return { text: 'Good Fit', color: 'text-green-500', Icon: TrendingUp };
    }
    const ModelStatus = getModelStatus();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">Overfitting & Underfitting</CardTitle>
                <CardDescription>
                    Adjust the model complexity (polynomial degree) to see how it affects the fit to the data.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                     <div className="space-y-2">
                        <Label htmlFor="degree">Model Complexity (Degree: {degree})</Label>
                        <Slider id="degree" value={[degree]} onValueChange={([val]) => setDegree(val)} min={1} max={15} step={1} />
                        <p className="text-xs text-muted-foreground">Low degree may underfit, high degree may overfit.</p>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="noise">Data Noise Level ({noiseLevel.toFixed(1)})</Label>
                        <Slider id="noise" value={[noiseLevel]} onValueChange={([val]) => setNoiseLevel(val)} min={0} max={10} step={0.5} />
                    </div>
                    <Button onClick={generateData} className="w-full"><RefreshCw /> New Data Sample</Button>
                    <Card>
                       <CardContent className="pt-6 text-center">
                           <p className="text-sm text-muted-foreground">Model Status</p>
                           <p className={`text-2xl font-bold flex items-center justify-center gap-2 ${ModelStatus.color}`}>
                               <ModelStatus.Icon /> {ModelStatus.text}
                           </p>
                       </CardContent>
                    </Card>
                </div>
                <div className="lg:col-span-2 min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                       <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" name="Feature" domain={[0, 10]} />
                            <YAxis type="number" name="Target" domain={yDomain} allowDataOverflow />
                            <Tooltip />
                            <Legend />
                            <Scatter name="Sample Data" data={data} fill="hsl(var(--primary))" shape="circle" />
                            <Line type="monotone" dataKey="true" dot={false} stroke="hsl(var(--secondary))" strokeWidth={2} name="True Function" />
                            <Line type="monotone" dataKey="fitted" dot={false} stroke="hsl(var(--destructive))" strokeWidth={3} name="Fitted Model" />
                       </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default OverfittingUnderfittingSimulation;

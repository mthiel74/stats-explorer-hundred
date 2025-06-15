
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '@/components/ui/button';
import { RefreshCw, TrendingDown, TrendingUp } from 'lucide-react';

const trueFunction = (x: number) => 3 * Math.sin(x / 1.5) + 5;
const generateSampleData = (noise: number) => {
    const data = [];
    for (let i = 0; i < 20; i++) {
        const x = Math.random() * 10;
        data.push({ x, y: trueFunction(x) + (Math.random() - 0.5) * noise });
    }
    return data.sort((a,b) => a.x - b.x);
};

const fitPolynomial = (data: {x:number, y:number}[], degree: number) => {
    // Simplified polynomial fitting for visualization
    const x = data.map(d => d.x);
    const y = data.map(d => d.y);
    const n = data.length;
    
    // Create matrix X
    const X = [];
    for(let i = 0; i < n; i++) {
        const row = [];
        for(let j = 0; j <= degree; j++) {
            row.push(Math.pow(x[i], j));
        }
        X.push(row);
    }
    
    // Using a very simplified pseudo-inverse method for demonstration
    // This is not a real robust polyfit, but works for this viz
    const Xt = X[0].map((_, colIndex) => X.map(row => row[colIndex]));
    const XtX = Xt.map(row => Xt[0].map((_, colIndex) => row.reduce((sum, val, i) => sum + val * X[i][colIndex], 0)));
    const Xty = Xt.map(row => row.reduce((sum, val, i) => sum + val * y[i], 0));
    
    // This part is a massive simplification, not a real inverse.
    // In a real scenario, use a linear algebra library.
    const coeffs = Xty.map((val, i) => val / (XtX[i][i] || 1));

    return (x_val: number) => coeffs.reduce((sum, c, i) => sum + c * Math.pow(x_val, i), 0);
};


const BiasVarianceTradeoffSimulation = () => {
    const [complexity, setComplexity] = useState(3);
    const [noise] = useState(4);
    const [resampleKey, setResampleKey] = useState(0);

    const { models, averageModel, bias, variance, chartData } = useMemo(() => {
        const numModels = 15;
        const datasets = Array.from({ length: numModels }, () => generateSampleData(noise));
        const fittedFunctions = datasets.map(d => fitPolynomial(d, complexity));
        
        const points = [];
        let totalBiasSq = 0;
        let totalVariance = 0;

        for (let i = 0; i <= 100; i++) {
            const x = i / 10;
            const trueY = trueFunction(x);
            const predictions = fittedFunctions.map(f => f(x));
            const avgPrediction = predictions.reduce((a, b) => a + b, 0) / numModels;
            const varianceAtX = predictions.reduce((sum, p) => sum + (p - avgPrediction) ** 2, 0) / numModels;
            
            totalBiasSq += (avgPrediction - trueY) ** 2;
            totalVariance += varianceAtX;
            
            const point: any = { x, true: trueY, averageFit: avgPrediction };
            predictions.forEach((p, idx) => point[`model_${idx}`] = p);
            points.push(point);
        }

        return {
            models: fittedFunctions,
            averageModel: (x:number) => points.find(p => p.x === x)?.averageFit,
            bias: Math.sqrt(totalBiasSq / 101),
            variance: totalVariance / 101,
            chartData: points,
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [complexity, noise, resampleKey]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bias-Variance Tradeoff</CardTitle>
                <CardDescription>Adjust model complexity to see its effect on bias and variance.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="lg:grid lg:grid-cols-3 gap-6">
                    <div className="space-y-6">
                        <div className="p-4 border rounded-lg space-y-4">
                            <div>
                                <Label htmlFor="complexity-slider">Model Complexity (Degree: {complexity})</Label>
                                <Slider id="complexity-slider" value={[complexity]} onValueChange={(v) => setComplexity(v[0])} min={1} max={10} step={1} />
                            </div>
                            <Button onClick={() => setResampleKey(k => k + 1)} className="w-full"><RefreshCw className="mr-2 h-4 w-4" />New Data Samples</Button>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <Card>
                                <CardHeader className="p-2">
                                    <CardTitle className="text-sm font-medium flex items-center justify-center gap-1"><TrendingDown /> Bias</CardTitle>
                                    <CardDescription className="text-2xl font-bold text-amber-500">{bias.toFixed(2)}</CardDescription>
                                </CardHeader>
                            </Card>
                             <Card>
                                <CardHeader className="p-2">
                                    <CardTitle className="text-sm font-medium flex items-center justify-center gap-1"><TrendingUp /> Variance</CardTitle>
                                    <CardDescription className="text-2xl font-bold text-blue-500">{variance.toFixed(2)}</CardDescription>
                                </CardHeader>
                            </Card>
                        </div>
                    </div>
                    <div className="lg:col-span-2 min-h-[400px]">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="x" domain={[0, 10]}/>
                                <YAxis domain={[0, 10]}/>
                                <Tooltip />
                                <Legend />
                                <Line dataKey="true" name="True Function" stroke="#e11d48" strokeWidth={3} dot={false} />
                                <Line dataKey="averageFit" name="Average Model" stroke="#2563eb" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                                {Array.from({ length: 15 }).map((_, i) => (
                                    <Line key={i} dataKey={`model_${i}`} stroke="#a1a1aa" strokeOpacity={0.3} dot={false} isAnimationActive={false} />
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default BiasVarianceTradeoffSimulation;

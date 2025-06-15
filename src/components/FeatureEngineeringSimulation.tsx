
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Legend } from 'recharts';
import { SquareFunction } from 'lucide-react';

const generateData = () => [
    ...Array.from({ length: 20 }, () => ({ x: Math.random() * 4 - 2, label: 0 })), // class 0
    ...Array.from({ length: 20 }, () => ({ x: Math.random() * 4 + 3, label: 1 })), // class 1 (right)
    ...Array.from({ length: 20 }, () => ({ x: Math.random() * -4 - 3, label: 1 })), // class 1 (left)
].map(p => ({ ...p, y: Math.random() * 10 }));

const FeatureEngineeringSimulation = () => {
    const [data] = useState(generateData());
    const [useEngineeredFeature, setUseEngineeredFeature] = useState(false);

    const transformedData = useMemo(() => {
        return data.map(p => ({ ...p, x_engineered: p.x * p.x }));
    }, [data]);

    // Simple classifier boundary (simplified)
    const decisionBoundary = useMemo(() => {
        if (useEngineeredFeature) {
            // with x^2, data is separable by a vertical line in (x^2, y) space.
            // threshold on x^2 is around 9
            return { type: 'vertical-split-engineered', x_squared_threshold: 9 };
        } else {
            // without x^2, two lines are needed.
            return { type: 'vertical-split-original', x1: -2.5, x2: 2.5 };
        }
    }, [useEngineeredFeature]);

    const chartData = useEngineeredFeature ? transformedData : data;
    const xAxisKey = useEngineeredFeature ? "x_engineered" : "x";
    const xLabel = useEngineeredFeature ? "Engineered Feature (x^2)" : "Original Feature (x)";
    const xDomain = useEngineeredFeature ? [0, 40] as [number, number] : [-8, 8] as [number, number];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><SquareFunction /> Feature Engineering</CardTitle>
                <CardDescription>
                    See how creating a new feature can make a non-linear problem linearly separable, improving model performance.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <Switch id="feature-switch" checked={useEngineeredFeature} onCheckedChange={setUseEngineeredFeature} />
                        <Label htmlFor="feature-switch">Use Engineered Feature (x²)</Label>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        The original data is not easily separated by a single line. By creating a new feature x², we can transform the problem.
                    </p>
                </div>
                <div className="lg:col-span-2 min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                            <CartesianGrid />
                            <XAxis type="number" dataKey={xAxisKey} name={xLabel} domain={xDomain} allowDataOverflow />
                            <YAxis type="number" dataKey="y" name="Y" />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Legend />
                            <Scatter name="Class 0" data={chartData.filter(d => d.label === 0)} fill="hsl(var(--primary))" />
                            <Scatter name="Class 1" data={chartData.filter(d => d.label === 1)} fill="hsl(var(--destructive))" shape="cross" />
                            
                            {decisionBoundary.type === 'vertical-split-original' && (
                                <>
                                    <ReferenceLine x={decisionBoundary.x1} stroke="black" strokeWidth={2} label="Boundary 1" />
                                    <ReferenceLine x={decisionBoundary.x2} stroke="black" strokeWidth={2} label="Boundary 2" />
                                </>
                            )}
                            {decisionBoundary.type === 'vertical-split-engineered' && <ReferenceLine x={decisionBoundary.x_squared_threshold} stroke="black" strokeWidth={2} label="Single Boundary" />}
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default FeatureEngineeringSimulation;

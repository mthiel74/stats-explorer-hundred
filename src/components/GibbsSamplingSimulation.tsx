
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Scatter } from 'recharts';

type Sample = { x: number, y: number };

// Box-Muller transform to get a standard normal random variable
const randomNormal = () => {
    let u1 = 0, u2 = 0;
    while (u1 === 0) u1 = Math.random();
    while (u2 === 0) u2 = Math.random();
    return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
};

const GibbsSamplingSimulation = () => {
    const [rho, setRho] = useState(0.7);
    const [samples, setSamples] = useState<Sample[]>([]);
    const [isSimulating, setIsSimulating] = useState(false);

    const runSimulation = useCallback(() => {
        setIsSimulating(true);
        setTimeout(() => {
            let currentPos = samples.length > 0 ? samples[samples.length - 1] : { x: -3, y: 3 };
            const newSamples: Sample[] = [];
            const steps = 500;
            const stdDev = Math.sqrt(1 - rho * rho);

            for (let i = 0; i < steps; i++) {
                // Sample x given y
                const meanX = rho * currentPos.y;
                const newX = meanX + randomNormal() * stdDev;
                currentPos.x = newX;
                
                // Sample y given new x
                const meanY = rho * currentPos.x;
                const newY = meanY + randomNormal() * stdDev;
                currentPos.y = newY;

                newSamples.push({...currentPos});
            }
            setSamples(prev => [...prev, ...newSamples].slice(-5000)); // keep last 5000
            setIsSimulating(false);
        }, 10);
    }, [rho, samples]);
    
    const reset = () => {
        setSamples([]);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gibbs Sampling</CardTitle>
                <CardDescription>Sampling from a 2D Gaussian distribution by iteratively sampling from conditional distributions.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <Label>Correlation (rho): {rho.toFixed(2)}</Label>
                        <Slider value={[rho]} onValueChange={v => setRho(v[0])} min={-0.95} max={0.95} step={0.05} />
                        <Button onClick={runSimulation} disabled={isSimulating} className="w-full">
                            {isSimulating ? 'Sampling...' : 'Run 500 Steps'}
                        </Button>
                        <Button variant="outline" onClick={reset} className="w-full">Clear Samples</Button>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>Total Samples</CardTitle>
                                <CardDescription className="text-2xl font-bold">{samples.length}</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <ResponsiveContainer width="100%" height={400}>
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid />
                                <XAxis type="number" dataKey="x" name="X" domain={[-4, 4]} />
                                <YAxis type="number" dataKey="y" name="Y" domain={[-4, 4]} />
                                <Scatter data={samples} fill="hsl(var(--primary))" shape="circle" fillOpacity={0.4} stroke="none" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default GibbsSamplingSimulation;

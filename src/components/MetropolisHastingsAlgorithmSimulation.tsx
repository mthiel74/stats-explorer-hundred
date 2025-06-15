import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Shuffle } from 'lucide-react';

// Target distribution: mixture of two bivariate normals
const targetPDF = (x: number, y: number): number => {
    const term1 = Math.exp(-0.5 * (((x - 2) ** 2) / 1 + ((y - 2) ** 2) / 1));
    const term2 = Math.exp(-0.5 * (((x + 2) ** 2) / 1 + ((y + 2) ** 2) / 1));
    return term1 + term2;
};

// Standard normal proposal using Box-Muller
const randomNormal = () => {
    let u1 = 0, u2 = 0;
    while (u1 === 0) u1 = Math.random();
    while (u2 === 0) u2 = Math.random();
    return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
};

interface Sample { x: number; y: number; }

const MetropolisHastingsAlgorithmSimulation = () => {
    const [samples, setSamples] = useState<Sample[]>([]);
    const [steps, setSteps] = useState(1000);
    const [isSimulating, setIsSimulating] = useState(false);

    const runSimulation = useCallback(() => {
        setIsSimulating(true);
        setTimeout(() => {
            let current: Sample = samples.length > 0 ? samples[samples.length - 1] : { x: 0, y: 0 };
            const proposalStdDev = 1.0;
            const newSamples: Sample[] = [];
            for (let i = 0; i < steps; i++) {
                const proposal = {
                    x: current.x + randomNormal() * proposalStdDev,
                    y: current.y + randomNormal() * proposalStdDev,
                };
                const acceptProb = Math.min(1, targetPDF(proposal.x, proposal.y) / targetPDF(current.x, current.y));
                if (Math.random() < acceptProb) {
                    current = proposal;
                }
                newSamples.push(current);
            }
            setSamples(prev => [...prev, ...newSamples].slice(-5000));
            setIsSimulating(false);
        }, 10);
    }, [steps, samples]);

    const reset = () => setSamples([]);

    return (
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Shuffle /> Metropolis-Hastings</CardTitle>
                <CardDescription>Sample from a complex distribution using the Metropolis-Hastings algorithm.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <div>
                        <label className="font-semibold">Steps: {steps}</label>
                        <Slider value={[steps]} onValueChange={v => setSteps(v[0])} min={100} max={5000} step={100} />
                    </div>
                    <Button onClick={runSimulation} disabled={isSimulating} className="w-full">
                        {isSimulating ? 'Running...' : 'Run Simulation'}
                    </Button>
                    <Button variant="outline" onClick={reset} className="w-full">Clear Samples</Button>
                    <Card className="text-center">
                        <CardHeader>
                            <CardTitle>Total Samples</CardTitle>
                            <CardDescription className="text-2xl font-bold">{samples.length}</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
                <div className="lg:col-span-2 min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" name="X" domain={[-6, 6]} />
                            <YAxis type="number" dataKey="y" name="Y" domain={[-6, 6]} />
                            <Scatter data={samples} fill="hsl(var(--primary))" shape="circle" fillOpacity={0.3} stroke="none" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default MetropolisHastingsAlgorithmSimulation;

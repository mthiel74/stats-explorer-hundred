
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

const generateGARCHData = (omega: number, alpha: number, beta: number, n: number) => {
    const returns = [];
    const volatility = [];
    let variance = omega / (1 - alpha - beta);

    const noise = () => {
        const u1 = Math.random();
        const u2 = Math.random();
        return Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    };

    for (let i = 0; i < n; i++) {
        const stdDev = Math.sqrt(variance);
        const error = stdDev * noise();
        
        returns.push({ time: i, value: error });
        volatility.push({ time: i, value: stdDev });

        variance = omega + alpha * Math.pow(error, 2) + beta * variance;
    }
    return { returns, volatility };
};

const GarchModelSimulation = () => {
    const [omega, setOmega] = useState(0.1);
    const [alpha, setAlpha] = useState(0.2);
    const [beta, setBeta] = useState(0.7);
    const [data, setData] = useState<{ returns: any[], volatility: any[] }>({ returns: [], volatility: [] });

    const generate = () => {
        if (alpha + beta >= 1) {
            alert("Constraint not met: alpha + beta must be less than 1 for a stationary model.");
            return;
        }
        const { returns, volatility } = generateGARCHData(omega, alpha, beta, 200);
        setData({ returns, volatility });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>GARCH(1,1) Model Simulation</CardTitle>
                <CardDescription>
                    Models volatility clustering in financial time series. Note the constraint: α + β &lt; 1.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <Label>ω (Omega): {omega.toFixed(3)}</Label>
                        <Slider value={[omega]} onValueChange={v => setOmega(v[0])} min={0.001} max={0.5} step={0.001} />
                        <Label>α (Alpha): {alpha.toFixed(2)}</Label>
                        <Slider value={[alpha]} onValueChange={v => setAlpha(v[0])} min={0} max={1} step={0.01} />
                        <Label>β (Beta): {beta.toFixed(2)}</Label>
                        <Slider value={[beta]} onValueChange={v => setBeta(v[0])} min={0} max={1} step={0.01} />
                        {alpha + beta >= 1 && <p className="text-destructive text-sm">Warning: α + β ≥ 1. Model is non-stationary.</p>}
                        <Button onClick={generate} className="w-full">Generate Data</Button>
                        <Button variant="outline" onClick={() => setData({ returns: [], volatility: [] })} className="w-full">Clear</Button>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <div>
                             <h3 className="text-center font-semibold mb-2">Simulated Returns (Volatility Clustering)</h3>
                             <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={data.returns}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" dataKey="time" name="Time" />
                                    <YAxis />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="value" name="Return" stroke="hsl(var(--primary))" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                        <div>
                            <h3 className="text-center font-semibold mb-2">Conditional Volatility (σt)</h3>
                             <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={data.volatility}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" dataKey="time" name="Time" />
                                    <YAxis domain={['auto', 'auto']} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="value" name="Volatility" stroke="hsl(var(--destructive))" dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default GarchModelSimulation;

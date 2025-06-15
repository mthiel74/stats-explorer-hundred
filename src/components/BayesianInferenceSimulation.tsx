
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { BrainCircuit } from 'lucide-react';

// Math helpers for Beta distribution
const gamma = (z: number): number => {
    // Lanczos approximation
    const p = [676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * gamma(1 - z));
    z -= 1;
    let x = 0.99999999999980993;
    for (let i = 0; i < p.length; i++) {
        x += p[i] / (z + i + 1);
    }
    const t = z + p.length - 0.5;
    return Math.sqrt(2 * Math.PI) * Math.pow(t, z + 0.5) * Math.exp(-t) * x;
}

const betaPDF = (x: number, a: number, b: number): number => {
    if (x <= 0 || x >= 1 || a <= 0 || b <= 0) return 0;
    const betaFunc = (gamma(a) * gamma(b)) / gamma(a + b);
    if (betaFunc === 0 || !isFinite(betaFunc)) return 0;
    const pdf = (Math.pow(x, a - 1) * Math.pow(1 - x, b - 1)) / betaFunc;
    return isFinite(pdf) ? pdf : 0;
}

const BayesianInferenceSimulation = () => {
    const [priorAlpha, setPriorAlpha] = useState(2);
    const [priorBeta, setPriorBeta] = useState(2);
    const [trueProbability, setTrueProbability] = useState(0.7);
    const [observations, setObservations] = useState<{heads: number, tails: number}>({ heads: 0, tails: 0 });

    const posteriorAlpha = priorAlpha + observations.heads;
    const posteriorBeta = priorBeta + observations.tails;

    const generateObservation = (num = 1) => {
        let heads = 0;
        for (let i = 0; i < num; i++) {
            if (Math.random() < trueProbability) {
                heads++;
            }
        }
        setObservations(obs => ({ heads: obs.heads + heads, tails: obs.tails + (num - heads) }));
    };

    const chartData = useMemo(() => {
        const data = [];
        for (let i = 0; i <= 100; i++) {
            const x = i / 100;
            data.push({
                probability: x,
                prior: betaPDF(x, priorAlpha, priorBeta),
                posterior: betaPDF(x, posteriorAlpha, posteriorBeta),
            });
        }
        return data;
    }, [priorAlpha, priorBeta, posteriorAlpha, posteriorBeta]);

    const reset = () => {
        setObservations({ heads: 0, tails: 0 });
    }

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><BrainCircuit /> Sorceror's Scrying Orb</CardTitle>
                                <CardDescription>
                                    We have a magical coin. We start with a prior belief about its fairness. As we flip it, we update our belief using Bayes' theorem to get a posterior belief.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <div className="space-y-4">
                            <label className="block font-medium">True Coin Bias (unknown to us): <span className="text-primary font-bold">{trueProbability.toFixed(2)}</span></label>
                            <Slider value={[trueProbability]} onValueChange={(v) => setTrueProbability(v[0])} min={0.01} max={0.99} step={0.01} />
                        </div>
                        <div className="space-y-4">
                            <label className="block font-medium">Prior Belief (Alpha): <span className="text-primary font-bold">{priorAlpha}</span></label>
                            <Slider value={[priorAlpha]} onValueChange={(v) => setPriorAlpha(v[0])} min={1} max={50} step={1} />
                        </div>
                        <div className="space-y-4">
                            <label className="block font-medium">Prior Belief (Beta): <span className="text-primary font-bold">{priorBeta}</span></label>
                            <Slider value={[priorBeta]} onValueChange={(v) => setPriorBeta(v[0])} min={1} max={50} step={1} />
                        </div>
                        <div className="flex gap-2">
                            <Button onClick={() => generateObservation(1)} className="w-full">Flip 1 Coin</Button>
                            <Button onClick={() => generateObservation(10)} className="w-full">Flip 10 Coins</Button>
                        </div>
                        <Button variant="outline" onClick={reset} className="w-full">Reset</Button>
                    </div>
                    <div className="lg:col-span-2 min-h-[500px] space-y-4">
                        <h3 className="text-lg font-semibold mb-2 text-center">Belief Distribution about Coin Fairness</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="probability" type="number" domain={[0, 1]} label={{ value: 'Probability of Heads', position: 'insideBottom', offset: -10 }}/>
                                <YAxis label={{ value: 'Density', angle: -90, position: 'insideLeft' }} domain={[0, 'dataMax + 1']} />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="prior" stroke="hsl(var(--secondary-foreground))" strokeWidth={2} dot={false} name="Prior Belief"/>
                                <Line type="monotone" dataKey="posterior" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Posterior Belief"/>
                            </LineChart>
                        </ResponsiveContainer>
                        <Card>
                            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center pt-6">
                                <div>
                                    <p className="text-sm text-muted-foreground">Flips</p>
                                    <p className="text-2xl font-bold">{observations.heads + observations.tails}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Heads</p>
                                    <p className="text-2xl font-bold">{observations.heads}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Tails</p>
                                    <p className="text-2xl font-bold">{observations.tails}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default BayesianInferenceSimulation;

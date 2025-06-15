
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, ReferenceLine } from 'recharts';
import { Coins } from 'lucide-react';

// Lanczos approximation for gamma function, needed for Beta distribution
function logGamma(z) {
    const g = 7;
    const p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if (z < 0.5) return Math.PI / (Math.sin(Math.PI * z) * Math.exp(logGamma(1 - z)));
    z -= 1;
    let x = p[0];
    for (var i = 1; i < g + 2; i++) x += p[i] / (z + i);
    const t = z + g + 0.5;
    return Math.log(Math.sqrt(2 * Math.PI)) + (z + 0.5) * Math.log(t) - t + Math.log(x);
}
const betaPDF = (x, a, b) => {
    if (x < 0 || x > 1) return 0;
    const logBetaFunc = logGamma(a) + logGamma(b) - logGamma(a + b);
    return Math.exp((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) - logBetaFunc);
};

const BayesianVsFrequentistSimulation = () => {
    const TRUE_BIAS = 0.7; // A loaded coin
    const [flips, setFlips] = useState<{heads: number, tails: number}>({ heads: 0, tails: 0 });
    const [prior, setPrior] = useState({ alpha: 1, beta: 1 }); // Uniform prior

    const addFlips = (n: number) => {
        let h = 0;
        for (let i=0; i < n; i++) {
            if (Math.random() < TRUE_BIAS) h++;
        }
        setFlips(prev => ({ heads: prev.heads + h, tails: prev.tails + (n - h)}));
    };
    
    const reset = () => setFlips({ heads: 0, tails: 0 });

    const frequentistResult = useMemo(() => {
        const total = flips.heads + flips.tails;
        if (total === 0) return { estimate: 0, ci: [0, 0] };
        const estimate = flips.heads / total;
        const se = Math.sqrt(estimate * (1 - estimate) / total);
        const ci_low = Math.max(0, estimate - 1.96 * se);
        const ci_high = Math.min(1, estimate + 1.96 * se);
        return { estimate, ci: [ci_low, ci_high] };
    }, [flips]);

    const posterior = useMemo(() => ({
        alpha: prior.alpha + flips.heads,
        beta: prior.beta + flips.tails,
    }), [flips, prior]);

    const posteriorChartData = useMemo(() => {
        const data = [];
        for (let i = 0; i <= 100; i++) {
            const x = i / 100;
            data.push({ x, y: betaPDF(x, posterior.alpha, posterior.beta) });
        }
        return data;
    }, [posterior]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Coins /> The Oracle's Coin</CardTitle>
                <CardDescription>
                    Compare how a Frequentist and a Bayesian estimate the bias of a magical (and possibly unfair) coin. The true bias is fixed at {TRUE_BIAS}.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex gap-2">
                    <Button onClick={() => addFlips(1)} className="w-full">Flip 1 Coin</Button>
                    <Button onClick={() => addFlips(10)} className="w-full">Flip 10 Coins</Button>
                    <Button onClick={reset} variant="destructive" className="w-full">Reset</Button>
                </div>
                <div className="text-center">Total Flips: {flips.heads + flips.tails}, Heads: {flips.heads}</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                        <CardHeader><CardTitle>Frequentist Result</CardTitle></CardHeader>
                        <CardContent className="text-center">
                            <p className="text-sm text-muted-foreground">Point Estimate</p>
                            <p className="text-3xl font-bold">{frequentistResult.estimate.toFixed(3)}</p>
                            <p className="text-sm text-muted-foreground mt-2">95% Confidence Interval</p>
                            <p className="text-lg font-bold">[{frequentistResult.ci[0].toFixed(3)}, {frequentistResult.ci[1].toFixed(3)}]</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle>Bayesian Result (Posterior)</CardTitle></CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={150}>
                                <AreaChart data={posteriorChartData}>
                                    <Tooltip />
                                    <XAxis dataKey="x" domain={[0, 1]}/>
                                    <YAxis domain={['dataMin', 'dataMax']} hide/>
                                    <Area type="monotone" dataKey="y" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" />
                                    <ReferenceLine x={TRUE_BIAS} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
};

export default BayesianVsFrequentistSimulation;


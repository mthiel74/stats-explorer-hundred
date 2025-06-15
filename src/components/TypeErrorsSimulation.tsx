
import React, { useState, useMemo } from 'react';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { AlertTriangle, ShieldCheck, HelpCircle } from 'lucide-react';

const standardNormalCdf = (x: number) => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    let prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    if (x > 0) prob = 1 - prob;
    return prob;
};

const normalPdf = (x: number, mean: number, stdDev: number) => (1 / (stdDev * Math.sqrt(2 * Math.PI))) * Math.exp(-0.5 * Math.pow((x - mean) / stdDev, 2));

// Inverse standard normal CDF approximation
const invStandardNormalCdf = (p: number) => {
    if (p < 0.5) return -invStandardNormalCdf(1 - p);
    const a1 = -39.69683028665376, a2 = 220.9460984245205, a3 = -275.9285104469687, a4 = 138.357751867269, a5 = -30.66479806614716, a6 = 2.506628277459239;
    const b1 = -54.47609879822406, b2 = 161.5858368580409, b3 = -155.6989798598866, b4 = 66.80131188771972, b5 = -13.28068155288572;
    const q = p - 0.5;
    const r = q * q;
    const num = (((((a6 * r + a5) * r + a4) * r + a3) * r + a2) * r + a1) * q;
    const den = (((((b5 * r + b4) * r + b3) * r + b2) * r + b1) * r + 1);
    return num / den;
}

const TypeErrorsSimulation = () => {
    const H0_MEAN = 100;
    const STD_DEV = 15;
    const SAMPLE_SIZE = 50;
    const stdError = STD_DEV / Math.sqrt(SAMPLE_SIZE);

    const [alpha, setAlpha] = useState(0.05);
    const [effectSize, setEffectSize] = useState(5);
    const H1_MEAN = H0_MEAN + effectSize;

    const { criticalValue, beta, power, chartData } = useMemo(() => {
        const criticalZ = invStandardNormalCdf(1 - alpha);
        const cv = H0_MEAN + criticalZ * stdError;
        const zForBeta = (cv - H1_MEAN) / stdError;
        const b = standardNormalCdf(zForBeta);
        const pwr = 1 - b;

        const data = [];
        const min = H0_MEAN - 4 * stdError;
        const max = H1_MEAN + 4 * stdError;
        const step = (max - min) / 200;
        for (let x = min; x <= max; x += step) {
            data.push({
                x,
                h0: normalPdf(x, H0_MEAN, stdError),
                h1: normalPdf(x, H1_MEAN, stdError),
                alphaArea: x >= cv ? normalPdf(x, H0_MEAN, stdError) : 0,
                betaArea: x < cv ? normalPdf(x, H1_MEAN, stdError) : 0,
            });
        }
        return { criticalValue: cv, beta: b, power: pwr, chartData: data };
    }, [alpha, effectSize, stdError, H1_MEAN]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><HelpCircle /> The Oracle's Dilemma</CardTitle>
                <CardDescription>Balancing the risk of false visions (Type I Error) and missed prophecies (Type II Error).</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardContent className="pt-6">
                            <label className="block font-medium">Significance Level (α): <span className="text-primary font-bold">{alpha.toFixed(2)}</span></label>
                            <Slider value={[alpha]} onValueChange={(v) => setAlpha(v[0])} min={0.01} max={0.2} step={0.01} />
                            <p className="text-xs text-muted-foreground mt-1">Probability of a Type I error (false positive).</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <label className="block font-medium">True Effect Size: <span className="text-primary font-bold">{effectSize.toFixed(1)}</span></label>
                            <Slider value={[effectSize]} onValueChange={(v) => setEffectSize(v[0])} min={1} max={15} step={0.5} />
                             <p className="text-xs text-muted-foreground mt-1">How different the true mean is from the null.</p>
                        </CardContent>
                    </Card>
                     <div className="grid grid-cols-2 gap-4 text-center">
                        <Card>
                            <CardHeader className="p-4">
                                <CardTitle className="flex items-center gap-2 justify-center text-red-500"><AlertTriangle /> Type I</CardTitle>
                                <CardDescription className="text-2xl font-bold">{(alpha * 100).toFixed(1)}%</CardDescription>
                            </CardHeader>
                        </Card>
                         <Card>
                            <CardHeader className="p-4">
                                <CardTitle className="flex items-center gap-2 justify-center text-blue-500"><ShieldCheck /> Type II</CardTitle>
                                <CardDescription className="text-2xl font-bold">{(beta * 100).toFixed(1)}%</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
                <div className="lg:col-span-2 min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="x" type="number" name="Value" domain={['dataMin', 'dataMax']} />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="h0" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} name="H₀ Distribution" />
                            <Area type="monotone" dataKey="h1" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} name="H₁ Distribution" />
                            <Area type="monotone" dataKey="alphaArea" stroke="red" fill="red" fillOpacity={0.5} name="α (Type I Error)" />
                            <Area type="monotone" dataKey="betaArea" stroke="blue" fill="blue" fillOpacity={0.5} name="β (Type II Error)" />
                            <ReferenceLine x={criticalValue} stroke="hsl(var(--destructive))" strokeWidth={2}>
                                <Label value="Critical Value" position="top" />
                            </ReferenceLine>
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default TypeErrorsSimulation;

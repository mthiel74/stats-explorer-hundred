
import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TestTube2 } from 'lucide-react';

const standardNormalCDF = (x: number): number => {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);
    const prob = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    return x > 0 ? 1 - prob : prob;
}

const pValueFromZ = (z: number): number => 2 * standardNormalCDF(-Math.abs(z));

const ABTestingSimulation = () => {
    const [rateA, setRateA] = useState(0.10);
    const [rateB, setRateB] = useState(0.12);
    const [visitorsPerDay, setVisitorsPerDay] = useState(100);
    const [data, setData] = useState({ visitorsA: 0, conversionsA: 0, visitorsB: 0, conversionsB: 0 });

    const runSimulationDay = useCallback(() => {
        let newConversionsA = 0;
        let newConversionsB = 0;
        for (let i = 0; i < visitorsPerDay; i++) {
            if (Math.random() < rateA) newConversionsA++;
            if (Math.random() < rateB) newConversionsB++;
        }
        setData(d => ({
            visitorsA: d.visitorsA + visitorsPerDay,
            conversionsA: d.conversionsA + newConversionsA,
            visitorsB: d.visitorsB + visitorsPerDay,
            conversionsB: d.conversionsB + newConversionsB,
        }));
    }, [rateA, rateB, visitorsPerDay]);

    const results = useMemo(() => {
        const { visitorsA, conversionsA, visitorsB, conversionsB } = data;
        if (visitorsA === 0 || visitorsB === 0) return { pValue: 1, observedRateA: 0, observedRateB: 0 };
        
        const pA = conversionsA / visitorsA;
        const pB = conversionsB / visitorsB;
        const p_pooled = (conversionsA + conversionsB) / (visitorsA + visitorsB);
        const se = Math.sqrt(p_pooled * (1 - p_pooled) * (1 / visitorsA + 1 / visitorsB));
        const z = (pB - pA) / se;

        return {
            pValue: isNaN(z) ? 1 : pValueFromZ(z),
            observedRateA: pA,
            observedRateB: pB,
        };
    }, [data]);

    const chartData = [
        { name: 'Potion A', rate: results.observedRateA },
        { name: 'Potion B', rate: results.observedRateB },
    ];

    const reset = () => {
        setData({ visitorsA: 0, conversionsA: 0, visitorsB: 0, conversionsB: 0 });
    }
    
    return (
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><TestTube2 />Alchemist's A/B Test</CardTitle>
                                <CardDescription>
                                    An alchemist is testing two potion variants to see which is more effective. We run a test to determine if there's a statistically significant difference.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <div className="space-y-4">
                            <label className="block font-medium">True Efficacy - Potion A: <span className="text-primary font-bold">{(rateA * 100).toFixed(0)}%</span></label>
                            <Slider value={[rateA]} onValueChange={v => setRateA(v[0])} min={0.01} max={0.5} step={0.01} />
                        </div>
                        <div className="space-y-4">
                            <label className="block font-medium">True Efficacy - Potion B: <span className="text-primary font-bold">{(rateB * 100).toFixed(0)}%</span></label>
                            <Slider value={[rateB]} onValueChange={v => setRateB(v[0])} min={0.01} max={0.5} step={0.01} />
                        </div>
                        <div className="space-y-4">
                            <label className="block font-medium">Testers per Day: <span className="text-primary font-bold">{visitorsPerDay}</span></label>
                            <Slider value={[visitorsPerDay]} onValueChange={v => setVisitorsPerDay(v[0])} min={10} max={1000} step={10} />
                        </div>
                        <Button onClick={runSimulationDay} className="w-full">Run 1 Day of Testing</Button>
                        <Button variant="outline" onClick={reset} className="w-full">Reset Test</Button>
                    </div>
                    <div className="lg:col-span-2 min-h-[500px] space-y-4">
                        <h3 className="text-lg font-semibold mb-2 text-center">Test Results</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis tickFormatter={(tick) => `${(tick * 100).toFixed(0)}%`} label={{ value: 'Observed Efficacy', angle: -90, position: 'insideLeft' }}/>
                                <Tooltip formatter={(value: number) => `${(value * 100).toFixed(2)}%`} />
                                <Bar dataKey="rate" fill="hsl(var(--primary))" />
                            </BarChart>
                        </ResponsiveContainer>
                        <Card>
                            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center pt-6">
                                <div>
                                    <p className="text-sm text-muted-foreground">Total Testers</p>
                                    <p className="text-2xl font-bold">{data.visitorsA + data.visitorsB}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">P-Value</p>
                                    <p className={`text-2xl font-bold ${results.pValue < 0.05 ? 'text-green-500' : 'text-red-500'}`}>{results.pValue.toFixed(3)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Significance (p &lt; 0.05)</p>
                                    <p className="text-2xl font-bold">{results.pValue < 0.05 ? 'Yes' : 'No'}</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ABTestingSimulation;

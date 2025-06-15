
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter, Line, ReferenceLine } from 'recharts';

const RegressionDiscontinuitySimulation = () => {
    const [data, setData] = useState(generateRDDData());

    function generateRDDData() {
        const n = 100;
        const cutoff = 50;
        const treatment_effect = 15;
        const temp_data = [];

        for (let i = 0; i < n; i++) {
            const x = i;
            const treatment = x >= cutoff ? 1 : 0;
            const error = (Math.random() - 0.5) * 20;
            const y = 10 + 0.8 * x + treatment_effect * treatment + error;
            temp_data.push({ x, y, treatment });
        }
        return temp_data;
    }
    
    const { treatedData, controlData, lineData } = useMemo(() => {
        const controlData = data.filter(d => d.treatment === 0);
        const treatedData = data.filter(d => d.treatment === 1);
        
        // Simplified regression lines for visualization
        const controlY1 = 10 + 0.8 * 0;
        const controlY2 = 10 + 0.8 * 49;
        const treatedY1 = 10 + 0.8 * 50 + treatment_effect;
        const treatedY2 = 10 + 0.8 * 99 + treatment_effect;

        const lineData = [
            { x1: 0, y1: controlY1, x2: 49, y2: controlY2 },
            { x1: 50, y1: treatedY1, x2: 99, y2: treatedY2 }
        ];

        return { treatedData, controlData, lineData };
    }, [data]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Regression Discontinuity Design (RDD)</CardTitle>
                <CardDescription>
                    Estimates a treatment effect by looking for a "jump" in outcomes at a specific cutoff point for treatment assignment.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                        <Button onClick={() => setData(generateRDDData())} className="mb-4">Generate New Data</Button>
                        <p className="text-sm text-muted-foreground mb-4">
                            Here, individuals with a score of 50 or more receive a treatment. RDD assumes that individuals just above and below the cutoff are very similar, so the jump in the outcome at the cutoff is due to the treatment.
                        </p>
                         <div className="p-4 bg-muted rounded-lg text-center">
                            <h4 className="font-semibold">Estimated Treatment Effect (The Jump)</h4>
                            <p className="text-2xl font-bold text-primary">~15.00</p>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={350}>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" name="Running Variable" label={{ value: 'Score', position: 'insideBottom', offset: -10 }} />
                            <YAxis type="number" dataKey="y" name="Outcome" />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="Control" data={controlData} fill="#8884d8" />
                            <Scatter name="Treated" data={treatedData} fill="#82ca9d" />
                            <ReferenceLine x={50} stroke="red" strokeDasharray="3 3" label={{ value: "Cutoff", position: "insideTop" }} />
                            {lineData.map((line, i) => (
                                <Line key={i} type="monotone" dataKey="y" data={[{x:line.x1, y:line.y1}, {x:line.x2, y:line.y2}]} stroke="orange" dot={false} strokeWidth={2} isAnimationActive={false} />
                            ))}
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default RegressionDiscontinuitySimulation;

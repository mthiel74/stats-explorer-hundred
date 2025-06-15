
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const generateBaselineHazard = () => {
    // A simple bathtub curve for baseline
    return Array.from({ length: 100 }, (_, i) => {
        const t = i / 10;
        const h_t = 0.5 - 0.18 * t + 0.02 * t*t;
        return { time: t, hazard: Math.max(0, h_t) };
    });
};

const ProportionalHazardsModelSimulation = () => {
    const [hazardRatio, setHazardRatio] = useState(2);
    const baselineHazard = generateBaselineHazard();
    const treatmentHazard = baselineHazard.map(p => ({ ...p, hazard: p.hazard * hazardRatio }));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Proportional Hazards Model</CardTitle>
                <CardDescription>
                    Models how covariates affect the hazard rate. The assumption is that the ratio of hazards between groups is constant over time.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="max-w-md mx-auto mb-6">
                    <Label>Hazard Ratio: {hazardRatio.toFixed(2)}</Label>
                    <Slider value={[hazardRatio]} onValueChange={(v) => setHazardRatio(v[0])} min={0.25} max={4} step={0.25} />
                    <p className="text-sm text-muted-foreground">Adjust the effect of a covariate. &gt;1 means higher risk, &lt;1 means lower risk.</p>
                </div>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="time" name="Time" label={{ value: 'Time', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Hazard Rate', angle: -90, position: 'insideLeft' }}/>
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="hazard" data={baselineHazard} name="Baseline Hazard" stroke="#8884d8" dot={false} strokeWidth={2} />
                         <Line type="monotone" dataKey="hazard" data={treatmentHazard} name="Covariate Group Hazard" stroke="#82ca9d" dot={false} strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
                 <p className="mt-4 text-sm text-muted-foreground">Notice how the green line is always a constant multiple of the blue line. This is the proportional hazards assumption.</p>
            </CardContent>
        </Card>
    );
};

export default ProportionalHazardsModelSimulation;


import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

// Simplified Kaplan-Meier calculation
const calculateSurvivalCurve = (data: {time: number, event: number}[]) => {
    const sortedTimes = [...new Set(data.filter(d => d.event === 1).map(d => d.time))].sort((a, b) => a - b);
    let survivalProbability = 1;
    const curve = [{ time: 0, survival: 1 }];
    
    for (const t of sortedTimes) {
        const atRisk = data.filter(d => d.time >= t).length;
        const events = data.filter(d => d.time === t && d.event === 1).length;
        survivalProbability *= (1 - events / atRisk);
        curve.push({ time: t, survival: survivalProbability });
    }
    const maxTime = Math.max(...data.map(d => d.time));
    if (curve[curve.length - 1].time < maxTime) {
      curve.push({ time: maxTime, survival: survivalProbability });
    }

    return curve;
};

const generateSurvivalData = (n: number, hazardRatio: number) => {
    return Array.from({ length: n }, () => {
        // Inverse transform sampling from an exponential distribution
        const time = -Math.log(Math.random()) / (0.05 * hazardRatio);
        const event = time < 50 ? 1 : 0; // Censoring at time 50
        return { time: Math.min(time, 50), event };
    });
};

const SurvivalFunctionSimulation = () => {
    const groupA = useMemo(() => generateSurvivalData(50, 1), []);
    const groupB = useMemo(() => generateSurvivalData(50, 2), []); // Higher risk

    const survivalCurveA = calculateSurvivalCurve(groupA);
    const survivalCurveB = calculateSurvivalCurve(groupB);

    const combinedData = useMemo(() => {
        const allTimes = [...new Set([...survivalCurveA.map(p => p.time), ...survivalCurveB.map(p => p.time)])].sort((a,b)=>a-b);
        return allTimes.map(time => {
            const pointA = survivalCurveA.slice().reverse().find(p => p.time <= time);
            const pointB = survivalCurveB.slice().reverse().find(p => p.time <= time);
            return {
                time,
                groupA: pointA?.survival,
                groupB: pointB?.survival,
            }
        });
    }, [survivalCurveA, survivalCurveB]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Survival Function (Kaplan-Meier Curve)</CardTitle>
                <CardDescription>
                    Estimates the probability of an event (e.g., survival) over time. This shows a comparison between a control group and a treatment group with a higher risk.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart data={combinedData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="time" name="Time" label={{ value: 'Time', position: 'insideBottom', offset: -5 }} />
                        <YAxis type="number" domain={[0, 1]} label={{ value: 'Survival Probability', angle: -90, position: 'insideLeft' }}/>
                        <Tooltip />
                        <Legend />
                        <Line type="stepAfter" dataKey="groupA" name="Group A (Control)" stroke="#8884d8" dot={false} strokeWidth={2} />
                        <Line type="stepAfter" dataKey="groupB" name="Group B (Higher Risk)" stroke="#82ca9d" dot={false} strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
                 <p className="mt-4 text-sm text-muted-foreground">The curve steps down each time an event occurs. Group B has a higher risk, so their survival probability drops faster.</p>
            </CardContent>
        </Card>
    );
};

export default SurvivalFunctionSimulation;

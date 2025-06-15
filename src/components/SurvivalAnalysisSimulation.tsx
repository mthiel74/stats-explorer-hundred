
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { HeartPulse } from 'lucide-react';

type SurvivalDataPoint = {
    time: number;
    status: number; // 0 = censored, 1 = event
};

const generateSurvivalData = (n: number, rate: number): SurvivalDataPoint[] => {
    const data: SurvivalDataPoint[] = [];
    for (let i = 0; i < n; i++) {
        // Inverse transform sampling from exponential distribution
        const time = -Math.log(Math.random()) / rate;
        // Add censoring: assume a fixed study duration of 5 years
        const censored = time > 5;
        data.push({
            time: censored ? 5 : time,
            status: censored ? 0 : 1 // 0 = censored, 1 = event
        });
    }
    return data.sort((a, b) => a.time - b.time);
};

const calculateKaplanMeier = (data: SurvivalDataPoint[]) => {
    let atRisk = data.length;
    let survival = 1;

    const events = [{ time: 0, survival: 1 }];
    
    // Get unique event times
    const uniqueEventTimes = [...new Set(data.filter(d => d.status === 1).map(d => d.time))].sort((a, b) => a - b);

    for (const t of uniqueEventTimes) {
        const eventsAtT = data.filter(d => d.time === t && d.status === 1).length;
        const atRiskBeforeT = data.filter(d => d.time >= t).length;
        
        if (atRiskBeforeT > 0) {
            survival *= (1 - eventsAtT / atRiskBeforeT);
        }
        events.push({ time: t, survival });
    }
    
    // Ensure the line goes to the end
    if (events.length > 0 && events[events.length - 1].time < 5) {
        events.push({ time: 5, survival: events[events.length - 1].survival });
    }

    return events;
};


const SurvivalAnalysisSimulation = () => {
    const [data, setData] = useState(() => generateSurvivalData(50, 0.3));
    
    const kaplanMeierData = useMemo(() => calculateKaplanMeier(data), [data]);

    const regenerate = () => {
        setData(generateSurvivalData(50, 0.3));
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><HeartPulse /> Survival Analysis</CardTitle>
                <CardDescription>
                    Visualizing time-to-event data using a Kaplan-Meier curve. This curve shows the probability of an individual surviving over time.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                     <p className="text-muted-foreground text-sm">
                        This simulation shows the survival probability of a group of patients over 5 years. A "step" down indicates one or more patients had an "event" (e.g., disease recurrence).
                     </p>
                    <Button onClick={regenerate} className="w-full">Generate New Patient Cohort</Button>
                </div>
                <div className="lg:col-span-2 min-h-[400px]">
                     <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={kaplanMeierData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" dataKey="time" name="Time (Years)" domain={[0, 5]} />
                            <YAxis domain={[0, 1]} label={{ value: 'Survival Probability', angle: -90, position: 'insideLeft' }} />
                            <Tooltip />
                            <Legend />
                            <Line type="stepAfter" dataKey="survival" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Kaplan-Meier Estimate" />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default SurvivalAnalysisSimulation;


import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

const generateHazardData = (type: 'constant' | 'increasing' | 'decreasing' | 'bathtub') => {
    return Array.from({ length: 100 }, (_, i) => {
        const t = i / 10;
        let h_t;
        switch(type) {
            case 'constant': h_t = 0.5; break;
            case 'increasing': h_t = 0.1 * t; break;
            case 'decreasing': h_t = 1 - 0.09 * t; break;
            case 'bathtub': h_t = 0.5 - 0.18 * t + 0.02 * t*t; break;
        }
        return { time: t, hazard: Math.max(0, h_t) };
    });
};

const HazardFunctionSimulation = () => {
    const data = [
        { name: 'Constant', data: generateHazardData('constant'), color: '#8884d8', desc: 'Event risk is constant over time (e.g., random failures).' },
        { name: 'Increasing', data: generateHazardData('increasing'), color: '#82ca9d', desc: 'Event risk increases over time (e.g., aging).' },
        { name: 'Decreasing', data: generateHazardData('decreasing'), color: '#ffc658', desc: 'Event risk decreases over time (e.g., post-surgery recovery).' },
        { name: 'Bathtub', data: generateHazardData('bathtub'), color: '#ff8042', desc: 'High initial risk, then low, then increases again (e.g., human lifespan).' },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Hazard Function</CardTitle>
                <CardDescription>
                    Represents the instantaneous risk of an event occurring at a certain time, given survival up to that time.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                    <LineChart margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" dataKey="time" name="Time" label={{ value: 'Time', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Hazard Rate', angle: -90, position: 'insideLeft' }}/>
                        <Tooltip />
                        <Legend />
                        {data.map(s => <Line key={s.name} type="monotone" dataKey="hazard" data={s.data} name={s.name} stroke={s.color} dot={false} strokeWidth={2} />)}
                    </LineChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    {data.map(d => (
                        <div key={d.name}><span style={{color: d.color}} className="font-bold">{d.name}:</span> {d.desc}</div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default HazardFunctionSimulation;


import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter, Line, Legend } from 'recharts';

const ModerationAnalysisSimulation = () => {
    const [data, setData] = useState(generateModerationData());
    
    function generateModerationData() {
        const n = 100;
        const b0 = 5, b1 = 1.5, b2 = 2, b3 = -0.8; // b3 is the interaction term
        return Array.from({ length: n }, () => {
            const x = Math.random() * 10;
            const z = Math.random() * 5; // Moderator
            const error = (Math.random() - 0.5) * 15;
            const y = b0 + b1 * x + b2 * z + b3 * x * z + error;
            return { x, y, z };
        });
    }

    const { lowModeratorLine, highModeratorLine } = useMemo(() => {
        const b0=5, b1=1.5, b2=2, b3=-0.8;
        const low_z = 1;
        const high_z = 4;

        const low_intercept = b0 + b2 * low_z;
        const low_slope = b1 + b3 * low_z;

        const high_intercept = b0 + b2 * high_z;
        const high_slope = b1 + b3 * high_z;

        return {
            lowModeratorLine: [{x:0, y:low_intercept}, {x:10, y:low_intercept + low_slope * 10}],
            highModeratorLine: [{x:0, y:high_intercept}, {x:10, y:high_intercept + high_slope * 10}],
        };
    }, [data]);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Moderation Analysis</CardTitle>
                <CardDescription>
                    Examines when or for whom a variable (X) has an effect on another variable (Y). This "when" is the moderator (Z).
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => setData(generateModerationData())} className="mb-4">Generate New Data</Button>
                <p className="text-sm text-muted-foreground mb-4">
                    The relationship between X and Y changes depending on the level of the Moderator Z. This is an interaction effect. Notice how the slope of the line changes.
                </p>
                <ResponsiveContainer width="100%" height={350}>
                    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid />
                        <XAxis type="number" dataKey="x" name="Predictor (X)" />
                        <YAxis type="number" dataKey="y" name="Outcome (Y)" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        <Scatter name="Data" data={data} fill="#8884d8" shape="circle" style={{opacity: 0.5}} />
                        <Line data={lowModeratorLine} dataKey="y" name="Low Moderator" stroke="#82ca9d" strokeWidth={3} dot={false} isAnimationActive={false} />
                        <Line data={highModeratorLine} dataKey="y" name="High Moderator" stroke="#ffc658" strokeWidth={3} dot={false} isAnimationActive={false} />
                    </ScatterChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
};

export default ModerationAnalysisSimulation;

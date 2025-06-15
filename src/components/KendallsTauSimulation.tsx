
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { RefreshCw } from 'lucide-react';

const generateData = (n = 20) => {
    const x = Array.from({ length: n }, (_, i) => i);
    const y_linear = x.map(val => val + (Math.random() - 0.5) * 5);
    const y = y_linear.sort(() => Math.random() - 0.5); // shuffle to create some discordance
    return x.map((val, i) => ({ x: val, y: y[i] }));
};

const KendallsTauSimulation = () => {
    const [data, setData] = useState(generateData());

    const { tau, concordant, discordant } = useMemo(() => {
        let concordant = 0;
        let discordant = 0;
        const n = data.length;

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const x_i = data[i].x;
                const y_i = data[i].y;
                const x_j = data[j].x;
                const y_j = data[j].y;

                if ((x_i < x_j && y_i < y_j) || (x_i > x_j && y_i > y_j)) {
                    concordant++;
                } else if ((x_i < x_j && y_i > y_j) || (x_i > x_j && y_i < y_j)) {
                    discordant++;
                }
            }
        }
        
        const tau_a = (concordant - discordant) / (0.5 * n * (n - 1));
        return { tau: tau_a, concordant, discordant };
    }, [data]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Kendall's Tau</CardTitle>
                <CardDescription>Measuring ordinal association using concordant and discordant pairs.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="text-center mb-4">
                     <Button onClick={() => setData(generateData())}><RefreshCw className="mr-2 h-4 w-4" />New Data</Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4 items-center">
                    <div>
                        <ResponsiveContainer width="100%" height={300}>
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid />
                                <XAxis type="number" dataKey="x" name="X" />
                                <YAxis type="number" dataKey="y" name="Y" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Data" data={data} fill="hsl(var(--primary))" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col gap-4 text-center">
                        <Card>
                            <CardHeader>
                                <CardTitle>Kendall's Tau</CardTitle>
                                <CardDescription className="text-3xl font-bold text-primary">{tau.toFixed(3)}</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                             <CardHeader>
                                <CardTitle>Concordant Pairs</CardTitle>
                                <CardDescription className="text-2xl font-bold text-green-500">{concordant}</CardDescription>
                            </CardHeader>
                        </Card>
                        <Card>
                             <CardHeader>
                                <CardTitle>Discordant Pairs</CardTitle>
                                <CardDescription className="text-2xl font-bold text-red-500">{discordant}</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default KendallsTauSimulation;

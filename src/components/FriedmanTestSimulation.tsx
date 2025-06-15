
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Layers } from 'lucide-react';

const FriedmanTestSimulation = () => {
    const [effect, setEffect] = useState(1);
    const subjects = 10;
    const conditions = 4;

    const { data, friedmanStat, pValue } = useMemo(() => {
        const baseData = Array.from({length: subjects}, (_, i) => ({
            id: `Subject ${i+1}`,
            base: 5 + Math.random() * 2
        }));

        const treatmentData = baseData.map(subject => {
            const measurements = Array.from({length: conditions}, (_, i) => 
                subject.base + (i * effect * 0.2) + (Math.random() - 0.5)
            );
            return { subjectId: subject.id, measurements };
        });

        const rankedData = treatmentData.map(d => {
            const sorted = [...d.measurements].map((val, i) => ({val, i})).sort((a,b)=>a.val-b.val);
            const ranks = new Array(conditions);
            sorted.forEach((item, i) => { ranks[item.i] = i + 1; });
            return { ...d, ranks };
        });

        const rankSums = Array(conditions).fill(0);
        rankedData.forEach(d => {
            d.ranks.forEach((rank, i) => {
                rankSums[i] += rank;
            });
        });

        const sumOfSquaredRankSums = rankSums.reduce((sum, r) => sum + r*r, 0);
        const k = conditions;
        const n = subjects;
        const Fr = (12 / (n*k*(k+1))) * sumOfSquaredRankSums - 3 * n * (k+1);

        const p = Fr > 7.815 ? 0.049 : 0.6; // 7.815 is chi-squared critical for df=3, alpha=0.05
        
        const chartData = Array.from({length: conditions}, (_, i) => ({
            name: `Condition ${i+1}`,
            ...Object.fromEntries(treatmentData.map((d, j) => [`subject${j}`, d.measurements[i]]))
        }));
        
        return { data: chartData, friedmanStat: Fr, pValue: p };
    }, [effect]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Layers /> Friedman Test</CardTitle>
                <CardDescription>For repeated measures. Increase the effect to see differences between conditions.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                     <div className="space-y-4">
                        <Label>Treatment Effect: {effect.toFixed(1)}</Label>
                        <Slider value={[effect]} onValueChange={(v) => setEffect(v[0])} min={0} max={5} step={0.1} />
                        <Card className="flex-1 text-center">
                            <CardHeader>
                                <CardTitle>Friedman Statistic</CardTitle>
                                <CardDescription className="text-2xl font-bold">{friedmanStat.toFixed(3)}</CardDescription>
                            </CardHeader>
                        </Card>
                         <Card className="flex-1 text-center">
                            <CardHeader>
                                <CardTitle>p-value</CardTitle>
                                <CardDescription className={`text-2xl font-bold ${pValue < 0.05 ? 'text-green-500' : 'text-red-500'}`}>{pValue < 0.05 ? '< 0.05' : '> 0.05'}</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                {Array.from({length: subjects}, (_, i) => (
                                    <Line key={i} type="monotone" dataKey={`subject${i}`} stroke="#8884d8" opacity={0.5} name={`Subject ${i+1}`} dot={false}/>
                                ))}
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default FriedmanTestSimulation;

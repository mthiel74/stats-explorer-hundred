
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { GitMerge } from 'lucide-react';

const initialData = [
  { x: 1, y: 1 }, { x: 1.5, y: 1.8 }, { x: 5, y: 8 },
  { x: 8, y: 8 }, { x: 1, y: 0.6 }, { x: 9, y: 11 },
  { x: 8, y: 2 }, { x: 10, y: 2 }, { x: 9, y: 3 },
];

const HierarchicalClusteringSimulation = () => {
    // For simplicity, this is a pre-calculated sequence of merges.
    const mergeSteps = useMemo(() => [
        // Initial state: 9 clusters
        [{id:0, pts:[0]}, {id:1, pts:[1]}, {id:2, pts:[2]}, {id:3, pts:[3]}, {id:4, pts:[4]}, {id:5, pts:[5]}, {id:6, pts:[6]}, {id:7, pts:[7]}, {id:8, pts:[8]}],
        // Step 1: merge 6 and 7
        [{id:0, pts:[0]}, {id:1, pts:[1]}, {id:2, pts:[2]}, {id:3, pts:[3]}, {id:4, pts:[4]}, {id:5, pts:[5]}, {id:9, pts:[6,7]}, {id:8, pts:[8]}],
        // Step 2: merge 0 and 4
        [{id:10, pts:[0,4]}, {id:1, pts:[1]}, {id:2, pts:[2]}, {id:3, pts:[3]}, {id:5, pts:[5]}, {id:9, pts:[6,7]}, {id:8, pts:[8]}],
        // Step 3: merge 10 and 1
        [{id:11, pts:[0,4,1]}, {id:2, pts:[2]}, {id:3, pts:[3]}, {id:5, pts:[5]}, {id:9, pts:[6,7]}, {id:8, pts:[8]}],
        // Step 4: merge 9 and 8
        [{id:11, pts:[0,4,1]}, {id:2, pts:[2]}, {id:3, pts:[3]}, {id:5, pts:[5]}, {id:12, pts:[6,7,8]}],
        // Step 5: merge 3 and 5
        [{id:11, pts:[0,4,1]}, {id:2, pts:[2]}, {id:13, pts:[3,5]}, {id:12, pts:[6,7,8]}],
        // Step 6: merge 13 and 2
        [{id:11, pts:[0,4,1]}, {id:14, pts:[3,5,2]}, {id:12, pts:[6,7,8]}],
        // Step 7: merge 11 and 14 (not 12)
        [{id:15, pts:[0,4,1,3,5,2]}, {id:12, pts:[6,7,8]}],
        // Step 8: merge all
        [{id:16, pts:[0,1,2,3,4,5,6,7,8]}],
    ], []);

    const [step, setStep] = useState(0);

    const chartData = useMemo(() => {
        return initialData.map((d, i) => {
            const cluster = mergeSteps[step].find(c => c.pts.includes(i));
            return { ...d, clusterId: cluster ? cluster.id : -1 };
        });
    }, [step, mergeSteps]);

    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#c884d8", "#d884c8", "#84d8c8"];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><GitMerge /> Hierarchical Clustering</CardTitle>
                <CardDescription>
                    This visualization shows agglomerative hierarchical clustering. It starts with each point as its own cluster and progressively merges the closest pairs.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center items-center gap-4 mb-4">
                    <Button onClick={() => setStep(s => Math.max(0, s-1))} disabled={step === 0}>Previous Step</Button>
                    <span className="text-sm text-muted-foreground">Step: {step + 1} / {mergeSteps.length} ({mergeSteps[step].length} clusters)</span>
                    <Button onClick={() => setStep(s => Math.min(mergeSteps.length-1, s+1))} disabled={step === mergeSteps.length-1}>Next Step</Button>
                </div>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" name="X" domain={[0, 12]}/>
                            <YAxis type="number" dataKey="y" name="Y" domain={[0, 12]}/>
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Legend />
                            {mergeSteps[step].map((cluster, i) => (
                                <Scatter
                                    key={cluster.id}
                                    name={`Cluster ${i+1}`}
                                    data={chartData.filter(d => d.clusterId === cluster.id)}
                                    fill={colors[i % colors.length]}
                                />
                            ))}
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default HierarchicalClusteringSimulation;

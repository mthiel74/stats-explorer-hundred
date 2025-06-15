
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceArea } from 'recharts';
import { GitBranch } from 'lucide-react';

const generateBiclassData = (n) => {
  const data = [];
  for (let i = 0; i < n; i++) {
    const x = Math.random() * 10;
    const y = Math.random() * 10;
    let label = 0;
    if (x > 5 && y > 5) label = 1;
    if (x <= 5 && y <= 5 && Math.random() > 0.2) label = 1;
    data.push({ x, y, label });
  }
  return data;
};

const DecisionTreesSimulation = () => {
    const [data] = useState(generateBiclassData(200));
    const [partitions, setPartitions] = useState([]);

    const buildTree = () => {
        // This is a simplified, non-recursive visualization of a decision tree's partitions.
        const newPartitions = [
            // Rule 1: x > 5
            { x1: 5, x2: 10, y1: 0, y2: 10, fill: "blue", opacity: 0.1 },
            // Rule 2 inside x > 5: y > 5
            { x1: 5, x2: 10, y1: 5, y2: 10, fill: "red", opacity: 0.2 },
             // Rule 3: x <= 5
            { x1: 0, x2: 5, y1: 0, y2: 10, fill: "red", opacity: 0.1 },
            // Rule 4 inside x <= 5: y > 5
            { x1: 0, x2: 5, y1: 5, y2: 10, fill: "blue", opacity: 0.2 },
        ];
        setPartitions(newPartitions);
    };

    const classColors = ["hsl(var(--primary))", "hsl(var(--destructive))"];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><GitBranch /> The Oracle's Grove (Decision Tree)</CardTitle>
                <CardDescription>
                    Decision Trees partition data based on feature values to make predictions. Watch how simple rules carve up the space.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <Button onClick={buildTree} className="w-full">Build Tree Partitions</Button>
                     <Button onClick={() => setPartitions([])} variant="secondary" className="w-full">Clear Partitions</Button>
                </div>
                <div className="lg:col-span-2 min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" domain={[0, 10]} />
                            <YAxis type="number" dataKey="y" domain={[0, 10]} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }}/>
                             {partitions.map((p, i) => (
                                <ReferenceArea key={i} x1={p.x1} x2={p.x2} y1={p.y1} y2={p.y2} stroke="none" fill={p.fill} fillOpacity={p.opacity} />
                            ))}
                            <Scatter name="Class 0" data={data.filter(d => d.label === 0)} fill={classColors[0]} />
                            <Scatter name="Class 1" data={data.filter(d => d.label === 1)} fill={classColors[1]} shape="cross" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default DecisionTreesSimulation;

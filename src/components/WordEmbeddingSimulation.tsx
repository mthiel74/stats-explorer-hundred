
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, LabelList, Label } from 'recharts';
import { Button } from '@/components/ui/button';

const wordVectors = {
    king: { x: 0.8, y: 0.9, group: 'royalty' },
    queen: { x: 0.2, y: 0.9, group: 'royalty' },
    man: { x: 0.8, y: 0.3, group: 'people' },
    woman: { x: 0.2, y: 0.3, group: 'people' },
    apple: { x: -0.7, y: -0.5, group: 'fruit' },
    orange: { x: -0.5, y: -0.7, group: 'fruit' },
    car: { x: -0.8, y: 0.8, group: 'vehicle' },
    truck: { x: -0.6, y: 0.6, group: 'vehicle' },
};

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
        <div className="bg-background border p-2 rounded shadow-lg">
            <p className="font-bold">{payload[0].payload.name}</p>
            <p className="text-sm text-muted-foreground">[{payload[0].payload.x.toFixed(2)}, {payload[0].payload.y.toFixed(2)}]</p>
        </div>
        );
    }
    return null;
};

const WordEmbeddingSimulation = () => {
    const [analogy, setAnalogy] = useState<any>(null);
    
    const data = Object.entries(wordVectors).map(([name, {x,y, group}]) => ({ name, x, y, group }));

    const calculateAnalogy = () => {
        const resultVec = {
            x: wordVectors.king.x - wordVectors.man.x + wordVectors.woman.x,
            y: wordVectors.king.y - wordVectors.man.y + wordVectors.woman.y,
        };
        setAnalogy({ name: "king - man + woman", ...resultVec, group: 'analogy' });
    };
    
    const chartData = analogy ? [...data, analogy] : data;

    const colors: { [key: string]: string } = {
        royalty: '#8884d8',
        people: '#82ca9d',
        fruit: '#ffc658',
        vehicle: '#ff7300',
        analogy: '#e11d48'
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Word Embeddings</CardTitle>
                <CardDescription>Representing words as dense vectors in a continuous space, capturing semantic relationships.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="w-full h-96">
                    <ResponsiveContainer>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 40, left: 20 }}>
                            <XAxis type="number" dataKey="x" name="dim 1" domain={[-1.1, 1.1]} tickCount={5}>
                                <Label value="Semantic Dimension 1" offset={-25} position="insideBottom" />
                            </XAxis>
                            <YAxis type="number" dataKey="y" name="dim 2" domain={[-1.1, 1.1]} tickCount={5}>
                                 <Label value="Semantic Dimension 2" angle={-90} offset={-10} position="insideLeft" style={{ textAnchor: 'middle' }} />
                            </YAxis>
                            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
                            
                            {Object.keys(colors).map(group => (
                                <Scatter key={group} name={group} data={chartData.filter(d => d.group === group)} fill={colors[group]}>
                                    <LabelList dataKey="name" position="top" style={{ fill: "#333", fontSize: 12 }} />
                                </Scatter>
                            ))}
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
                 <div className="text-center mt-4">
                    <Button onClick={calculateAnalogy} disabled={!!analogy}>Show Analogy: king - man + woman ≈ ?</Button>
                    {analogy && <Button variant="outline" onClick={() => setAnalogy(null)} className="ml-2">Reset</Button>}
                    {analogy && <p className="mt-2 text-primary font-semibold animate-fade-in">The result vector is very close to 'queen'!</p>}
                </div>
            </CardContent>
        </Card>
    );
};

export default WordEmbeddingSimulation;

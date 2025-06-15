
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ScanSearch } from 'lucide-react';

const data = [
  // Cluster 1
  {x: 2, y: 2}, {x: 2.5, y: 2.2}, {x: 1.8, y: 2.5}, {x: 2.2, y: 1.8}, {x: 3, y: 3},
  // Cluster 2
  {x: 7, y: 8}, {x: 7.5, y: 7.8}, {x: 6.8, y: 8.5}, {x: 7.2, y: 8.2}, {x: 8, y: 7.5}, {x: 7.5, y: 8.5},
  // Bridge point
  {x: 4.5, y: 5},
  // Noise
  {x: 9, y: 2}, {x: 1, y: 9}, {x: 5, y: 1},
];

const euclideanDistance = (p1: {x:number, y:number}, p2: {x:number, y:number}) => Math.sqrt(Math.pow(p1.x-p2.x, 2) + Math.pow(p1.y-p2.y, 2));

const dbscan = (points: {x:number, y:number}[], epsilon: number, minPts: number) => {
    const labels = new Array(points.length).fill(0); // 0: unclassified, -1: noise
    let clusterId = 0;

    const rangeQuery = (pIndex: number) => {
        return points.reduce((neighbors: number[], pt, i) => {
            if (i !== pIndex && euclideanDistance(points[pIndex], pt) <= epsilon) {
                neighbors.push(i);
            }
            return neighbors;
        }, []);
    };
    
    points.forEach((p, i) => {
        if (labels[i] !== 0) return; // already processed

        const neighbors = rangeQuery(i);
        if (neighbors.length < minPts - 1) {
            labels[i] = -1; // noise
            return;
        }

        clusterId++;
        labels[i] = clusterId;
        
        let seedSet = [...neighbors];
        for (let j = 0; j < seedSet.length; j++) {
            const qIndex = seedSet[j];
            if (labels[qIndex] === -1) labels[qIndex] = clusterId; // was noise, now border
            if (labels[qIndex] !== 0) continue; // already processed

            labels[qIndex] = clusterId;
            const qNeighbors = rangeQuery(qIndex);
            if (qNeighbors.length >= minPts - 1) {
                seedSet.push(...qNeighbors.filter(qn => !seedSet.includes(qn))); // expand cluster
            }
        }
    });
    return labels;
}

const DBSCANSimulation = () => {
    const [epsilon, setEpsilon] = useState(1.5);
    const [minPts, setMinPts] = useState(3);

    const labels = useMemo(() => dbscan(data, epsilon, minPts), [epsilon, minPts]);
    
    const chartData = data.map((d, i) => ({...d, label: labels[i]}));
    
    const clusters = chartData.filter(d => d.label > 0);
    const noise = chartData.filter(d => d.label === -1);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><ScanSearch /> DBSCAN Clustering</CardTitle>
                <CardDescription>
                    DBSCAN finds clusters based on density. Adjust epsilon (reachability distance) and MinPts (core point threshold) to see how clusters form.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-1 space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="epsilon">Epsilon (ε): {epsilon.toFixed(1)}</Label>
                        <Slider id="epsilon" value={[epsilon]} onValueChange={([val]) => setEpsilon(val)} min={0.5} max={3} step={0.1} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="minpts">MinPts: {minPts}</Label>
                        <Slider id="minpts" value={[minPts]} onValueChange={([val]) => setMinPts(val)} min={2} max={5} step={1} />
                    </div>
                 </div>
                <div className="lg:col-span-2 min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" domain={[0, 10]} />
                            <YAxis type="number" dataKey="y" domain={[0, 10]} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }}/>
                            <Legend />
                            <Scatter name="Clusters" data={clusters} fill="hsl(var(--primary))" />
                            <Scatter name="Noise" data={noise} fill="hsl(var(--muted-foreground))" shape="cross" />
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default DBSCANSimulation;

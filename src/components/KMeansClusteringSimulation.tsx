
import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users } from 'lucide-react';

const generateClusterData = (numPoints, numClusters) => {
    const data = [];
    const clusterCenters = Array.from({ length: numClusters }, () => ({
        x: Math.random() * 8 - 4,
        y: Math.random() * 8 - 4
    }));

    for (let i = 0; i < numPoints; i++) {
        const clusterIndex = i % numClusters;
        const { x: centerX, y: centerY } = clusterCenters[clusterIndex];
        data.push({
            x: centerX + (Math.random() - 0.5) * 2,
            y: centerY + (Math.random() - 0.5) * 2,
        });
    }
    return data;
};

const KMeansClusteringSimulation = () => {
    const [numClusters, setNumClusters] = useState(3);
    const [data, setData] = useState(generateClusterData(150, 3));
    const [centroids, setCentroids] = useState([]);
    const [clusteredData, setClusteredData] = useState(data);
    const [isClustered, setIsClustered] = useState(false);

    const reset = useCallback(() => {
        const newData = generateClusterData(150, numClusters);
        setData(newData);
        setClusteredData(newData);
        setCentroids([]);
        setIsClustered(false);
    }, [numClusters]);

    const runKMeans = () => {
        // 1. Initialize centroids
        let currentCentroids = data.slice(0, numClusters).map(d => ({...d}));

        for(let iter = 0; iter < 10; iter++) { // Limit iterations
            // 2. Assign clusters
            const assignments = data.map(point => {
                let closestCentroidIndex = 0;
                let minDistance = Infinity;
                currentCentroids.forEach((centroid, i) => {
                    const distance = Math.sqrt(Math.pow(point.x - centroid.x, 2) + Math.pow(point.y - centroid.y, 2));
                    if (distance < minDistance) {
                        minDistance = distance;
                        closestCentroidIndex = i;
                    }
                });
                return closestCentroidIndex;
            });

            // 3. Update centroids
            const newCentroids = Array.from({ length: numClusters }, () => ({ x: 0, y: 0, count: 0 }));
            data.forEach((point, i) => {
                const clusterIndex = assignments[i];
                newCentroids[clusterIndex].x += point.x;
                newCentroids[clusterIndex].y += point.y;
                newCentroids[clusterIndex].count++;
            });

            currentCentroids = newCentroids.map(c => ({ x: c.x / c.count, y: c.y / c.count }));
        }
        
        setCentroids(currentCentroids);
        const finalClusteredData = data.map(point => {
            let closestCentroidIndex = 0;
            let minDistance = Infinity;
            currentCentroids.forEach((centroid, i) => {
                const distance = Math.sqrt(Math.pow(point.x - centroid.x, 2) + Math.pow(point.y - centroid.y, 2));
                if (distance < minDistance) {
                    minDistance = distance;
                    closestCentroidIndex = i;
                }
            });
            return { ...point, cluster: closestCentroidIndex };
        });
        setClusteredData(finalClusteredData);
        setIsClustered(true);
    };

    const clusterColors = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088FE", "#00C49F"];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users /> Kingdom Assembler (K-Means)</CardTitle>
                <CardDescription>
                    K-Means Clustering groups unlabeled data into 'k' different clusters. Adjust 'k' and watch the algorithm find the groups.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                     <Card>
                        <CardContent className="pt-6 space-y-3">
                            <label className="font-semibold">Number of Clusters (k)</label>
                            <Slider defaultValue={[numClusters]} min={2} max={6} step={1} onValueChange={([val]) => setNumClusters(val)} />
                            <p className="text-center text-lg font-bold">{numClusters}</p>
                            <Button onClick={reset} className="w-full">Generate New Data</Button>
                        </CardContent>
                    </Card>
                    <Button onClick={runKMeans} className="w-full">Run K-Means</Button>
                </div>
                <div className="lg:col-span-2 min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" domain={[-5, 5]} />
                            <YAxis type="number"dataKey="y" domain={[-5, 5]} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                            <Scatter name="Data" data={clusteredData} fill="hsl(var(--primary))">
                                {clusteredData.map((entry, index) => (
                                    <circle key={`cell-${index}`} cx={entry.cx} cy={entry.cy} r={entry.r} fill={isClustered ? clusterColors[entry.cluster % 6] : "hsl(var(--primary))"} />
                                ))}
                            </Scatter>
                            {isClustered && <Scatter name="Centroids" data={centroids} fill="hsl(var(--destructive))" shape="star" />}
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default KMeansClusteringSimulation;

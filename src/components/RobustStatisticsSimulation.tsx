
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

const calculateStats = (data: number[]) => {
    if (data.length === 0) return { mean: 0, median: 0 };
    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const sorted = [...data].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
    return { mean, median };
};

const initialData = [10, 12, 13, 15, 16, 17, 19, 20, 22, 150];

const RobustStatisticsSimulation = () => {
    const [data] = useState(initialData);
    const [isOutlierIncluded, setIsOutlierIncluded] = useState(true);

    const currentData = isOutlierIncluded ? data : data.slice(0, -1);
    const { mean, median } = calculateStats(currentData);
    
    const initialStats = calculateStats(data.slice(0,-1));
    const outlierStats = calculateStats(data);
    
    const meanChange = ((outlierStats.mean - initialStats.mean) / initialStats.mean * 100).toFixed(1);
    const medianChange = ((outlierStats.median - initialStats.median) / initialStats.median * 100).toFixed(1);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Robust Statistics</CardTitle>
                <CardDescription>
                    Robust statistics are resistant to outliers. Compare how the mean and median react to an extreme value.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <Label>Dataset:</Label>
                    <p className="p-2 bg-muted rounded text-sm font-mono">
                        {data.slice(0, -1).join(', ')}{isOutlierIncluded ? <span className="text-destructive font-bold">, {data[data.length - 1]}</span> : ''}
                    </p>
                </div>
                <Button onClick={() => setIsOutlierIncluded(!isOutlierIncluded)}>
                    {isOutlierIncluded ? 'Remove Outlier' : 'Include Outlier'}
                </Button>

                <div className="grid grid-cols-2 gap-4 mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Mean (Average)</CardTitle>
                            <CardDescription>Not Robust</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{mean.toFixed(2)}</p>
                            {isOutlierIncluded && <p className="text-sm text-destructive mt-2">Changed by {meanChange}% due to outlier.</p>}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Median (Middle Value)</CardTitle>
                            <CardDescription>Robust</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{median.toFixed(2)}</p>
                             {isOutlierIncluded && <p className="text-sm text-green-600 mt-2">Only changed by {medianChange}%.</p>}
                        </CardContent>
                    </Card>
                </div>
                 <p className="mt-4 text-center text-muted-foreground">
                    The mean is heavily skewed by the outlier, while the median remains a more stable measure of the "typical" value.
                </p>
            </CardContent>
        </Card>
    );
};

export default RobustStatisticsSimulation;

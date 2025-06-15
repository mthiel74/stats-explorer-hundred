
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

const generateSampleData = (n=30) => {
    const data = Array.from({ length: n-2 }, () => Math.random() * 50 + 25);
    data.push(Math.random() * 5); // low outlier
    data.push(Math.random() * 50 + 100); // high outlier
    return data.sort((a,b) => a-b);
};

const trim = (data: number[], percentage: number) => {
    const n = data.length;
    const trimCount = Math.floor(n * (percentage / 100));
    if (trimCount === 0) return [...data];

    const sorted = [...data].sort((a, b) => a - b);
    return sorted.slice(trimCount, n - trimCount);
};

const mean = (data: number[]) => {
    if (data.length === 0) return 0;
    return data.reduce((a, b) => a + b, 0) / data.length;
}

const TrimmingSimulation = () => {
    const [data] = useState(generateSampleData());
    const [percentage, setPercentage] = useState(10);

    const trimmedData = trim(data, percentage);
    const originalMean = mean(data);
    const trimmedMean = mean(trimmedData);
    const trimCount = Math.floor(data.length * (percentage / 100));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Trimming / Truncating</CardTitle>
                <CardDescription>
                    A method to handle outliers by completely removing a percentage of extreme values from both ends of the dataset.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6">
                    <Label>Trim Percentage: {percentage}%</Label>
                    <Slider value={[percentage]} onValueChange={(v) => setPercentage(v[0])} min={0} max={25} step={1} />
                    <p className="text-sm text-muted-foreground">This will remove the top and bottom {trimCount} value(s).</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold">Original Mean</h4>
                        <p className="text-2xl font-bold">{originalMean.toFixed(2)}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Trimmed Mean</h4>
                        <p className="text-2xl font-bold text-primary">{trimmedMean.toFixed(2)}</p>
                    </div>
                </div>
                
                <div className="mt-6">
                    <h4 className="font-semibold mb-2">Data Transformation</h4>
                    <p className="text-sm text-muted-foreground">Original data has {data.length} points. Trimmed data has {trimmedData.length} points.</p>
                    <div className="p-2 bg-muted rounded text-sm font-mono max-h-48 overflow-y-auto">
                        <p className="font-bold">Original:</p>
                        <p>{data.map(d => d.toFixed(1)).join(', ')}</p>
                        <p className="font-bold mt-2">Trimmed:</p>
                        <p>{trimmedData.length > 0 ? trimmedData.map(d => d.toFixed(1)).join(', ') : 'All data trimmed'}</p>
                    </div>
                     <p className="mt-2 text-sm text-muted-foreground">The trimmed mean provides a measure of central tendency that is not affected by the removed outliers.</p>
                </div>

            </CardContent>
        </Card>
    );
};

export default TrimmingSimulation;

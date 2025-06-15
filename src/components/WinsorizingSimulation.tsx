
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

const winsorize = (data: number[], percentage: number) => {
    const n = data.length;
    const trimCount = Math.floor(n * (percentage / 100));
    if (trimCount === 0) return [...data];

    const sorted = [...data].sort((a, b) => a - b);
    const lowerBound = sorted[trimCount];
    const upperBound = sorted[n - 1 - trimCount];
    
    return sorted.map(val => {
        if (val < lowerBound) return lowerBound;
        if (val > upperBound) return upperBound;
        return val;
    });
};

const mean = (data: number[]) => data.reduce((a, b) => a + b, 0) / data.length;

const WinsorizingSimulation = () => {
    const [data] = useState(generateSampleData());
    const [percentage, setPercentage] = useState(10);

    const winsorizedData = winsorize(data, percentage);
    const originalMean = mean(data);
    const winsorizedMean = mean(winsorizedData);
    const trimCount = Math.floor(data.length * (percentage / 100));

    return (
        <Card>
            <CardHeader>
                <CardTitle>Winsorizing</CardTitle>
                <CardDescription>
                    A method to handle outliers by replacing extreme values with less extreme ones from the remaining data.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6">
                    <Label>Winsorize Percentage: {percentage}%</Label>
                    <Slider value={[percentage]} onValueChange={(v) => setPercentage(v[0])} min={0} max={25} step={1} />
                    <p className="text-sm text-muted-foreground">This will replace the top and bottom {trimCount} value(s).</p>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold">Original Mean</h4>
                        <p className="text-2xl font-bold">{originalMean.toFixed(2)}</p>
                    </div>
                    <div>
                        <h4 className="font-semibold">Winsorized Mean</h4>
                        <p className="text-2xl font-bold text-primary">{winsorizedMean.toFixed(2)}</p>
                    </div>
                </div>
                
                <div className="mt-6">
                    <h4 className="font-semibold mb-2">Data Transformation</h4>
                    <div className="p-2 bg-muted rounded text-sm font-mono max-h-48 overflow-y-auto">
                        <p className="font-bold">Original:</p>
                        <p>{data.map(d => d.toFixed(1)).join(', ')}</p>
                        <p className="font-bold mt-2">Winsorized:</p>
                        <p>{winsorizedData.map(d => d.toFixed(1)).join(', ')}</p>
                    </div>
                     <p className="mt-2 text-sm text-muted-foreground">Notice how the Winsorized mean is less influenced by the extreme low and high values in the original data.</p>
                </div>

            </CardContent>
        </Card>
    );
};

export default WinsorizingSimulation;

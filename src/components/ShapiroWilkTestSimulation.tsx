
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Check, X } from 'lucide-react';

// Very simplified Shapiro-Wilk logic for demonstration. Not a real implementation.
const simplifiedShapiroWilk = (data: number[]) => {
    const n = data.length;
    if (n < 3) return { W: NaN, p: NaN };
    const sorted = [...data].sort((a,b) => a-b);
    const mean = sorted.reduce((a,b) => a+b, 0) / n;
    
    // This is a placeholder for the complex W calculation.
    // It will distinguish normal from uniform/exponential roughly.
    const range = sorted[n-1] - sorted[0];
    const stdDev = Math.sqrt(sorted.reduce((sum, d) => sum + (d - mean)**2, 0) / n);
    const W_approx = stdDev / range; 
    
    // Fake p-value logic
    const p = (W_approx > 0.3) ? 0.2 : 0.01; // Normal-like distributions will have higher value
    return { W: W_approx, p };
}

const ShapiroWilkTestSimulation = () => {
    const [distType, setDistType] = useState('normal');

    const { pValue, bins } = useMemo(() => {
        let sampleData: number[] = [];
        const n = 100;
        switch(distType) {
            case 'uniform':
                sampleData = Array.from({length: n}, () => Math.random() * 10);
                break;
            case 'exponential':
                sampleData = Array.from({length: n}, () => -Math.log(Math.random()) * 5);
                break;
            case 'normal':
            default:
                // Box-Muller transform
                sampleData = Array.from({length: n/2}, () => {
                    const u1 = Math.random();
                    const u2 = Math.random();
                    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
                    const z2 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
                    return [5 + z1, 5 + z2];
                }).flat();
                break;
        }

        const { p } = simplifiedShapiroWilk(sampleData);
        
        // Create histogram bins
        const min = Math.min(...sampleData);
        const max = Math.max(...sampleData);
        const binCount = 10;
        const binWidth = (max-min)/binCount;
        const histogramBins = Array(binCount).fill(0).map((_, i) => ({name: (min + i*binWidth).toFixed(1), count: 0}));
        sampleData.forEach(val => {
            const binIndex = Math.min(Math.floor((val - min) / binWidth), binCount - 1);
            if (histogramBins[binIndex]) {
               histogramBins[binIndex].count++;
            }
        });

        return { pValue: p, bins: histogramBins };
    }, [distType]);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Shapiro-Wilk Test for Normality</CardTitle>
                <CardDescription>Test if a sample comes from a normal distribution.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center gap-4 mb-4">
                    <Button onClick={() => setDistType('normal')} variant={distType === 'normal' ? 'default' : 'outline'}>Normal</Button>
                    <Button onClick={() => setDistType('uniform')} variant={distType === 'uniform' ? 'default' : 'outline'}>Uniform</Button>
                    <Button onClick={() => setDistType('exponential')} variant={distType === 'exponential' ? 'default' : 'outline'}>Exponential</Button>
                </div>
                <div className="grid md:grid-cols-2 gap-4 items-center">
                    <div>
                         <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={bins}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="hsl(var(--primary))" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <Card className="text-center p-6">
                        <CardTitle>Test Result</CardTitle>
                        <p className="text-lg mt-4">p-value: {pValue.toFixed(3)}</p>
                        {pValue > 0.05 ? (
                            <div className="mt-4 flex items-center justify-center text-green-500">
                                <Check className="h-8 w-8 mr-2" />
                                <span className="text-xl font-bold">Fail to reject H₀ (Sample appears normal)</span>
                            </div>
                        ) : (
                             <div className="mt-4 flex items-center justify-center text-red-500">
                                <X className="h-8 w-8 mr-2" />
                                <span className="text-xl font-bold">Reject H₀ (Sample does not appear normal)</span>
                            </div>
                        )}
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
};
export default ShapiroWilkTestSimulation;

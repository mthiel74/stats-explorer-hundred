
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Database, Clock } from 'lucide-react';

const BigDataSimulation = () => {
    const [dataSize, setDataSize] = useState(1000);
    const [processingTime, setProcessingTime] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleProcess = () => {
        setIsLoading(true);
        setProcessingTime(null);
        // Using setTimeout to ensure the UI updates to show the loading state
        // before the blocking operation starts.
        setTimeout(() => {
            const startTime = performance.now();
            // This loop is a simplified simulation of a heavy computation.
            // In a real scenario, this would be a complex data processing task.
            for (let i = 0; i < dataSize * 100; i++) {
                Math.sqrt(i);
            }
            const endTime = performance.now();
            setProcessingTime(endTime - startTime);
            setIsLoading(false);
        }, 50);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Database /> The Leviathan's Data (Big Data)</CardTitle>
                <CardDescription>
                    "Big Data" refers to datasets that are too large or complex for traditional data-processing application software. This simulation shows how processing time can increase with data volume.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <div>
                        <Label htmlFor="data-size">Data Points: {dataSize.toLocaleString()}</Label>
                        <Slider
                            id="data-size"
                            min={1000}
                            max={1000000}
                            step={1000}
                            value={[dataSize]}
                            onValueChange={(value) => setDataSize(value[0])}
                            disabled={isLoading}
                        />
                    </div>
                    <Button onClick={handleProcess} disabled={isLoading} className="w-full">
                        {isLoading ? "Processing..." : "Process Data"}
                    </Button>
                </div>
                <div className="lg:col-span-2 flex items-center justify-center min-h-[200px] bg-muted rounded-lg p-4">
                    {isLoading && <p className="text-muted-foreground">Calculating...</p>}
                    {!isLoading && processingTime !== null ? (
                        <div className="text-center">
                            <Clock className="mx-auto h-12 w-12 text-primary" />
                            <p className="text-2xl font-bold mt-4">{processingTime.toFixed(2)} ms</p>
                            <p className="text-muted-foreground">Time to process {dataSize.toLocaleString()} data points.</p>
                        </div>
                    ) : !isLoading && (
                        <p className="text-muted-foreground text-center">Adjust the slider and click "Process Data" to see how volume impacts processing time.</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default BigDataSimulation;

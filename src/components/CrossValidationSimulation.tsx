
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Repeat, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

const TOTAL_POINTS = 50;

const CrossValidationSimulation = () => {
    const [kFolds, setKFolds] = useState(5);
    const [currentFold, setCurrentFold] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    
    // Create a stable array of indices
    const allIndices = useMemo(() => Array.from({ length: TOTAL_POINTS }, (_, i) => i), []);

    const foldSize = Math.floor(TOTAL_POINTS / kFolds);

    const handleRun = () => {
        setIsRunning(true);
        setCurrentFold(0);
        const interval = setInterval(() => {
            setCurrentFold(prev => {
                if (prev >= kFolds - 1) {
                    clearInterval(interval);
                    setIsRunning(false);
                    return prev;
                }
                return prev + 1;
            });
        }, 1000);
    };

    const getPointStatus = (index: number): 'train' | 'test' => {
        const start = currentFold * foldSize;
        let end = start + foldSize;
        if (currentFold === kFolds - 1) {
            end = TOTAL_POINTS; // Ensure last fold takes all remaining
        }
        return index >= start && index < end ? 'test' : 'train';
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Repeat /> Cross-Validation Visualizer</CardTitle>
                <CardDescription>
                    See how K-Fold Cross-Validation splits data to train and test a model multiple times for more robust evaluation.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6 items-center">
                    <div className="space-y-2">
                        <Label htmlFor="k-folds">Number of Folds (K)</Label>
                        <Slider
                            id="k-folds"
                            value={[kFolds]}
                            onValueChange={([val]) => { setKFolds(val); setCurrentFold(0); setIsRunning(false); }}
                            min={2}
                            max={10}
                            step={1}
                            disabled={isRunning}
                        />
                        <p className="text-center font-bold text-lg">{kFolds}</p>
                    </div>
                    <div className="md:col-span-2 flex flex-col items-center gap-4">
                        <Button onClick={handleRun} disabled={isRunning}>
                            <Play className="mr-2" /> Run Folds Animation
                        </Button>
                        <p className="text-muted-foreground text-sm">Fold {currentFold + 1} of {kFolds}</p>
                    </div>
                </div>

                <div className="p-4 border rounded-lg bg-muted/50">
                    <p className="font-semibold mb-2">Full Dataset ({TOTAL_POINTS} points)</p>
                    <div className="flex flex-wrap gap-2">
                        {allIndices.map(i => {
                            const status = getPointStatus(i);
                            return (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-5 w-5 rounded-sm transition-all duration-300",
                                        status === 'train' && "bg-primary",
                                        status === 'test' && "bg-destructive"
                                    )}
                                    title={`Point ${i+1}`}
                                />
                            );
                        })}
                    </div>
                    <div className="flex items-center gap-6 mt-4">
                        <div className="flex items-center gap-2"><div className="h-4 w-4 rounded bg-primary" /> Training Data</div>
                        <div className="flex items-center gap-2"><div className="h-4 w-4 rounded bg-destructive" /> Testing/Validation Data</div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CrossValidationSimulation;

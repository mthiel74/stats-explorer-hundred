
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RotateCw, BrainCircuit, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

const inputText = ["Recurrent", "Neural", "Networks", "are", "cool"];

const RecurrentNeuralNetworkSimulation = () => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [step, setStep] = useState(-1);
    const [hiddenState, setHiddenState] = useState(0);

    useEffect(() => {
        if (isAnimating && step < inputText.length - 1) {
            const timer = setTimeout(() => {
                setStep(s => s + 1);
                setHiddenState(Math.random());
            }, 1000);
            return () => clearTimeout(timer);
        }
        if(step >= inputText.length - 1) {
            setIsAnimating(false);
        }
    }, [isAnimating, step]);

    const reset = () => {
        setIsAnimating(false);
        setStep(-1);
        setHiddenState(0);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BrainCircuit /> Recurrent Neural Network (RNN)</CardTitle>
                <CardDescription>Visualizing how an RNN processes sequential data one step at a time, maintaining a 'memory' through its hidden state.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                <div className="flex justify-center items-center gap-4 h-48">
                    <div className="flex flex-col items-center">
                        <p className="font-semibold mb-2">Input (x_t)</p>
                        <div className="w-32 h-16 border-2 rounded-lg flex items-center justify-center bg-background text-lg font-mono">
                            {step > -1 ? inputText[step] : "..."}
                        </div>
                    </div>

                    <div className="text-5xl text-muted-foreground">&rarr;</div>

                    <div className="flex flex-col items-center relative">
                        <p className="font-semibold mb-2">RNN Cell</p>
                        <div className="w-32 h-32 border-2 border-primary rounded-lg flex flex-col items-center justify-center bg-primary/10">
                            <p className="text-sm">Hidden State</p>
                            <p className="text-lg font-mono font-bold animate-fade-in">{hiddenState.toFixed(2)}</p>
                        </div>
                        <div className={cn("absolute -bottom-6 flex items-center text-primary transition-opacity", isAnimating ? 'opacity-100' : 'opacity-0')}>
                            <RotateCcw className="w-5 h-5 animate-spin" style={{animationDuration: '2s'}}/>
                            <p className="text-xs ml-1">memory loop</p>
                        </div>
                    </div>

                    <div className="text-5xl text-muted-foreground">&rarr;</div>

                    <div className="flex flex-col items-center">
                        <p className="font-semibold mb-2">Output (y_t)</p>
                        <div className="w-32 h-16 border-2 rounded-lg flex items-center justify-center bg-background text-lg font-mono">
                           {step > -1 ? "Processed" : "..."}
                        </div>
                    </div>
                </div>
                 <div className="flex gap-2 justify-center mt-6">
                    <Button onClick={() => { setIsAnimating(true); if(step >= inputText.length -1) reset(); }} disabled={isAnimating}>
                        <Play className="mr-2" /> Animate Sequence
                    </Button>
                    <Button variant="outline" onClick={reset}>
                        <RotateCw className="mr-2" /> Reset
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default RecurrentNeuralNetworkSimulation;

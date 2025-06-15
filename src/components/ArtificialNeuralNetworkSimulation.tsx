
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RotateCw, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

const ArtificialNeuralNetworkSimulation = () => {
    const [isAnimating, setIsAnimating] = useState(false);

    const layers = [
        { name: 'Input', count: 2 },
        { name: 'Hidden', count: 4 },
        { name: 'Output', count: 1 },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BrainCircuit /> Artificial Neural Network (ANN)</CardTitle>
                <CardDescription>A simple feedforward neural network visualizing how data flows from input to output through hidden layers.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative h-64 w-full">
                    <svg className="absolute w-full h-full">
                        {layers.slice(0, -1).map((layer, l_idx) => {
                            const nextLayer = layers[l_idx + 1];
                            return Array.from({ length: layer.count }).map((_, n1_idx) => 
                                Array.from({ length: nextLayer.count }).map((_, n2_idx) => (
                                    <line
                                        key={`${l_idx}-${n1_idx}-${n2_idx}`}
                                        x1={`${(l_idx * 40) + 10}%`}
                                        y1={`${(n1_idx / (layer.count -1)) * 80 + 10}%`}
                                        x2={`${((l_idx+1) * 40) + 10}%`}
                                        y2={`${(n2_idx / (nextLayer.count -1)) * 80 + 10}%`}
                                        className={cn("stroke-muted-foreground transition-all duration-500", isAnimating ? "stroke-primary" : "")}
                                        style={{ animationDelay: isAnimating ? `${l_idx * 0.5}s` : '0s' }}
                                    />
                                ))
                            )
                        })}
                    </svg>
                    <div className="flex justify-between h-full">
                        {layers.map((layer, l_idx) => (
                            <div key={layer.name} className="flex flex-col justify-around">
                                {Array.from({ length: layer.count }).map((_, n_idx) => (
                                    <div key={n_idx} className={cn(
                                        "w-12 h-12 rounded-full border-2 bg-background flex items-center justify-center transition-all duration-500",
                                        isAnimating ? "border-primary shadow-lg shadow-primary/50" : "border-muted-foreground"
                                    )} style={{ animation: isAnimating ? `pulse-border 1s ease-in-out ${l_idx * 0.5}s infinite` : 'none' }}>
                                        {l_idx === 0 && 'X'}
                                        {l_idx === layers.length-1 && 'Ŷ'}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-2 justify-center mt-6">
                    <Button onClick={() => setIsAnimating(true)} disabled={isAnimating}>
                        <Play className="mr-2" /> Animate Flow
                    </Button>
                    <Button variant="outline" onClick={() => setIsAnimating(false)}>
                        <RotateCw className="mr-2" /> Reset
                    </Button>
                </div>
                <style>{`
                @keyframes pulse-border { 0%, 100% { box-shadow: 0 0 0 0px hsl(var(--primary) / 0.5); } 50% { box-shadow: 0 0 0 8px hsl(var(--primary) / 0); } }
                line { transition: stroke 0.5s ease-in-out; }
                `}</style>
            </CardContent>
        </Card>
    );
};

export default ArtificialNeuralNetworkSimulation;

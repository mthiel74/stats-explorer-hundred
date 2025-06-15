
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BrainCircuit, AppWindow, Shapes, Combine } from 'lucide-react';

const DeepLearningSimulation = () => {
    const layers = [
        { name: 'Input Layer', icon: <AppWindow />, description: 'Raw Data (e.g., pixels of an image)' },
        { name: 'Hidden Layer 1', icon: <Shapes />, description: 'Learns simple features (edges, corners)' },
        { name: 'Hidden Layer 2', icon: <Combine />, description: 'Combines features (eyes, nose)' },
        { name: 'Output Layer', icon: <BrainCircuit />, description: 'Makes a final prediction (e.g., "Cat")' },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BrainCircuit /> Deep Learning</CardTitle>
                <CardDescription>Deep Learning uses deep neural networks (with many layers) to learn complex patterns from data by building a hierarchy of features.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col md:flex-row justify-center items-stretch gap-4 p-4">
                    {layers.map((layer, index) => (
                        <React.Fragment key={layer.name}>
                            <div className="flex-1 flex flex-col items-center p-4 border rounded-lg bg-background text-center">
                                <div className="text-primary mb-2">{React.cloneElement(layer.icon, { className: 'w-10 h-10' })}</div>
                                <h3 className="font-semibold mb-1">{layer.name}</h3>
                                <p className="text-xs text-muted-foreground">{layer.description}</p>
                            </div>
                            {index < layers.length - 1 && (
                                <div className="flex items-center justify-center text-2xl text-muted-foreground font-light self-center mx-4 my-2 md:my-0">
                                    &rarr;
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <p className="text-center text-muted-foreground mt-4 text-sm">Each subsequent layer learns more abstract and complex representations based on the output of the previous layer.</p>
            </CardContent>
        </Card>
    );
};

export default DeepLearningSimulation;

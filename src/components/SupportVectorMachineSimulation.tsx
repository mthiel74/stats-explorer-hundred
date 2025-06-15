
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from 'recharts';
import { Swords } from 'lucide-react';

const generateSVMData = () => {
    const data = [];
    for (let i = 0; i < 50; i++) {
        data.push({ x: 1 + Math.random(), y: 1 + Math.random(), label: 0 });
        data.push({ x: 2.5 + Math.random(), y: 2.5 + Math.random(), label: 1 });
    }
    return data;
};

const SupportVectorMachineSimulation = () => {
    const [data] = useState(generateSVMData());
    const [showSVM, setShowSVM] = useState(false);

    const svmElements = useMemo(() => {
        if (!showSVM) return {};
        // The hyperplane should be exactly in the middle of the two classes.
        const hyperplane = [{x: 0, y: 4.5}, {x: 4.5, y: 0}];
        // The margins are the boundaries for each class.
        const margin1 = [{x: 0, y: 5}, {x: 5, y: 0}]; // Margin for class 1
        const margin2 = [{x: 0, y: 4}, {x: 4, y: 0}]; // Margin for class 0
        
        // Support vectors are the data points that are closest to the hyperplane.
        const supportVectors = data.filter(d => 
            (d.label === 0 && d.x + d.y > 3.8) || // Class 0 points near its margin
            (d.label === 1 && d.x + d.y < 5.2)    // Class 1 points near its margin
        );

        return { hyperplane, margin1, margin2, supportVectors };
    }, [showSVM, data]);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Swords /> The Guardian's Blade (SVM)</CardTitle>
                <CardDescription>
                    Support Vector Machines find the optimal boundary (hyperplane) that best separates data classes by maximizing the margin between them.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <div className="lg:col-span-1 space-y-4">
                    <Button onClick={() => setShowSVM(true)} className="w-full">Train SVM</Button>
                    <Button onClick={() => setShowSVM(false)} variant="secondary" className="w-full">Hide SVM</Button>
                 </div>
                <div className="lg:col-span-2 min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" domain={[0, 5]} />
                            <YAxis type="number" dataKey="y" domain={[0, 5]} />
                            <Tooltip cursor={{ strokeDasharray: '3 3' }}/>
                            <Scatter name="Class 0" data={data.filter(d => d.label === 0)} fill="hsl(var(--primary))" />
                            <Scatter name="Class 1" data={data.filter(d => d.label === 1)} fill="hsl(var(--destructive))" shape="cross" />

                            {showSVM && <Line data={svmElements.hyperplane} dataKey="y" stroke="black" strokeWidth={2} dot={false} legendType="none" />}
                            {showSVM && <Line data={svmElements.margin1} dataKey="y" stroke="gray" strokeDasharray="3 3" dot={false} legendType="none" />}
                            {showSVM && <Line data={svmElements.margin2} dataKey="y" stroke="gray" strokeDasharray="3 3" dot={false} legendType="none" />}
                             {showSVM && <Scatter name="Support Vectors" data={svmElements.supportVectors} fill="gold" shape="star" />}
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default SupportVectorMachineSimulation;


import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScatterChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Scatter } from 'recharts';
import { SquareArrowUp } from 'lucide-react';

const trueFunction = (x: number) => 1.5 * x - 2 + Math.sin(x * 2);
const generateData = () => Array.from({ length: 20 }, (_, i) => {
    const x = i / 2;
    return { x, y: trueFunction(x) + (Math.random() - 0.5) * 3 };
});

const initialModel = () => (x: number) => 3; // Start with the mean

const GradientBoostingSimulation = () => {
    const [data] = useState(generateData());
    const [step, setStep] = useState(0);

    const models = useMemo(() => {
        const baseModels = [initialModel()];
        let currentPredictions = data.map(p => baseModels[0](p.x));

        for (let i = 0; i < 5; i++) {
            const residuals = data.map((p, j) => p.y - currentPredictions[j]);
            const splitPoint = 5;
            const leftMean = residuals.filter((_,j) => data[j].x < splitPoint).reduce((a,b)=>a+b,0) / 10;
            const rightMean = residuals.filter((_,j) => data[j].x >= splitPoint).reduce((a,b)=>a+b,0) / 10;
            const learningRate = 0.5;
            
            const newTree = (x: number) => (x < splitPoint ? leftMean : rightMean) * learningRate;
            baseModels.push(newTree);
            
            currentPredictions = data.map((p, j) => currentPredictions[j] + newTree(p.x));
        }
        return baseModels;
    }, [data]);

    const chartData = useMemo(() => {
        let combinedPredictions = (x:number) => 0;
        for(let i = 0; i <= step; i++) {
            const currentModel = models[i];
            const oldCombined = combinedPredictions;
            combinedPredictions = (x:number) => oldCombined(x) + currentModel(x);
        }

        const residuals = data.map(p => ({ x: p.x, y: p.y - combinedPredictions(p.x) }));

        return {
            line: Array.from({ length: 101 }, (_, i) => {
                const x = i / 10;
                return { x, y: combinedPredictions(x) };
            }),
            residuals,
        };
    }, [step, models, data]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><SquareArrowUp /> Gradient Boosting</CardTitle>
                <CardDescription>
                    Gradient Boosting builds a strong model by sequentially adding weak learners, where each new learner corrects the errors of its predecessor.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center items-center gap-4 mb-4">
                    <Button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>Previous Step</Button>
                    <span className="text-sm text-muted-foreground">Step: {step} / {models.length - 1} (Models Combined: {step + 1})</span>
                    <Button onClick={() => setStep(s => Math.min(models.length - 1, s + 1))} disabled={step === models.length - 1}>Next Step</Button>
                </div>
                 <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" domain={[0, 10]}/>
                            <YAxis type="number" dataKey="y" domain={[-5, 15]}/>
                            <Tooltip />
                            <Legend />
                            <Scatter name="Original Data" data={data} fill="hsl(var(--primary))" />
                            <Line type="monotone" dataKey="y" data={chartData.line} stroke="hsl(var(--destructive))" name="Combined Model" strokeWidth={3} dot={false} />
                            {step < models.length -1 && <Scatter name="Residuals to be Corrected" data={chartData.residuals} fill="hsl(var(--muted-foreground))" shape="cross" />}
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
                <p className="text-center text-sm text-muted-foreground mt-2">
                    At each step, a new simple model is trained on the remaining errors (residuals).
                </p>
            </CardContent>
        </Card>
    );
};

export default GradientBoostingSimulation;

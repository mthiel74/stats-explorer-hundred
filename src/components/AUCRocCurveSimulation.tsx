
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { AreaChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, Dot } from 'recharts';
import { Wand2 } from 'lucide-react';

const generateScores = (count: number, mean: number, stdDev: number) => 
    Array.from({ length: count }, () => Math.max(0, Math.min(1, mean + stdDev * (Math.random() * 2 - 1))));

const AUCRocCurveSimulation = () => {
    const [separation, setSeparation] = useState(0.25); // from 0 to 0.5

    const { rocCurve, auc, thresholdPoint } = useMemo(() => {
        const positives = generateScores(100, 0.5 + separation, 0.15);
        const negatives = generateScores(100, 0.5 - separation, 0.15);

        const rocPoints = [];
        let bestThreshold = { tpr: 0, fpr: 0, threshold: 1 };
        let maxDist = 0;

        for (let i = 0; i <= 100; i++) {
            const threshold = i / 100;
            const tp = positives.filter(s => s >= threshold).length;
            const fp = negatives.filter(s => s >= threshold).length;
            const tn = negatives.filter(s => s < threshold).length;
            const fn = positives.filter(s => s < threshold).length;

            const tpr = tp / (tp + fn || 1);
            const fpr = fp / (fp + tn || 1);
            rocPoints.push({ threshold, tpr, fpr });
            
            // find point closest to (0,1)
            const dist = Math.sqrt(Math.pow(fpr, 2) + Math.pow(1 - tpr, 2));
            if (dist < maxDist || i === 0) {
                maxDist = dist;
                bestThreshold = { tpr, fpr, threshold };
            }
        }
        
        rocPoints.sort((a, b) => a.fpr - b.fpr);

        let area = 0;
        for (let i = 1; i < rocPoints.length; i++) {
            area += (rocPoints[i].fpr - rocPoints[i - 1].fpr) * (rocPoints[i].tpr + rocPoints[i - 1].tpr) / 2;
        }

        return { rocCurve: rocPoints, auc: area, thresholdPoint: bestThreshold };
    }, [separation]);

    const CustomDot = (props: any) => {
      const { cx, cy, payload } = props;
      if (payload.threshold === thresholdPoint.threshold) {
        return <Dot cx={cx} cy={cy} r={6} fill="hsl(var(--primary))" />;
      }
      return null;
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Wand2 /> AUC-ROC Curve</CardTitle>
                <CardDescription>Visualizing a model's ability to distinguish between classes.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="lg:grid lg:grid-cols-3 gap-6">
                    <div className="space-y-6">
                        <div className="p-4 border rounded-lg">
                            <Label htmlFor="separation-slider">Model Discrimination Power</Label>
                            <Slider id="separation-slider" value={[separation]} onValueChange={(v) => setSeparation(v[0])} min={0.05} max={0.45} step={0.01} />
                            <p className="text-xs text-muted-foreground mt-2">Controls how well the model separates positive and negative classes.</p>
                        </div>
                        <Card className="text-center">
                            <CardHeader>
                                <CardTitle>AUC Score</CardTitle>
                                <CardDescription className="text-4xl font-bold text-primary">{auc.toFixed(3)}</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                    <div className="lg:col-span-2 min-h-[400px] mt-6 lg:mt-0">
                         <ResponsiveContainer width="100%" height={400}>
                            <AreaChart data={rocCurve} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="fpr" name="False Positive Rate" label={{ value: 'False Positive Rate (FPR)', position: 'bottom' }} domain={[0, 1]} />
                                <YAxis type="number" dataKey="tpr" name="True Positive Rate" label={{ value: 'True Positive Rate (TPR)', angle: -90, position: 'insideLeft' }} domain={[0, 1]}/>
                                <Tooltip formatter={(value: number) => value.toFixed(3)} />
                                <Legend />
                                <Area type="monotone" dataKey="tpr" stroke="hsl(var(--primary))" fill="hsl(var(--primary) / 0.2)" name="ROC Curve" dot={<CustomDot />} />
                                <Line type="monotone" dataKey="random" strokeDasharray="5 5" stroke="#888" name="Random Chance" dot={false} data={[{fpr:0, random:0}, {fpr:1, random:1}]} />
                                <ReferenceLine x={thresholdPoint.fpr} y={thresholdPoint.tpr} stroke="hsl(var(--primary))">
                                    <Label value={`Best Threshold: ${thresholdPoint.threshold.toFixed(2)}`} position="insideTopLeft" />
                                </ReferenceLine>
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default AUCRocCurveSimulation;

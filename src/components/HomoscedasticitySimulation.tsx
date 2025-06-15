
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Label } from 'recharts';
import { Switch } from '@/components/ui/switch';
import { Label as SwitchLabel } from '@/components/ui/label';


const HomoscedasticitySimulation = () => {
    const [isHeteroscedastic, setIsHeteroscedastic] = useState(false);
    const [data, setData] = useState<{x:number, y:number, resid: number}[]>([]);

    const generateData = (heteroscedastic: boolean) => {
        const n = 100;
        const b0 = 5, b1 = 2;
        const newData = Array.from({ length: n }, () => {
            const x = Math.random() * 10;
            const error_std = heteroscedastic ? 0.5 * x : 3;
            const error = (Math.random() - 0.5) * 2 * error_std;
            const y = b0 + b1 * x + error;
            return { x, y };
        });

        // Simplified regression to get residuals
        const meanX = newData.reduce((a,b) => a+b.x, 0) / n;
        const meanY = newData.reduce((a,b) => a+b.y, 0) / n;
        const slope = newData.reduce((num, p) => num + (p.x-meanX)*(p.y-meanY), 0) / newData.reduce((den, p) => den + (p.x-meanX)**2, 0);
        const intercept = meanY - slope*meanX;
        
        const dataWithResid = newData.map(p => ({...p, resid: p.y - (intercept + slope * p.x)}));
        setData(dataWithResid);
    };

    React.useEffect(() => {
        generateData(isHeteroscedastic);
    }, [isHeteroscedastic]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Homoscedasticity vs. Heteroscedasticity</CardTitle>
                <CardDescription>
                    Examine how the variance of errors changes across predictor values. Check the residual plot for patterns.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center space-x-2 mb-4">
                    <SwitchLabel htmlFor="variance-switch">Homoscedastic (constant variance)</SwitchLabel>
                    <Switch id="variance-switch" checked={isHeteroscedastic} onCheckedChange={setIsHeteroscedastic} />
                    <SwitchLabel htmlFor="variance-switch">Heteroscedastic (non-constant variance)</SwitchLabel>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="text-center font-semibold mb-2">Data Scatter Plot</h3>
                         <ResponsiveContainer width="100%" height={300}>
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid />
                                <XAxis type="number" dataKey="x" name="Predictor (X)" />
                                <YAxis type="number" dataKey="y" name="Response (Y)" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Scatter name="Data" data={data} fill="hsl(var(--primary))" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                     <div>
                        <h3 className="text-center font-semibold mb-2">Residual vs. Predictor Plot</h3>
                        <ResponsiveContainer width="100%" height={300}>
                             <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid />
                                <XAxis type="number" dataKey="x" name="Predictor (X)" />
                                <YAxis type="number" dataKey="resid" name="Residual" domain={[-15, 15]}/>
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <ReferenceLine y={0} stroke="red" strokeDasharray="3 3" />
                                <Scatter name="Residuals" data={data} fill="hsl(var(--destructive))" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="mt-4 p-4 bg-muted rounded-lg text-center">
                    <p className="font-semibold">{isHeteroscedastic ? "Heteroscedasticity Detected" : "Homoscedasticity Assumed"}</p>
                    <p className="text-sm text-muted-foreground">
                        {isHeteroscedastic 
                            ? "Notice the fanning-out pattern (a cone shape) in the residual plot. The variance of the errors increases as X increases."
                            : "The residual plot shows no clear pattern. The points are randomly scattered around zero, which is what we want."}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default HomoscedasticitySimulation;

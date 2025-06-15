
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, ZAxis, Tooltip } from 'recharts';

const generateIVData = (n=100) => {
    return Array.from({ length: n }, () => {
        const u = (Math.random() - 0.5) * 10; // Unobserved confounder
        const z = Math.random() < 0.5 ? 0 : 1; // Instrument (e.g., random encouragement)
        const x = 5 + 10 * z + 2 * u + Math.random(); // Treatment (e.g., training hours)
        const y = 20 + 2 * x + 5 * u + Math.random(); // Outcome (e.g., test score)
        return { x, y, z, u };
    });
};

// Simplified OLS and 2SLS calculations
const calculateSlopes = (data: {x:number, y:number, z:number}[]) => {
    const mean = (arr: number[]) => arr.reduce((a,b)=> a+b, 0) / arr.length;
    const xs = data.map(d => d.x);
    const ys = data.map(d => d.y);
    const zs = data.map(d => d.z);
    const meanX = mean(xs);
    const meanY = mean(ys);
    const meanZ = mean(zs);
    
    // OLS: Y ~ X
    let ols_num = 0, ols_den = 0;
    for(let i=0; i<data.length; i++) {
        ols_num += (xs[i] - meanX) * (ys[i] - meanY);
        ols_den += (xs[i] - meanX)**2;
    }
    const ols_slope = ols_den !== 0 ? ols_num / ols_den : 0;
    
    // 2SLS: 1st stage (X ~ Z), 2nd stage (Y ~ X_hat)
    let s1_num=0, s1_den=0;
    for(let i=0; i<data.length; i++) {
        s1_num += (zs[i] - meanZ) * (xs[i] - meanX);
        s1_den += (zs[i] - meanZ)**2;
    }
    const s1_slope = s1_den !== 0 ? s1_num / s1_den : 0;
    const s1_intercept = meanX - s1_slope * meanZ;
    const x_hats = zs.map(z => s1_intercept + s1_slope * z);
    const meanX_hat = mean(x_hats);
    
    let s2_num=0, s2_den=0;
    for(let i=0; i<data.length; i++) {
        s2_num += (x_hats[i] - meanX_hat) * (ys[i] - meanY);
        s2_den += (x_hats[i] - meanX_hat)**2;
    }
    const iv_slope = s2_den !== 0 ? s2_num / s2_den : 0;

    return { ols_slope, iv_slope };
};

const InstrumentalVariableSimulation = () => {
    const [data, setData] = useState(generateIVData());
    const { ols_slope, iv_slope } = useMemo(() => calculateSlopes(data), [data]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Instrumental Variable (IV)</CardTitle>
                <CardDescription>
                    IV is used to estimate causal effects when a treatment is confounded. An "instrument" affects the treatment but not the outcome directly.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => setData(generateIVData())} className="mb-4">Generate New Data</Button>
                <p className="text-sm text-muted-foreground mb-4">Here, an unobserved confounder (e.g., 'motivation') affects both treatment and outcome. A valid instrument (e.g., 'random encouragement') allows us to isolate the true treatment effect (which is 2.0).</p>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="p-4 bg-muted rounded-lg text-center">
                        <h4 className="font-semibold">Naive OLS Slope (Biased)</h4>
                        <p className="text-2xl font-bold">{ols_slope.toFixed(3)}</p>
                    </div>
                    <div className="p-4 bg-primary/10 rounded-lg text-center">
                        <h4 className="font-semibold">IV Slope (Unbiased)</h4>
                        <p className="text-2xl font-bold text-primary">{iv_slope.toFixed(3)}</p>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 className="text-center font-semibold text-sm mb-2">Relationship: X vs Y</h4>
                        <ResponsiveContainer width="100%" height={250}>
                             <ScatterChart>
                                <XAxis type="number" dataKey="x" name="Treatment" />
                                <YAxis type="number" dataKey="y" name="Outcome" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }}/>
                                <Scatter data={data} fill="#8884d8" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                    <div>
                        <h4 className="text-center font-semibold text-sm mb-2">Instrument (Z) vs Treatment (X)</h4>
                        <ResponsiveContainer width="100%" height={250}>
                             <ScatterChart>
                                <XAxis type="number" dataKey="z" name="Instrument" />
                                <YAxis type="number" dataKey="x" name="Treatment" />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }}/>
                                <Scatter data={data} fill="#82ca9d" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default InstrumentalVariableSimulation;

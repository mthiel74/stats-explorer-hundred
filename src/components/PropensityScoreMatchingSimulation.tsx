
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// Generate confounded data
const generateConfoundedData = (n=100) => {
    return Array.from({ length: n }, () => {
        const age = Math.random() * 50 + 20; // 20 to 70
        // Older people more likely to get treatment
        const treatmentProb = 0.2 + (age / 100);
        const treatment = Math.random() < treatmentProb ? 1 : 0;
        const outcome = 10 + 0.5 * age + (treatment * 10) + (Math.random() - 0.5) * 10;
        // Simplified "propensity score" is just the probability
        const pscore = treatmentProb;
        return { age, treatment, outcome, pscore };
    });
};

const PropensityScoreMatchingSimulation = () => {
    const [data, setData] = useState(generateConfoundedData());

    const { treated, control, diffBefore, diffAfter } = useMemo(() => {
        const treated = data.filter(d => d.treatment === 1);
        const control = data.filter(d => d.treatment === 0);
        
        const meanAge = (arr: any[]) => arr.reduce((sum, d) => sum + d.age, 0) / arr.length;
        const diffBefore = meanAge(treated) - meanAge(control);

        // Simple 1-to-1 nearest neighbor matching on pscore
        const matchedControl = treated.map(t_unit => {
            let bestMatch: any = null;
            let minDiff = Infinity;
            control.forEach(c_unit => {
                const diff = Math.abs(t_unit.pscore - c_unit.pscore);
                if (diff < minDiff) {
                    minDiff = diff;
                    bestMatch = c_unit;
                }
            });
            return bestMatch;
        }).filter(d => d != null); // remove nulls if control is smaller

        const diffAfter = meanAge(treated) - meanAge(matchedControl);
        
        return { treated, control: matchedControl, diffBefore, diffAfter };
    }, [data]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Propensity Score Matching</CardTitle>
                <CardDescription>
                    A method to reduce selection bias in observational studies by matching subjects with similar likelihoods (propensity scores) of receiving treatment.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => setData(generateConfoundedData())} className="mb-4">Generate New Data</Button>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                        <p className="text-sm text-muted-foreground mb-4">Here, older individuals are more likely to receive treatment, confounding the relationship between treatment and outcome. Matching on propensity scores helps balance the age distribution between groups.</p>
                        <div className="p-4 bg-muted rounded-lg space-y-2">
                             <h4 className="font-semibold">Average Age Difference (Treated - Control)</h4>
                             <p>Before Matching: <span className="font-bold">{diffBefore.toFixed(2)} years</span></p>
                             <p>After Matching: <span className="font-bold text-primary">{diffAfter.toFixed(2)} years</span></p>
                        </div>
                    </div>
                     <div>
                        <ResponsiveContainer width="100%" height={300}>
                            <ScatterChart>
                                <XAxis type="number" dataKey="age" name="Age" />
                                <YAxis type="number" dataKey="treatment" name="Group" domain={[-0.5, 1.5]} ticks={[0, 1]} tickFormatter={(val) => val === 1 ? 'Treated' : 'Control'} />
                                <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                                <Legend />
                                <Scatter name="Treated" data={treated} fill="#8884d8" />
                                <Scatter name="Matched Control" data={control} fill="#82ca9d" />
                            </ScatterChart>
                        </ResponsiveContainer>
                        <p className="text-center text-sm text-muted-foreground mt-2">Age distribution of groups after matching.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PropensityScoreMatchingSimulation;

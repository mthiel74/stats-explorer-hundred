
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, ReferenceLine } from 'recharts';

const generateDiDData = () => {
    const control_pre = 20 + Math.random() * 5;
    const control_post = control_pre + 5 + Math.random() * 5; // general trend
    const treatment_pre = 20 + Math.random() * 5;
    const treatment_effect = 10 + Math.random() * 5;
    const treatment_post = treatment_pre + 5 + treatment_effect + Math.random() * 5;
    
    return [
        { period: 'Before', control: control_pre, treatment: treatment_pre },
        { period: 'After', control: control_post, treatment: treatment_post, counterfactual: treatment_pre + (control_post - control_pre) },
    ];
};

const DifferenceInDifferencesSimulation = () => {
    const [data, setData] = useState(generateDiDData());
    const did_estimate = (data[1].treatment - data[1].control) - (data[0].treatment - data[0].control);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Difference-in-Differences (DiD)</CardTitle>
                <CardDescription>
                    Estimates the effect of a specific intervention by comparing the change in outcomes over time between a treatment group and a control group.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div>
                        <Button onClick={() => setData(generateDiDData())} className="mb-4">Generate New Data</Button>
                        <p className="text-sm text-muted-foreground mb-4">DiD assumes "parallel trends" - that the treatment group would have followed the same trend as the control group without the treatment. The DiD estimate is the difference between the actual outcome and this counterfactual.</p>
                        <div className="p-4 bg-muted rounded-lg text-center">
                            <h4 className="font-semibold">DiD Estimated Treatment Effect</h4>
                            <p className="text-2xl font-bold text-primary">{did_estimate.toFixed(2)}</p>
                        </div>
                    </div>
                    <div>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="period" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="control" name="Control Group" stroke="#8884d8" strokeWidth={2} />
                                <Line type="monotone" dataKey="treatment" name="Treatment Group" stroke="#82ca9d" strokeWidth={2} />
                                <Line type="monotone" dataKey="counterfactual" name="Counterfactual" stroke="#82ca9d" strokeDasharray="5 5" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default DifferenceInDifferencesSimulation;

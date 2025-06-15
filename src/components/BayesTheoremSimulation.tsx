
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { BrainCircuit } from 'lucide-react';

const BayesTheoremSimulation = () => {
    // P(D) - Prior probability of disease
    const [prior, setPrior] = useState(1); // 1%
    // P(T+|D) - Sensitivity of the test
    const [sensitivity, setSensitivity] = useState(99); // 99%
    // P(T-|~D) - Specificity of the test
    const [specificity, setSpecificity] = useState(95); // 95%

    const bayesResult = useMemo(() => {
        const p_d = prior / 100;
        const p_not_d = 1 - p_d;
        const p_t_plus_given_d = sensitivity / 100; // True Positive Rate
        const p_t_plus_given_not_d = 1 - (specificity / 100); // False Positive Rate

        const p_t_plus = (p_t_plus_given_d * p_d) + (p_t_plus_given_not_d * p_not_d);
        const p_d_given_t_plus = (p_t_plus_given_d * p_d) / p_t_plus;

        return isNaN(p_d_given_t_plus) ? 0 : p_d_given_t_plus * 100;
    }, [prior, sensitivity, specificity]);
    
    const renderExplanation = (value: number, type: 'prior' | 'sensitivity' | 'specificity') => {
        if (type === 'prior') return `The probability a random person has the disease is ${value}%.`;
        if (type === 'sensitivity') return `If a person has the disease, the test is positive ${value}% of the time.`;
        if (type === 'specificity') return `If a person does NOT have the disease, the test is negative ${value}% of the time.`;
        return '';
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BrainCircuit /> Bayes' Theorem in Action</CardTitle>
                <CardDescription>
                    Explore how prior beliefs are updated with new evidence. This example uses a common medical diagnosis scenario.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <Label htmlFor="prior" className="text-lg">Prior Probability (Prevalence)</Label>
                        <p className="text-sm text-muted-foreground">{renderExplanation(prior, 'prior')}</p>
                        <div className="flex items-center gap-4 mt-2">
                           <Slider id="prior" value={[prior]} onValueChange={([val]) => setPrior(val)} min={0.1} max={50} step={0.1} />
                           <span className="font-bold w-16 text-right">{prior.toFixed(1)}%</span>
                        </div>
                    </div>
                     <div>
                        <Label htmlFor="sensitivity" className="text-lg">Test Sensitivity</Label>
                        <p className="text-sm text-muted-foreground">{renderExplanation(sensitivity, 'sensitivity')}</p>
                        <div className="flex items-center gap-4 mt-2">
                           <Slider id="sensitivity" value={[sensitivity]} onValueChange={([val]) => setSensitivity(val)} min={50} max={100} step={1} />
                           <span className="font-bold w-16 text-right">{sensitivity}%</span>
                        </div>
                    </div>
                     <div>
                        <Label htmlFor="specificity" className="text-lg">Test Specificity</Label>
                        <p className="text-sm text-muted-foreground">{renderExplanation(specificity, 'specificity')}</p>
                        <div className="flex items-center gap-4 mt-2">
                           <Slider id="specificity" value={[specificity]} onValueChange={([val]) => setSpecificity(val)} min={50} max={100} step={1} />
                           <span className="font-bold w-16 text-right">{specificity}%</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center">
                    <Card className="w-full text-center p-6 bg-muted">
                        <CardDescription className="text-lg">Given a positive test result, the probability you actually have the disease is:</CardDescription>
                        <p className="text-5xl font-extrabold text-primary my-4">{bayesResult.toFixed(2)}%</p>
                        <p className="text-muted-foreground">Notice how even with a highly accurate test, a low prevalence can lead to a surprising result.</p>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
};

export default BayesTheoremSimulation;

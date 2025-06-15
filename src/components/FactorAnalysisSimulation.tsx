
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Brain, BookOpen } from 'lucide-react';

const factorData = [
    { skill: 'Algebra', math: 0.85, verbal: 0.1 },
    { skill: 'Geometry', math: 0.78, verbal: 0.15 },
    { skill: 'Calculus', math: 0.9, verbal: 0.05 },
    { skill: 'Vocabulary', math: 0.08, verbal: 0.88 },
    { skill: 'Reading', math: 0.12, verbal: 0.82 },
    { skill: 'Grammar', math: 0.1, verbal: 0.75 },
];

const FactorAnalysisSimulation = () => {
    const [showFactors, setShowFactors] = useState(false);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">The Alchemist's Essence (Factor Analysis)</CardTitle>
                <CardDescription>
                    Factor Analysis seeks to find underlying latent variables (factors) that explain the correlations among observed variables.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="text-center">
                    <Button onClick={() => setShowFactors(!showFactors)}>
                        {showFactors ? "Hide Factors" : "Reveal Underlying Factors"}
                    </Button>
                </div>
                
                {showFactors && (
                    <div className="grid md:grid-cols-2 gap-8 animate-fade-in pt-4">
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-center flex items-center justify-center gap-2"><Brain /> Mathematical Ability</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={factorData} layout="vertical" margin={{ left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" domain={[0, 1]} />
                                    <YAxis type="category" dataKey="skill" width={80} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="math" name="Loading on Math Factor" fill="hsl(var(--primary))" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                         <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-center flex items-center justify-center gap-2"><BookOpen /> Verbal Ability</h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={factorData} layout="vertical" margin={{ left: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis type="number" domain={[0, 1]} />
                                    <YAxis type="category" dataKey="skill" width={80} />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="verbal" name="Loading on Verbal Factor" fill="hsl(var(--secondary))" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
                <p className="text-sm text-muted-foreground pt-4">
                    Here, we have six observed skills. After running factor analysis, we discover two latent factors. The "loadings" show how much each skill is related to a factor. We can infer that the first factor represents 'Mathematical Ability' and the second represents 'Verbal Ability'. This reduces six variables to two underlying concepts.
                </p>
            </CardContent>
        </Card>
    );
};

export default FactorAnalysisSimulation;

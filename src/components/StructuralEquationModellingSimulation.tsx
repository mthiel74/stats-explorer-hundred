
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

const SEMComponent = ({ type, label }: { type: 'latent' | 'observed', label: string }) => {
    const baseClasses = "w-24 h-16 flex items-center justify-center text-center p-2 border-2";
    const typeClasses = type === 'latent' ? "rounded-full border-blue-500 bg-blue-100" : "rounded-md border-green-500 bg-green-100";
    return <div className={`${baseClasses} ${typeClasses}`}>{label}</div>;
};

const StructuralEquationModellingSimulation = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Structural Equation Modelling (SEM)</CardTitle>
                <CardDescription>
                    A powerful multivariate statistical technique for testing and estimating causal relationships using a combination of statistical data and qualitative causal assumptions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <p className="text-sm text-muted-foreground mb-6">
                    SEM models relationships between latent variables (unobserved concepts, in circles) and observed variables (measured data, in squares). The diagram below shows a hypothetical model where 'Work Environment' influences 'Job Satisfaction', which in turn affects 'Employee Loyalty'.
                </p>
                <div className="flex justify-center items-center space-x-8 p-8 bg-muted rounded-lg overflow-x-auto">
                    {/* Latent 1 */}
                    <div className="flex flex-col items-center space-y-4">
                        <SEMComponent type="observed" label="Management Support" />
                        <ArrowRight className="h-8 w-8 rotate-90" />
                        <SEMComponent type="latent" label="Work Environment" />
                        <ArrowRight className="h-8 w-8 -rotate-90" />
                        <SEMComponent type="observed" label="Peer Relations" />
                    </div>

                    <ArrowRight className="h-12 w-12 shrink-0" />

                    {/* Latent 2 */}
                    <div className="flex flex-col items-center space-y-4">
                        <SEMComponent type="observed" label="Pay Satisfaction" />
                        <ArrowRight className="h-8 w-8 rotate-90" />
                        <SEMComponent type="latent" label="Job Satisfaction" />
                        <ArrowRight className="h-8 w-8 -rotate-90" />
                        <SEMComponent type="observed" label="Work-Life Balance" />
                    </div>
                    
                    <ArrowRight className="h-12 w-12 shrink-0" />

                    {/* Latent 3 */}
                    <div className="flex flex-col items-center space-y-4">
                        <SEMComponent type="observed" label="Intent to Stay" />
                        <ArrowRight className="h-8 w-8 rotate-90" />
                        <SEMComponent type="latent" label="Employee Loyalty" />
                        <ArrowRight className="h-8 w-8 -rotate-90" />
                        <SEMComponent type="observed" label="Organizational Commitment" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default StructuralEquationModellingSimulation;

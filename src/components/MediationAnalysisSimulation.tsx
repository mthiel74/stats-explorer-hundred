
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const MediationAnalysisSimulation = () => {
    const [coeffs, setCoeffs] = useState(generateCoeffs());

    function generateCoeffs() {
        const a = Math.random() * 0.8 + 0.1; // X -> M
        const b = Math.random() * 0.8 + 0.1; // M -> Y
        const c_prime = Math.random() * 0.3; // X -> Y (direct)
        return { a, b, c_prime };
    }

    const total_effect = coeffs.c_prime + coeffs.a * coeffs.b;
    const indirect_effect = coeffs.a * coeffs.b;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Mediation Analysis</CardTitle>
                <CardDescription>
                    Explores the process through which an independent variable (X) influences a dependent variable (Y) via a third variable (M, the mediator).
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => setCoeffs(generateCoeffs())} className="mb-6">Generate New Coefficients</Button>
                
                <div className="flex flex-col items-center space-y-4">
                    {/* Diagram */}
                    <div className="relative flex items-center justify-center w-full max-w-lg">
                        <div className="p-4 border rounded-lg bg-secondary">X</div>
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 flex flex-col items-center">
                            <span className="text-sm">a = {coeffs.a.toFixed(2)}</span>
                            <ArrowRight className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-6 flex flex-col items-center">
                            <ArrowRight className="h-10 w-10 text-muted-foreground" />
                            <span className="text-sm">b = {coeffs.b.toFixed(2)}</span>
                        </div>
                        <div className="p-4 border rounded-lg bg-secondary mx-20">M (Mediator)</div>
                         <div className="p-4 border rounded-lg bg-secondary">Y</div>
                    </div>
                     <div className="relative flex items-center justify-center w-full max-w-lg mt-8">
                        <div className="p-4 border rounded-lg bg-secondary opacity-0">X</div>
                         <div className="flex-grow h-px bg-muted-foreground relative mx-4">
                            <span className="absolute left-1/2 -translate-x-1/2 -top-6">c' = {coeffs.c_prime.toFixed(2)} (Direct Effect)</span>
                         </div>
                         <div className="p-4 border rounded-lg bg-secondary opacity-0">Y</div>
                     </div>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold">Direct Effect (c')</h4>
                        <p className="text-xl font-bold text-primary">{coeffs.c_prime.toFixed(3)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold">Indirect Effect (a*b)</h4>
                        <p className="text-xl font-bold text-primary">{indirect_effect.toFixed(3)}</p>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                        <h4 className="font-semibold">Total Effect (c' + a*b)</h4>
                        <p className="text-xl font-bold text-primary">{total_effect.toFixed(3)}</p>
                    </div>
                </div>
                 <p className="mt-4 text-sm text-muted-foreground text-center">The total effect of X on Y is composed of its direct effect and its indirect effect through the mediator M.</p>
            </CardContent>
        </Card>
    );
};

export default MediationAnalysisSimulation;

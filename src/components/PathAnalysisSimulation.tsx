
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const PathAnalysisSimulation = () => {
    const [coeffs, setCoeffs] = useState(generateCoeffs());

    function generateCoeffs() {
        return {
            x1_y1: Math.random() * 0.6 + 0.1,
            x2_y1: Math.random() * 0.6 - 0.3,
            x1_y2: Math.random() * 0.4,
            y1_y2: Math.random() * 0.7 + 0.2,
        };
    }

    const Path = ({ value, className }: { value: number, className?: string}) => (
        <div className={`absolute flex flex-col items-center text-sm ${className}`}>
            <span>{value.toFixed(2)}</span>
            <ArrowRight className="h-10 w-10 text-muted-foreground" />
        </div>
    );
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Path Analysis</CardTitle>
                <CardDescription>
                    A subset of SEM used to evaluate causal models by examining the relationships between a set of observed variables.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => setCoeffs(generateCoeffs())} className="mb-6">Generate New Path Coefficients</Button>
                <p className="text-sm text-muted-foreground mb-6">
                    The diagram shows a model where X1 and X2 predict Y1, and X1 and Y1 predict Y2. The numbers on the arrows are standardized path coefficients, indicating the strength and direction of the relationships.
                </p>
                <div className="relative flex items-center justify-around h-64 p-4 bg-muted rounded-lg">
                    {/* Variables */}
                    <div className="flex flex-col space-y-16">
                         <div className="p-4 border rounded-lg bg-secondary">X1</div>
                         <div className="p-4 border rounded-lg bg-secondary">X2</div>
                    </div>
                    <div className="p-4 border rounded-lg bg-secondary">Y1</div>
                    <div className="p-4 border rounded-lg bg-secondary">Y2</div>

                    {/* Paths */}
                    <Path value={coeffs.x1_y1} className="left-[14%] top-[28%]" />
                    <Path value={coeffs.x2_y1} className="left-[14%] top-[58%]" />
                    <Path value={coeffs.y1_y2} className="left-[48%] top-[43%]" />

                    {/* Long Path from X1 to Y2 */}
                    <div className="absolute left-[14%] top-[43%] w-[60%] h-px bg-muted-foreground">
                       <span className="absolute left-1/2 -translate-x-1/2 -top-6 text-sm">{coeffs.x1_y2.toFixed(2)}</span>
                       <ArrowRight className="h-10 w-10 text-muted-foreground absolute -right-5 -top-5" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PathAnalysisSimulation;

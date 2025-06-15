
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Server, Combine, Filter } from 'lucide-react';

type Stage = 'idle' | 'extract' | 'transform' | 'load' | 'done';

const ETLSimulation = () => {
    const [stage, setStage] = useState<Stage>('idle');
    const dataCount = 5;

    useEffect(() => {
        if (stage === 'extract') {
            setTimeout(() => setStage('transform'), 2000);
        } else if (stage === 'transform') {
            setTimeout(() => setStage('load'), 2000);
        } else if (stage === 'load') {
            setTimeout(() => setStage('done'), 2000);
        }
    }, [stage]);

    const runETL = () => {
        if (stage === 'idle' || stage === 'done') {
            setStage('extract');
        }
    };
    
    const resetETL = () => {
        setStage('idle');
    };

    const getStageDescription = () => {
        switch(stage) {
            case 'idle': return 'Ready to start.';
            case 'extract': return '1. Extracting data from source database...';
            case 'transform': return '2. Transforming data: cleaning and aggregating...';
            case 'load': return '3. Loading transformed data into data warehouse...';
            case 'done': return 'Process complete! Data is ready for analysis.';
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>ETL Process Simulation</CardTitle>
                <CardDescription>Visualizing the Extract, Transform, Load pipeline.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-center items-center gap-4 mb-8">
                    <Button onClick={runETL} disabled={stage !== 'idle' && stage !== 'done'}>
                        Run ETL Process
                    </Button>
                    <Button onClick={resetETL} variant="outline" disabled={stage === 'idle'}>
                        Reset
                    </Button>
                </div>

                <div className="grid grid-cols-3 items-center text-center relative h-48">
                    {/* Source */}
                    <div className="flex flex-col items-center">
                        <Database className="w-16 h-16 text-blue-500" />
                        <h3 className="font-semibold mt-2">Source Database</h3>
                    </div>

                    {/* Transform */}
                    <div className="flex flex-col items-center">
                         <div className="flex gap-2">
                             <Combine className="w-12 h-12 text-yellow-500" />
                             <Filter className="w-12 h-12 text-yellow-500" />
                         </div>
                        <h3 className="font-semibold mt-2">Transform</h3>
                    </div>

                    {/* Destination */}
                    <div className="flex flex-col items-center">
                        <Server className="w-16 h-16 text-green-500" />
                        <h3 className="font-semibold mt-2">Data Warehouse</h3>
                    </div>

                    {/* Animated data packets */}
                    {Array.from({length: dataCount}).map((_, i) => (
                        <div key={i}
                             className={`absolute w-4 h-4 bg-primary rounded-full transition-all duration-1000 ease-in-out`}
                             style={{ 
                                 left: stage === 'extract' || stage === 'idle' ? '15%' : stage === 'transform' ? '49%' : stage === 'load' || stage === 'done' ? '82%' : '15%',
                                 top: `${20 + i*12}%`,
                                 transitionDelay: `${i*100}ms`,
                                 transform: stage === 'transform' ? 'scale(1.5)' : 'scale(1)',
                                 backgroundColor: stage === 'transform' ? 'hsl(var(--destructive))' : 'hsl(var(--primary))'
                             }}>
                        </div>
                    ))}
                </div>

                 <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Process Status</CardTitle>
                        <CardDescription>{getStageDescription()}</CardDescription>
                    </CardHeader>
                </Card>

            </CardContent>
        </Card>
    );
};

export default ETLSimulation;

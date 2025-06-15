
import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { Footprints } from 'lucide-react';

type Sample = { x: number; y: number };

// Bimodal distribution for our yeti to wander in
const targetPDF = (x: number, y: number): number => {
    const term1 = Math.exp(-0.5 * (((x - 2)*(x - 2)) / 1 + ((y - 2)*(y-2)) / 1));
    const term2 = Math.exp(-0.5 * (((x + 2)*(x + 2)) / 1 + ((y + 2)*(y+2)) / 1));
    return term1 + term2;
};

const MCMCSimulation = () => {
    const [samples, setSamples] = useState<Sample[]>([]);
    const [steps, setSteps] = useState(1000);
    const [isSimulating, setIsSimulating] = useState(false);

    const runSimulation = useCallback(() => {
        setIsSimulating(true);
        setTimeout(() => {
            let currentPos = { x: 0, y: 0 };
            if (samples.length > 0) {
                currentPos = samples[samples.length - 1];
            }
            
            const newSamples: Sample[] = [];
            const proposalStdDev = 1.0;

            for (let i = 0; i < steps; i++) {
                // Propose new step using Box-Muller transform
                const u1 = Math.random();
                const u2 = Math.random();
                const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
                const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
                const proposal = {
                    x: currentPos.x + z0 * proposalStdDev,
                    y: currentPos.y + z1 * proposalStdDev,
                };

                // Calculate acceptance probability
                const pCurrent = targetPDF(currentPos.x, currentPos.y);
                const pProposal = targetPDF(proposal.x, proposal.y);
                const acceptanceProb = pCurrent > 0 ? Math.min(1, pProposal / pCurrent) : 1;

                // Accept or reject
                if (Math.random() < acceptanceProb) {
                    currentPos = proposal;
                }
                newSamples.push(currentPos);
            }

            setSamples(prev => [...prev, ...newSamples].slice(-5000)); // Keep last 5000 samples
            setIsSimulating(false);
        }, 10)
    }, [steps, samples]);

    const reset = () => {
        setSamples([]);
    }

    return (
        <Card className="overflow-hidden">
            <CardContent className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2"><Footprints /> Yeti Tracker (MCMC)</CardTitle>
                                <CardDescription>
                                    We can't see the Yeti, but we know where it likes to hang out (target distribution). We can track its footprints (samples) to map its territory.
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        <div className="space-y-4">
                            <label className="block font-medium">Footsteps to Track (Steps): <span className="text-primary font-bold">{steps}</span></label>
                            <Slider value={[steps]} onValueChange={v => setSteps(v[0])} min={100} max={5000} step={100} />
                        </div>
                        <Button onClick={runSimulation} disabled={isSimulating} className="w-full">
                            {isSimulating ? 'Tracking...' : 'Track Footsteps'}
                        </Button>
                        <Button variant="outline" onClick={reset} className="w-full">Clear Map</Button>
                    </div>
                    <div className="lg:col-span-2 min-h-[500px] space-y-4">
                        <h3 className="text-lg font-semibold mb-2 text-center">Yeti's Territory Map</h3>
                        <ResponsiveContainer width="100%" height={400}>
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid />
                                <XAxis type="number" dataKey="x" name="East-West" domain={[-6, 6]} />
                                <YAxis type="number" dataKey="y" name="North-South" domain={[-6, 6]} />
                                <Scatter data={samples} fill="hsl(var(--primary))" shape="circle" fillOpacity={0.3} stroke="none" />
                            </ScatterChart>
                        </ResponsiveContainer>
                        <Card>
                            <CardContent className="text-center pt-6">
                                <p className="text-sm text-muted-foreground">Total Footprints Tracked</p>
                                <p className="text-2xl font-bold">{samples.length}</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default MCMCSimulation;

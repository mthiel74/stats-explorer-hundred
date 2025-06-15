
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CloudRain, Sprinkler, Leaf, Check, X } from 'lucide-react';

type Evidence = 'true' | 'false' | 'unknown';

const BayesianNetworkSimulation = () => {
    const [rain, setRain] = useState<Evidence>('unknown');
    const [sprinkler, setSprinkler] = useState<Evidence>('unknown');

    const p_rain = 0.2; // P(R=true)
    const p_sprinkler_given_rain = 0.01; // P(S=true | R=true)
    const p_sprinkler_given_not_rain = 0.4; // P(S=true | R=false)

    // P(W=true | R, S)
    const p_wet_given_rs_table: Record<string, number> = {
        'true,true': 0.99,
        'true,false': 0.8,
        'false,true': 0.9,
        'false,false': 0.0,
    };

    const posterior = useMemo(() => {
        // This is a simplified calculation for demonstration
        if (rain !== 'unknown' && sprinkler !== 'unknown') {
            return { p_wet_grass: p_wet_given_rs_table[`${rain},${sprinkler}`] };
        }
        
        let p_wet_grass = 0;
        const rain_states = rain === 'unknown' ? [true, false] : [rain === 'true'];
        const sprinkler_states = sprinkler === 'unknown' ? [true, false] : [sprinkler === 'true'];

        for (const r of rain_states) {
            const p_r = r ? p_rain : 1 - p_rain;
            for (const s of sprinkler_states) {
                const p_s_given_r = r ? (s ? p_sprinkler_given_rain : 1 - p_sprinkler_given_rain) : (s ? p_sprinkler_given_not_rain : 1 - p_sprinkler_given_not_rain);
                const p_joint_rs = p_s_given_r * p_r;
                p_wet_grass += p_wet_given_rs_table[`${r},${s}`] * p_joint_rs;
            }
        }
        
        let normalizer = 1;
        if(rain !== 'unknown' || sprinkler !== 'unknown') {
            let p_evidence = 0;
            for (const r of rain_states) {
                 const p_r = r ? p_rain : 1-p_rain;
                 for (const s of sprinkler_states) {
                     const p_s_given_r = r ? (s ? p_sprinkler_given_rain : 1-p_sprinkler_given_rain) : (s ? p_sprinkler_given_not_rain : 1-p_sprinkler_given_not_rain);
                     p_evidence += p_s_given_r * p_r;
                 }
            }
            normalizer = p_evidence;
        }

        return { p_wet_grass: p_wet_grass / (normalizer || 1) };
    }, [rain, sprinkler, p_wet_given_rs_table]);

    const reset = () => {
        setRain('unknown');
        setSprinkler('unknown');
    };

    const NodeCard = ({ title, icon, children, probability, active }: { title: string, icon: React.ReactNode, children: React.ReactNode, probability?: number, active?: boolean }) => (
        <Card className={`text-center transition-all ${active ? 'border-primary shadow-lg' : ''}`}>
            <CardHeader>
                <div className="flex justify-center items-center gap-2">
                    {icon}
                    <CardTitle>{title}</CardTitle>
                </div>
                 {probability !== undefined && <CardDescription className="text-2xl font-bold pt-2">P = {probability.toFixed(3)}</CardDescription>}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    )

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bayesian Network: The Wet Grass Problem</CardTitle>
                <CardDescription>Observe how evidence about rain or the sprinkler changes the probability of the grass being wet.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="grid grid-cols-2 gap-8 items-start relative mb-8">
                    <div className="absolute top-1/4 left-1/4 h-1/2 w-px bg-foreground -rotate-45 origin-top-left" style={{transform: 'translateX(3rem) translateY(3rem) rotate(-45deg)', height: '8rem'}}></div>
                    <div className="absolute top-1/4 right-1/4 h-1/2 w-px bg-foreground rotate-45 origin-top-right" style={{transform: 'translateX(-3rem) translateY(3rem) rotate(45deg)', height: '8rem'}}></div>
                    
                    <NodeCard title="Rain" icon={<CloudRain className="w-8 h-8 text-blue-500" />} active={rain !== 'unknown'}>
                        <ToggleGroup type="single" value={rain} onValueChange={(v: Evidence) => setRain(v || 'unknown')}>
                            <ToggleGroupItem value="true" aria-label="Rain True"><Check/></ToggleGroupItem>
                            <ToggleGroupItem value="false" aria-label="Rain False"><X/></ToggleGroupItem>
                        </ToggleGroup>
                    </NodeCard>

                    <NodeCard title="Sprinkler" icon={<Sprinkler className="w-8 h-8 text-cyan-500" />} active={sprinkler !== 'unknown'}>
                        <ToggleGroup type="single" value={sprinkler} onValueChange={(v: Evidence) => setSprinkler(v || 'unknown')}>
                            <ToggleGroupItem value="true" aria-label="Sprinkler True"><Check /></ToggleGroupItem>
                            <ToggleGroupItem value="false" aria-label="Sprinkler False"><X /></ToggleGroupItem>
                        </ToggleGroup>
                    </NodeCard>
                    
                    <div className="col-span-2 flex justify-center mt-12">
                        <NodeCard title="Grass is Wet" icon={<Leaf className="w-8 h-8 text-green-500" />} probability={posterior.p_wet_grass}>
                            <p className="text-sm text-muted-foreground">Probability updates based on evidence above.</p>
                        </NodeCard>
                    </div>
                </div>
                 <div className="text-center mt-8">
                    <Button onClick={reset} variant="outline">Reset Evidence</Button>
                </div>
            </CardContent>
        </Card>
    );
};

export default BayesianNetworkSimulation;

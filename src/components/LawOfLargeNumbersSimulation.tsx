
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { Dices } from 'lucide-react';

const LawOfLargeNumbersSimulation = () => {
    const EXPECTED_VALUE = 3.5; // For a fair 6-sided die
    const [rolls, setRolls] = useState<number[]>([]);
    const [numToAdd, setNumToAdd] = useState(10);

    const addRolls = () => {
        const newRolls = Array.from({ length: numToAdd }, () => Math.floor(Math.random() * 6) + 1);
        setRolls(prevRolls => [...prevRolls, ...newRolls]);
    };

    const resetSimulation = () => {
        setRolls([]);
    };

    const chartData = useMemo(() => {
        let sum = 0;
        return rolls.map((roll, index) => {
            sum += roll;
            return {
                sampleSize: index + 1,
                average: sum / (index + 1),
            };
        });
    }, [rolls]);

    const currentAverage = chartData.length > 0 ? chartData[chartData.length - 1].average : 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Dices /> Counting Dragon Hoards</CardTitle>
                <CardDescription>
                    The Law of Large Numbers states that as the number of trials increases, the sample average will converge to the true expected value.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-sm text-muted-foreground">Number of Rolls</p>
                            <p className="text-3xl font-bold">{rolls.length}</p>
                            <p className="text-sm text-muted-foreground mt-4">Current Average</p>
                            <p className="text-3xl font-bold">{currentAverage.toFixed(3)}</p>
                        </CardContent>
                    </Card>
                    <div className="flex gap-2">
                        <Button onClick={addRolls} className="w-full">Roll 10 More Dice</Button>
                        <Button onClick={resetSimulation} variant="destructive" className="w-full">Reset</Button>
                    </div>
                     <p className="text-xs text-muted-foreground text-center">The expected average for a fair die is 3.5.</p>
                </div>
                <div className="lg:col-span-2 min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: 0, bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis 
                                dataKey="sampleSize" 
                                type="number" 
                                name="Sample Size" 
                                domain={['dataMin', 'dataMax']}
                                label={{ value: "Number of Rolls", position: "bottom" }}
                            />
                            <YAxis domain={[1, 6]} label={{ value: 'Average', angle: -90, position: 'insideLeft' }}/>
                            <Tooltip />
                            <Line type="monotone" dataKey="average" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} name="Sample Average" />
                            <ReferenceLine y={EXPECTED_VALUE} stroke="hsl(var(--destructive))" strokeWidth={2} strokeDasharray="3 3">
                                <Label value="Expected Value (3.5)" position="top" fill="hsl(var(--destructive))" />
                            </ReferenceLine>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default LawOfLargeNumbersSimulation;


import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PawPrint, Sprout, Feather } from 'lucide-react';

const ChiSquaredTestSimulation = () => {
    const habitats = ['Forest', 'Mountain', 'Plains'];
    const creatures = ['Griffins', 'Unicorns'];
    const [observed, setObserved] = useState([
        [30, 10, 10], // Griffins
        [10, 20, 20], // Unicorns
    ]);
    const [result, setResult] = useState<{ chi2: number; pValue: string; df: number } | null>(null);

    const handleObservedChange = (cIndex: number, hIndex: number, value: string) => {
        const numValue = parseInt(value, 10);
        if (isNaN(numValue) || numValue < 0) return;
        const newObserved = observed.map(row => [...row]);
        newObserved[cIndex][hIndex] = numValue;
        setObserved(newObserved);
        setResult(null);
    };

    const calculateChiSquared = () => {
        const rowTotals = observed.map(row => row.reduce((sum, val) => sum + val, 0));
        const colTotals = habitats.map((_, hIndex) => creatures.reduce((sum, _, cIndex) => sum + observed[cIndex][hIndex], 0));
        const grandTotal = rowTotals.reduce((sum, val) => sum + val, 0);

        if (grandTotal === 0) return;

        let chi2 = 0;
        for (let i = 0; i < creatures.length; i++) {
            for (let j = 0; j < habitats.length; j++) {
                const expected = (rowTotals[i] * colTotals[j]) / grandTotal;
                chi2 += Math.pow(observed[i][j] - expected, 2) / expected;
            }
        }
        
        const df = (creatures.length - 1) * (habitats.length - 1);
        // This is a simplified p-value lookup for common critical values, not a full calculation.
        const criticalValues = { 1: { '0.05': 3.84 }, 2: { '0.05': 5.99 }, 3: { '0.05': 7.81 } };
        const pValue = chi2 > (criticalValues[df]?.['0.05'] ?? 999) ? "< 0.05" : "> 0.05";
        
        setResult({ chi2, pValue, df });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><PawPrint /> Creature Cartography (Chi-Squared Test)</CardTitle>
                <CardDescription>
                    The Chi-Squared test checks if there's a significant association between two categorical variables. Is there a link between creature type and preferred habitat? Enter the observed counts.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-2">Observed Frequencies</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Creature</TableHead>
                                {habitats.map(h => <TableHead key={h}>{h}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {creatures.map((creature, cIndex) => (
                                <TableRow key={creature}>
                                    <TableCell className="font-medium">{creature}</TableCell>
                                    {habitats.map((_, hIndex) => (
                                        <TableCell key={`${cIndex}-${hIndex}`}>
                                            <Input type="number" value={observed[cIndex][hIndex]} onChange={(e) => handleObservedChange(cIndex, hIndex, e.target.value)} className="w-20"/>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <Button onClick={calculateChiSquared} className="w-full">Calculate Chi-Squared</Button>
                {result && (
                    <Card>
                        <CardContent className="pt-6 text-center">
                             <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <p className="text-sm text-muted-foreground">Chi-Squared Value</p>
                                    <p className="text-2xl font-bold">{result.chi2.toFixed(2)}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">Degrees of Freedom</p>
                                    <p className="text-2xl font-bold">{result.df}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-muted-foreground">P-Value</p>
                                    <p className="text-2xl font-bold">{result.pValue}</p>
                                </div>
                            </div>
                            <p className={`mt-4 text-lg font-semibold ${result.pValue === '< 0.05' ? 'text-green-500' : 'text-red-500'}`}>
                                {result.pValue === '< 0.05' ? 'Significant association found' : 'No significant association'}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>
    );
};

export default ChiSquaredTestSimulation;

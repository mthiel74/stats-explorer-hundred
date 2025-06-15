
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const generate2x2Data = () => {
    return [
        [Math.floor(Math.random() * 50) + 10, Math.floor(Math.random() * 50) + 10],
        [Math.floor(Math.random() * 50) + 10, Math.floor(Math.random() * 50) + 10]
    ];
};

const calculatePhi = (table: number[][]) => {
    const [a, b] = table[0];
    const [c, d] = table[1];
    
    const numerator = (a * d) - (b * c);
    const denominator = Math.sqrt((a + b) * (c + d) * (a + c) * (b + d));
    
    if (denominator === 0) return 0;
    
    return numerator / denominator;
};

const PhiCoefficientSimulation = () => {
    const [data, setData] = useState(generate2x2Data());

    const phi = useMemo(() => calculatePhi(data), [data]);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Phi (φ) Coefficient</CardTitle>
                <CardDescription>
                    Measures the association for two binary variables in a 2x2 table. Ranges from -1 to +1, similar to Pearson's correlation.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => setData(generate2x2Data())} className="mb-4">Generate New Data</Button>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-center mb-2">2x2 Contingency Table</h3>
                        <Table>
                             <TableHeader>
                                <TableRow>
                                    <TableHead></TableHead>
                                    <TableHead>Outcome Positive</TableHead>
                                    <TableHead>Outcome Negative</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">Group A</TableCell>
                                    <TableCell>{data[0][0]}</TableCell>
                                    <TableCell>{data[0][1]}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Group B</TableCell>
                                    <TableCell>{data[1][0]}</TableCell>
                                    <TableCell>{data[1][1]}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex flex-col justify-center items-center p-6 bg-muted rounded-lg">
                        <p className="text-muted-foreground">Phi Coefficient (φ)</p>
                        <p className="text-4xl font-bold">{phi.toFixed(3)}</p>
                        <div className="text-sm mt-4 text-center">
                           <p className="mt-2 italic">A value near 0 indicates no association. Values near -1 or +1 indicate a strong negative or positive association, respectively.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PhiCoefficientSimulation;

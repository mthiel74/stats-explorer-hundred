
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const generateContingencyData = (rows: number, cols: number) => {
    return Array.from({ length: rows }, () => 
        Array.from({ length: cols }, () => Math.floor(Math.random() * 50) + 10)
    );
};

const calculateCramersV = (table: number[][]) => {
    const numRows = table.length;
    const numCols = table[0].length;
    const n = table.flat().reduce((a, b) => a + b, 0);

    const rowTotals = table.map(row => row.reduce((a, b) => a + b, 0));
    const colTotals = Array.from({ length: numCols }, (_, j) => 
        table.reduce((sum, row) => sum + row[j], 0)
    );

    let chi2 = 0;
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const expected = (rowTotals[i] * colTotals[j]) / n;
            const observed = table[i][j];
            chi2 += Math.pow(observed - expected, 2) / expected;
        }
    }

    const phi2 = chi2 / n;
    const k = Math.min(numRows, numCols);
    if (k === 1) return { chi2, v: 0, df: (numRows - 1) * (numCols - 1) };
    const v = Math.sqrt(phi2 / (k - 1));

    return { chi2, v, df: (numRows - 1) * (numCols - 1) };
};

const CramersVSimulation = () => {
    const [data, setData] = useState(generateContingencyData(3, 2));

    const { chi2, v, df } = useMemo(() => calculateCramersV(data), [data]);
    
    const rowHeaders = ['Blonde', 'Brunette', 'Redhead'];
    const colHeaders = ['Blue Eyes', 'Brown Eyes'];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Cramer's V</CardTitle>
                <CardDescription>
                    Measures the strength of association between two nominal variables. Ranges from 0 (no association) to 1 (perfect association).
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => setData(generateContingencyData(3, 2))} className="mb-4">Generate New Data</Button>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <h3 className="font-semibold text-center mb-2">Contingency Table (Observed Frequencies)</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Hair Color</TableHead>
                                    {colHeaders.map(h => <TableHead key={h}>{h}</TableHead>)}
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((row, i) => (
                                    <TableRow key={i}>
                                        <TableCell className="font-medium">{rowHeaders[i]}</TableCell>
                                        {row.map((cell, j) => <TableCell key={j}>{cell}</TableCell>)}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex flex-col justify-center items-center p-6 bg-muted rounded-lg">
                        <p className="text-muted-foreground">Cramer's V</p>
                        <p className="text-4xl font-bold">{v.toFixed(3)}</p>
                        <div className="text-sm mt-4 text-center">
                            <p>Chi-Squared (χ²): {chi2.toFixed(2)}</p>
                            <p>Degrees of Freedom (df): {df}</p>
                            <p className="mt-2 italic">A value near 0 indicates little to no association, while a value near 1 indicates a strong association.</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CramersVSimulation;


import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const initialDirtyData = [
    { id: 1, name: 'Apple', category: 'Fruit', price: 1.2, quantity: 10 },
    { id: 2, name: 'Orange', category: 'Fruit', price: 0.8, quantity: 15 },
    { id: 3, name: 'Carrot', category: 'Vegetable', price: 0.5, quantity: null },
    { id: 4, name: 'Apple', category: 'Fruit', price: 1.2, quantity: 10 },
    { id: 5, name: 'Broccoli', category: 'vegetable', price: 1.5, quantity: 8 },
    { id: 6, name: 'Banana', category: 'Fruitt', price: 0.6, quantity: 20 },
    { id: 7, name: 'Spinach', category: 'Vegetable', price: null, quantity: 12 },
];

const DataCleansingSimulation = () => {
    const [data, setData] = useState(initialDirtyData);
    const [log, setLog] = useState<string[]>([]);

    const addLog = (message: string) => setLog(prev => [...prev, message]);

    const handleRemoveDuplicates = () => {
        const uniqueData = data.filter((item, index, self) =>
            index === self.findIndex((t) => (t.name === item.name && t.category.toLowerCase().startsWith(item.category[0].toLowerCase())))
        );
        setData(uniqueData);
        addLog('Removed duplicate entries.');
    };

    const handleFixTypos = () => {
        const fixedData = data.map(item => ({
            ...item,
            category: item.category.toLowerCase().replace('fruitt', 'fruit').replace(/^./, str => str.toUpperCase())
        }));
        setData(fixedData);
        addLog('Standardized category names (e.g., "vegetable" to "Vegetable", "Fruitt" to "Fruit").');
    };

    const handleImputeMissing = () => {
        const prices = data.map(d => d.price).filter(p => p !== null) as number[];
        const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
        
        const quantities = data.map(d => d.quantity).filter(q => q !== null) as number[];
        const avgQuantity = quantities.reduce((a, b) => a + b, 0) / quantities.length;

        const imputedData = data.map(item => ({
            ...item,
            price: item.price ?? parseFloat(avgPrice.toFixed(2)),
            quantity: item.quantity ?? Math.round(avgQuantity)
        }));
        setData(imputedData);
        addLog(`Imputed missing values with mean (Price: ${avgPrice.toFixed(2)}, Quantity: ${Math.round(avgQuantity)}).`);
    };

    const handleReset = () => {
        setData(initialDirtyData);
        setLog([]);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Data Cleansing</CardTitle>
                <CardDescription>Apply common data cleansing techniques to a messy dataset.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold">Cleansing Steps</h3>
                        <Button onClick={handleRemoveDuplicates} className="w-full">1. Remove Duplicates</Button>
                        <Button onClick={handleFixTypos} className="w-full">2. Fix Typos in Category</Button>
                        <Button onClick={handleImputeMissing} className="w-full">3. Impute Missing Values</Button>
                        <Button onClick={handleReset} variant="outline" className="w-full">Reset Data</Button>

                        <Card>
                            <CardHeader>
                                <CardTitle>Cleansing Log</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-2 text-sm text-muted-foreground min-h-[6rem]">
                                    {log.map((l, i) => <li key={i}>{l}</li>)}
                                    {log.length === 0 && <li>No actions taken yet.</li>}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="md:col-span-2">
                        <h3 className="font-semibold mb-2">Dataset</h3>
                        <div className="border rounded-lg overflow-auto max-h-[400px]">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Quantity</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {data.map(item => (
                                        <TableRow key={item.id + item.name}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>{item.category}</TableCell>
                                            <TableCell className={item.price === null ? 'text-destructive' : ''}>{item.price ?? 'NULL'}</TableCell>
                                            <TableCell className={item.quantity === null ? 'text-destructive' : ''}>{item.quantity ?? 'NULL'}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default DataCleansingSimulation;

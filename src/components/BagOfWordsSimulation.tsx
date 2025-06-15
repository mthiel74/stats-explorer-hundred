
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const BagOfWordsSimulation = () => {
    const [sentence, setSentence] = useState("the cat sat on the mat");
    
    const { vocabulary, vector } = useMemo(() => {
        const words = sentence.toLowerCase().match(/\b(\w+)\b/g) || [];
        const vocab = [...new Set(words)].sort();
        const vec = vocab.map(v => words.filter(w => w === v).length);
        return { vocabulary: vocab, vector: vec };
    }, [sentence]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Bag-of-Words Model</CardTitle>
                <CardDescription>Representing text as a frequency count of its words, ignoring order.</CardDescription>
            </CardHeader>
            <CardContent>
                <Input 
                    value={sentence}
                    onChange={(e) => setSentence(e.target.value)}
                    placeholder="Enter a sentence"
                    className="mb-4"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h3 className="font-semibold mb-2">Vocabulary</h3>
                        <div className="flex flex-wrap gap-2 p-4 border rounded-lg min-h-[6rem]">
                            {vocabulary.map((word, i) => <span key={i} className="bg-muted px-2 py-1 rounded">{word}</span>)}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-2">Frequency Vector</h3>
                         <div className="flex flex-wrap gap-2 p-4 border rounded-lg min-h-[6rem] items-center">
                            <span className="font-mono text-lg">[{vector.join(', ')}]</span>
                        </div>
                    </div>
                </div>
                <div className="mt-4 overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                {vocabulary.map((word, i) => <TableHead key={i} className="text-center">{word}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                {vector.map((count, i) => <TableCell key={i} className="text-center font-mono text-lg">{count}</TableCell>)}
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default BagOfWordsSimulation;


import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const documents = [
    "The cat sat on the mat.",
    "The dog played in the garden.",
    "The cat and dog are friends."
];

const TfIdfSimulation = () => {
    const [term, setTerm] = useState("cat");
    
    const tokenizedDocs = useMemo(() => documents.map(doc => doc.toLowerCase().match(/\b(\w+)\b/g) || []), []);

    const results = useMemo(() => {
        const lcTerm = term.toLowerCase().trim();
        if (!lcTerm) return documents.map(doc => ({ doc, tf:0, idf:0, tfidf:0 }));
        
        const docsWithTerm = tokenizedDocs.filter(doc => doc.includes(lcTerm)).length;
        const idf = docsWithTerm > 0 ? Math.log(documents.length / docsWithTerm) : 0;

        return tokenizedDocs.map((doc, i) => {
            const tf = doc.length > 0 ? doc.filter(t => t === lcTerm).length / doc.length : 0;
            const tfidf = tf * idf;
            return { doc: documents[i], tf, idf, tfidf };
        });
    }, [term, tokenizedDocs]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>TF-IDF (Term Frequency-Inverse Document Frequency)</CardTitle>
                <CardDescription>Measuring how important a word is to a document in a collection.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-4">
                    <label htmlFor="tfidf-term" className="font-semibold text-sm">Search Term:</label>
                    <Input id="tfidf-term" value={term} onChange={(e) => setTerm(e.target.value)} className="mt-1" />
                </div>
                
                <h3 className="font-semibold mt-4 mb-2 text-sm">Documents:</h3>
                <ul className="list-disc list-inside bg-muted p-4 rounded-lg text-sm space-y-1">
                    {documents.map((doc, i) => <li key={i}>{doc}</li>)}
                </ul>

                <h3 className="font-semibold mt-6 mb-2">Scores for "{term || '...'}"</h3>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Document</TableHead>
                                <TableHead className="text-right">TF</TableHead>
                                <TableHead className="text-right">IDF</TableHead>
                                <TableHead className="text-right">TF-IDF Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {results.map(({ doc, tf, idf, tfidf }, i) => (
                                <TableRow key={i}>
                                    <TableCell className="truncate max-w-[200px]">{doc}</TableCell>
                                    <TableCell className="text-right">{tf.toFixed(3)}</TableCell>
                                    <TableCell className="text-right">{idf.toFixed(3)}</TableCell>
                                    <TableCell className="text-right font-bold">{tfidf.toFixed(3)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default TfIdfSimulation;

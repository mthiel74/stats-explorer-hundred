
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ArrowDown } from 'lucide-react';

// A very simple stemming function
const stem = (word: string) => {
    if (word.endsWith('s')) return word.slice(0, -1);
    if (word.endsWith('ing')) return word.slice(0, -3);
    if (word.endsWith('ed')) return word.slice(0, -2);
    return word;
};

const stopWords = new Set(['a', 'an', 'the', 'is', 'are', 'in', 'on', 'of', 'for', 'to']);

const NLPSimulation = () => {
    const [text, setText] = useState("The quick brown foxes are jumping over the lazy dog.");

    const processed = useMemo(() => {
        const tokens = text.toLowerCase().match(/\b(\w+)\b/g) || [];
        const noStopWords = tokens.filter(token => !stopWords.has(token));
        const stemmed = noStopWords.map(stem);
        return { tokens, noStopWords, stemmed };
    }, [text]);

    const Step = ({ title, words }: { title: string, words: string[] | string }) => (
        <div className="p-4 border rounded-lg bg-background w-full max-w-xl">
            <h3 className="font-semibold mb-2 text-primary">{title}</h3>
            <div className="flex flex-wrap gap-2 text-sm">
                {Array.isArray(words) ? words.map((word, i) => <span key={i} className="bg-muted px-2 py-1 rounded">{word}</span>) : <p className="text-muted-foreground">{words}</p>}
            </div>
        </div>
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Natural Language Processing Pipeline</CardTitle>
                <CardDescription>See how raw text is processed into a more useful format.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4 items-center">
                    <Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text to process" className="max-w-xl" />

                    <Step title="1. Original Text" words={text} />
                    <ArrowDown className="text-muted-foreground" />
                    <Step title="2. Tokenization & Lowercasing" words={processed.tokens} />
                    <ArrowDown className="text-muted-foreground" />
                    <Step title="3. Stop Word Removal" words={processed.noStopWords} />
                    <ArrowDown className="text-muted-foreground" />
                    <Step title="4. Stemming" words={processed.stemmed} />
                </div>
            </CardContent>
        </Card>
    );
};
export default NLPSimulation;

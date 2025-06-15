
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { BookCopy } from 'lucide-react';

const NaiveBayesSimulation = () => {
    const [spamTraining, setSpamTraining] = useState("win prize money free");
    const [hamTraining, setHamTraining] = useState("meeting schedule report");
    const [inputText, setInputText] = useState("win a free prize");
    const [result, setResult] = useState(null);

    const runClassification = () => {
        const spamWords = spamTraining.toLowerCase().split(/\s+/);
        const hamWords = hamTraining.toLowerCase().split(/\s+/);
        const inputWords = inputText.toLowerCase().split(/\s+/);

        const spamCounts = spamWords.reduce((acc, word) => { acc[word] = (acc[word] || 0) + 1; return acc; }, {});
        const hamCounts = hamWords.reduce((acc, word) => { acc[word] = (acc[word] || 0) + 1; return acc; }, {});
        
        const vocab = new Set([...spamWords, ...hamWords]);
        const k = 1; // Laplace smoothing

        let logProbSpam = Math.log(0.5); // Assume P(Spam) = 0.5
        let logProbHam = Math.log(0.5);  // Assume P(Ham) = 0.5

        inputWords.forEach(word => {
            logProbSpam += Math.log(((spamCounts[word] || 0) + k) / (spamWords.length + k * vocab.size));
            logProbHam += Math.log(((hamCounts[word] || 0) + k) / (hamWords.length + k * vocab.size));
        });

        setResult({
            isSpam: logProbSpam > logProbHam,
            probSpam: logProbSpam.toFixed(2),
            probHam: logProbHam.toFixed(2),
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookCopy /> The Scribe's Filter (Naive Bayes)</CardTitle>
                <CardDescription>
                    Naive Bayes classifies text by assuming word occurrences are independent. Train it on 'spam' and 'ham' (not spam) words and classify a new message.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="font-semibold">Spam Training Words</label>
                        <Textarea value={spamTraining} onChange={(e) => setSpamTraining(e.target.value)} />
                    </div>
                    <div>
                        <label className="font-semibold">Ham Training Words</label>
                        <Textarea value={hamTraining} onChange={(e) => setHamTraining(e.target.value)} />
                    </div>
                </div>
                <div>
                    <label className="font-semibold">Message to Classify</label>
                    <Input value={inputText} onChange={(e) => setInputText(e.target.value)} />
                </div>
                <Button onClick={runClassification} className="w-full">Classify Message</Button>
                {result && (
                     <Card>
                        <CardContent className="pt-6 text-center">
                            <p className="text-sm text-muted-foreground">Log-Prob Spam: {result.probSpam}, Log-Prob Ham: {result.probHam}</p>
                            <p className="text-3xl font-bold mt-2">
                                Classification: <span className={result.isSpam ? "text-destructive" : "text-green-600"}>{result.isSpam ? "Spam" : "Ham"}</span>
                            </p>
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>
    );
};

export default NaiveBayesSimulation;

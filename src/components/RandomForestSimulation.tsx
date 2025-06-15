
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { SquareStack } from 'lucide-react';

const RandomForestSimulation = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><SquareStack /> Random Forest</CardTitle>
                <CardDescription>
                    A Random Forest is an ensemble method that builds multiple decision trees and merges them to get a more accurate and stable prediction.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="border rounded-lg p-4 bg-background">
                            <h3 className="font-semibold text-center mb-2">Decision Tree {i}</h3>
                            <p className="text-xs text-muted-foreground text-center mb-4">
                                Each tree is trained on a random subset of data and features.
                            </p>
                            {/* Simplified tree visualization */}
                            <div className="space-y-2 text-center">
                                <div className="mx-auto w-24 h-12 bg-primary/10 rounded-md flex items-center justify-center text-sm">Feature A &gt; 0.5?</div>
                                <div className="flex justify-around">
                                    <div className="w-px h-8 bg-muted-foreground/50"></div>
                                    <div className="w-px h-8 bg-muted-foreground/50"></div>
                                </div>
                                <div className="flex justify-around">
                                    <div className="w-20 h-12 bg-destructive/10 rounded-md flex items-center justify-center text-sm">Class 1</div>
                                    <div className="w-20 h-12 bg-primary/20 rounded-md flex items-center justify-center text-sm">Feature B &lt; 10?</div>
                                </div>
                                 <div className="flex justify-end">
                                    <div className="w-1/2 flex justify-around">
                                      <div className="w-px h-4 bg-muted-foreground/50"></div>
                                      <div className="w-px h-4 bg-muted-foreground/50"></div>
                                    </div>
                                </div>
                                 <div className="flex justify-end">
                                    <div className="w-1/2 flex justify-around">
                                      <div className="w-16 h-10 bg-primary/10 rounded-md flex items-center justify-center text-sm">Class 0</div>
                                      <div className="w-16 h-10 bg-destructive/10 rounded-md flex items-center justify-center text-sm">Class 1</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                 <div className="mt-8 text-center p-4 bg-muted rounded-lg">
                    <h3 className="font-semibold text-xl">Final Prediction: Majority Vote</h3>
                    <p className="text-muted-foreground">The forest combines the votes from all trees for a more robust prediction.</p>
                </div>
            </CardContent>
        </Card>
    );
};

export default RandomForestSimulation;

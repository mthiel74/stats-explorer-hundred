
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Clock, TrendingUp } from 'lucide-react';

const generateTimeSeriesData = () => {
    const data = [];
    for (let i = 0; i < 100; i++) {
        const trend = i * 0.5;
        const seasonality = Math.sin(i / 5) * 10;
        const noise = (Math.random() - 0.5) * 5;
        data.push({
            time: i,
            value: trend + seasonality + noise,
        });
    }
    return data;
};

const calculateMovingAverage = (data: {time: number, value: number}[], window: number) => {
    if (!data || data.length < window) return [];
    const movingAverage = [];
    for (let i = 0; i < data.length - window + 1; i++) {
        const slice = data.slice(i, i + window);
        const sum = slice.reduce((acc, val) => acc + val.value, 0);
        movingAverage.push({ time: data[i + Math.floor(window / 2)].time, 'Moving Average': sum / window });
    }
    return movingAverage;
};

const TimeSeriesAnalysisSimulation = () => {
    const [data] = useState(generateTimeSeriesData());
    const [showMovingAverage, setShowMovingAverage] = useState(false);
    
    const movingAverageData = useMemo(() => {
        if (!showMovingAverage) return [];
        return calculateMovingAverage(data, 10);
    }, [data, showMovingAverage]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock /> The Oracle's Chronometer (Time Series Analysis)</CardTitle>
                <CardDescription>
                    Time series analysis comprises methods for analyzing time series data in order to extract meaningful statistics and other characteristics of the data. This example shows data with trend and seasonality, and a moving average to smooth it out.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex gap-2">
                    <Button onClick={() => setShowMovingAverage(!showMovingAverage)}>
                        <TrendingUp className="mr-2 h-4 w-4" />
                        {showMovingAverage ? "Hide" : "Show"} 10-Point Moving Average
                    </Button>
                </div>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" label={{ value: 'Time', position: 'insideBottom', offset: -5 }}/>
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" dot={false} name="Observed Value"/>
                            {showMovingAverage && (
                                <Line type="monotone" dataKey="Moving Average" data={movingAverageData} stroke="hsl(var(--destructive))" dot={false} />
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default TimeSeriesAnalysisSimulation;

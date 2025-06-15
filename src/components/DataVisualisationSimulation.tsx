
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, LineChart, ScatterChart, Bar, Line, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LayoutGrid, TrendingUp, Layers3 } from 'lucide-react';

const sampleData = [
  { name: 'Gryphon', attack: 85, speed: 60, defense: 70 },
  { name: 'Dragon', attack: 95, speed: 80, defense: 90 },
  { name: 'Unicorn', attack: 60, speed: 75, defense: 80 },
  { name: 'Minotaur', attack: 90, speed: 40, defense: 85 },
  { name: 'Phoenix', attack: 75, speed: 90, defense: 70 },
];

type ChartType = 'bar' | 'line' | 'scatter';

const DataVisualisationSimulation = () => {
    const [chartType, setChartType] = useState<ChartType>('bar');

    const renderChart = () => {
        switch (chartType) {
            case 'bar':
                return (
                    <BarChart data={sampleData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="attack" fill="hsl(var(--primary))" />
                        <Bar dataKey="speed" fill="hsl(var(--secondary))" />
                        <Bar dataKey="defense" fill="hsl(var(--destructive))" />
                    </BarChart>
                );
            case 'line':
                return (
                    <LineChart data={sampleData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="attack" stroke="hsl(var(--primary))" />
                        <Line type="monotone" dataKey="speed" stroke="hsl(var(--secondary))" />
                        <Line type="monotone" dataKey="defense" stroke="hsl(var(--destructive))" />
                    </LineChart>
                );
            case 'scatter':
                return (
                    <ScatterChart>
                        <CartesianGrid />
                        <XAxis type="number" dataKey="attack" name="Attack" unit="" />
                        <YAxis type="number" dataKey="speed" name="Speed" unit="" />
                        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                        <Legend />
                        <Scatter name="Creatures" data={sampleData} fill="hsl(var(--primary))" />
                    </ScatterChart>
                );
            default:
                return null;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><LayoutGrid /> The Scryer's Easel (Data Visualisation)</CardTitle>
                <CardDescription>
                    Data visualization is the graphical representation of information and data. By using visual elements like charts, graphs, and maps, data visualization tools provide an accessible way to see and understand trends, outliers, and patterns in data.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-4">
                    <h3 className="font-semibold">Choose Chart Type</h3>
                    <Button onClick={() => setChartType('bar')} variant={chartType === 'bar' ? 'default' : 'secondary'} className="w-full justify-start"><LayoutGrid className="mr-2 h-4 w-4" /> Bar Chart</Button>
                    <Button onClick={() => setChartType('line')} variant={chartType === 'line' ? 'default' : 'secondary'} className="w-full justify-start"><TrendingUp className="mr-2 h-4 w-4" /> Line Chart</Button>
                    <Button onClick={() => setChartType('scatter')} variant={chartType === 'scatter' ? 'default' : 'secondary'} className="w-full justify-start"><Layers3 className="mr-2 h-4 w-4" /> Scatter Plot</Button>
                </div>
                <div className="lg:col-span-2 min-h-[400px]">
                    <ResponsiveContainer width="100%" height={400}>
                        {renderChart()}
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default DataVisualisationSimulation;

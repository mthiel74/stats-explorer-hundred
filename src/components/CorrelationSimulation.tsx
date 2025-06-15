
import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Flame, Star, Shield, XCircle, Feather } from 'lucide-react';

type CorrelationType = 'strong-positive' | 'weak-positive' | 'none' | 'weak-negative' | 'strong-negative';

interface CorrelationScenario {
  name: string;
  description: string;
  icon: React.ElementType;
  xLabel: string;
  yLabel: string;
  generator: (n: number) => { x: number; y: number }[];
}

const CorrelationSimulation = () => {
  const [correlationType, setCorrelationType] = useState<CorrelationType>('strong-positive');
  
  const scenarios: Record<CorrelationType, CorrelationScenario> = {
    'strong-positive': {
      name: "Dragon's Might",
      description: "A strong positive correlation. As a dragon's wingspan increases, so does the intensity of its fire breath.",
      icon: Flame,
      xLabel: "Wingspan (m)",
      yLabel: "Fire Intensity (kJ)",
      generator: (n) => Array.from({ length: n }, () => {
        const x = Math.random() * 10 + 5;
        const y = x * 10 + (Math.random() - 0.5) * 20;
        return { x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) };
      }),
    },
    'weak-positive': {
        name: "Unicorn's Magic",
        description: "A weak positive correlation. Taller unicorns tend to have slightly more magical horns, but it's not a strong link.",
        icon: Star,
        xLabel: "Height (hands)",
        yLabel: "Horn Magic (lumens)",
        generator: (n) => Array.from({ length: n }, () => {
          const x = Math.random() * 5 + 15;
          const y = x * 5 + (Math.random() - 0.5) * 50;
          return { x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) };
        }),
    },
    'none': {
        name: "Griffin's Riddle",
        description: "No correlation. A griffin's feather count has no relationship to its riddle-solving ability.",
        icon: Feather,
        xLabel: "Feather Count",
        yLabel: "Riddles Solved",
        generator: (n) => Array.from({ length: n }, () => {
            const x = Math.floor(Math.random() * 5000 + 10000);
            const y = Math.floor(Math.random() * 100);
            return { x, y };
        }),
    },
    'weak-negative': {
        name: "Gnome's Agility",
        description: "A weak negative correlation. Heavier gnomes are slightly less agile, but other factors are at play.",
        icon: Shield,
        xLabel: "Weight (kg)",
        yLabel: "Agility Score",
        generator: (n) => Array.from({ length: n }, () => {
            const x = Math.random() * 20 + 40;
            const y = 100 - x * 0.5 + (Math.random() - 0.5) * 40;
            return { x: parseFloat(x.toFixed(2)), y: parseFloat(y.toFixed(2)) };
        }),
    },
    'strong-negative': {
        name: "Cat-Dragon's Hoard",
        description: "A strong negative correlation. The more naps a cat-dragon takes per day, the smaller its treasure hoard.",
        icon: XCircle,
        xLabel: "Naps per Day",
        yLabel: "Treasure Hoard (gold)",
        generator: (n) => Array.from({ length: n }, () => {
            const x = Math.floor(Math.random() * 10 + 5);
            const y = 5000 - x * 300 + (Math.random() - 0.5) * 500;
            return { x, y };
        }),
    }
  };

  const [data, setData] = useState<{ x: number; y: number }[]>(scenarios[correlationType].generator(100));

  const generateData = () => {
    const newData = scenarios[correlationType].generator(100);
    setData(newData);
  };

  React.useEffect(() => {
    generateData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [correlationType]);

  const currentScenario = scenarios[correlationType];
  const Icon = currentScenario.icon;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon /> {currentScenario.name}
                </CardTitle>
                <CardDescription>{currentScenario.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Select value={correlationType} onValueChange={(v) => setCorrelationType(v as CorrelationType)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Correlation Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="strong-positive">Strong Positive</SelectItem>
                    <SelectItem value="weak-positive">Weak Positive</SelectItem>
                    <SelectItem value="none">No Correlation</SelectItem>
                    <SelectItem value="weak-negative">Weak Negative</SelectItem>
                    <SelectItem value="strong-negative">Strong Negative</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            <Button onClick={generateData} className="w-full">
              Generate New Data Sample
            </Button>
          </div>
          <div className="lg:col-span-2 min-h-[400px]">
             <h3 className="text-lg font-semibold mb-2 text-center">Scatter Plot of Mythical Creatures</h3>
            {data.length > 0 ? (
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart margin={{ top: 20, right: 30, bottom: 40, left: 30 }}>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="x" name={currentScenario.xLabel} label={{ value: currentScenario.xLabel, position: 'insideBottom', offset: -25 }} domain={['dataMin', 'dataMax']} />
                  <YAxis type="number" dataKey="y" name={currentScenario.yLabel} width={80} label={{ value: currentScenario.yLabel, angle: -90, position: 'insideLeft' }} domain={['dataMin', 'dataMax']} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Creatures" data={data} fill="hsl(var(--primary))" />
                </ScatterChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Select a scenario and generate data.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CorrelationSimulation;

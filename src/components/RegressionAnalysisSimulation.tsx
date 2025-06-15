
import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ZAxis, ReferenceLine, Label } from 'recharts';
import { CircleArrowUp } from 'lucide-react';

interface DataPoint {
  x: number;
  y: number;
}

// Function to calculate simple linear regression
const calculateRegression = (data: DataPoint[]) => {
  const n = data.length;
  if (n < 2) return null;

  const sumX = data.reduce((acc, p) => acc + p.x, 0);
  const sumY = data.reduce((acc, p) => acc + p.y, 0);
  const sumXY = data.reduce((acc, p) => acc + p.x * p.y, 0);
  const sumX2 = data.reduce((acc, p) => acc + p.x * p.x, 0);

  const denominator = (n * sumX2 - sumX * sumX);
  if (denominator === 0) return null; // Avoid division by zero

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  return { slope, intercept };
};

const RegressionAnalysisSimulation = () => {
  const [sampleSize, setSampleSize] = useState(50);
  const [noise, setNoise] = useState(15);
  const [data, setData] = useState<DataPoint[]>([]);
  const [regressionLine, setRegressionLine] = useState<{ slope: number; intercept: number } | null>(null);

  const trueSlope = 2.5;
  const trueIntercept = 10;

  const generateData = () => {
    const newData: DataPoint[] = [];
    for (let i = 0; i < sampleSize; i++) {
      const x = Math.random() * 50; // Wingspan 0 to 50 meters
      const error = (Math.random() - 0.5) * 2 * noise; // Noise
      const y = trueSlope * x + trueIntercept + error; // Speed
      newData.push({ x, y: Math.max(0, y) }); // Speed can't be negative
    }
    setData(newData);
    const regression = calculateRegression(newData);
    setRegressionLine(regression);
  };
  
  useEffect(() => {
    generateData();
  }, []);

  // To draw the regression line, we need start and end points
  const regressionLineEndpoints = useMemo(() => {
    if (!regressionLine) return [];
    const minX = 0;
    const maxX = 50;
    return [
      { x: minX, y: regressionLine.slope * minX + regressionLine.intercept },
      { x: maxX, y: regressionLine.slope * maxX + regressionLine.intercept },
    ];
  }, [regressionLine]);

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><CircleArrowUp /> Dragon's Flight Speed Analysis</CardTitle>
                <CardDescription>
                  We model the relationship between a dragon's wingspan and its flight speed to find the line of best fit. The true relationship is hidden by natural variation.
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="space-y-4">
              <label className="block font-medium">Sample Size (Dragons Observed): <span className="text-primary font-bold">{sampleSize}</span></label>
              <Slider value={[sampleSize]} onValueChange={(v) => setSampleSize(v[0])} min={10} max={200} step={5} />
            </div>
            <div className="space-y-4">
              <label className="block font-medium">Measurement Noise: <span className="text-primary font-bold">{noise}</span></label>
              <Slider value={[noise]} onValueChange={(v) => setNoise(v[0])} min={0} max={50} step={1} />
            </div>
            <Button onClick={generateData} className="w-full">
              Generate New Sample
            </Button>
          </div>
          <div className="lg:col-span-2 min-h-[400px] space-y-4">
            <h3 className="text-lg font-semibold mb-2 text-center">Regression Analysis Plot</h3>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid />
                  <XAxis type="number" dataKey="x" name="Wingspan (m)" unit="m" domain={[0, 50]} />
                  <YAxis type="number" dataKey="y" name="Speed (km/h)" unit="km/h" domain={[0, 'dataMax + 20']} />
                  <ZAxis type="number" range={[100]} />
                  <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                  <Scatter name="Observed Dragons" data={data} fill="hsl(var(--primary))" />
                  {regressionLine && regressionLineEndpoints.length > 0 && (
                    <ReferenceLine
                      ifOverflow="extendDomain"
                      segment={regressionLineEndpoints}
                      stroke="hsl(var(--destructive))"
                      strokeWidth={2}
                    >
                      <Label value="Regression Line" position="insideTopRight" fill="hsl(var(--destructive))" />
                    </ReferenceLine>
                  )}
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            {regressionLine ? (
              <Card>
                <CardHeader>
                  <CardTitle>Regression Equation</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-mono">
                    Speed ≈ {regressionLine.slope.toFixed(2)} * Wingspan + {regressionLine.intercept.toFixed(2)}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="flex items-center justify-center h-full border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">Generate a sample to see the regression line.</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegressionAnalysisSimulation;

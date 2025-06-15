
import React, { useState, useMemo, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Target } from 'lucide-react';

const Z_SCORES: { [key: number]: number } = {
  80: 1.282,
  90: 1.645,
  95: 1.960,
  99: 2.576,
};

interface SampleCI {
  id: number;
  mean: number;
  lower: number;
  upper: number;
  containsTrueMean: boolean;
}

const CustomShape = (props: any) => {
  const { cx, cy, payload, xAxis, yAxis } = props;
  if (!payload || !xAxis || !yAxis) return null;

  const { lower, upper, containsTrueMean } = payload;
  
  const x1 = xAxis.scale(lower);
  const x2 = xAxis.scale(upper);
  
  if (isNaN(x1) || isNaN(x2)) return null;

  const color = containsTrueMean ? 'hsl(var(--primary))' : 'hsl(var(--destructive))';
  
  return (
    <g>
      <line x1={x1} y1={cy} x2={x2} y2={cy} stroke={color} strokeWidth={1.5} />
      <line x1={x1} y1={cy - 3} x2={x1} y2={cy + 3} stroke={color} strokeWidth={1.5} />
      <line x1={x2} y1={cy - 3} x2={x2} y2={cy + 3} stroke={color} strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={2.5} fill={color} />
    </g>
  );
};


const ConfidenceIntervalsSimulation = () => {
  const [populationMean, setPopulationMean] = useState(50);
  const [populationStdDev, setPopulationStdDev] = useState(10);
  const [sampleSize, setSampleSize] = useState(30);
  const [confidenceLevel, setConfidenceLevel] = useState(95);
  const [simulations, setSimulations] = useState<SampleCI[]>([]);

  const runSimulation = useCallback((numSims = 1) => {
    const newSimulations: SampleCI[] = [];
    const zScore = Z_SCORES[confidenceLevel] || 1.96;
    const standardError = populationStdDev / Math.sqrt(sampleSize);

    for (let i = 0; i < numSims; i++) {
      let sampleSum = 0;
      for (let j = 0; j < sampleSize; j++) {
        const u1 = Math.random();
        const u2 = Math.random();
        const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
        sampleSum += z0 * populationStdDev + populationMean;
      }
      const sampleMean = sampleSum / sampleSize;
      const marginOfError = zScore * standardError;
      const lowerBound = sampleMean - marginOfError;
      const upperBound = sampleMean + marginOfError;
      
      newSimulations.push({
        id: i, // temporary id for this batch
        mean: sampleMean,
        lower: lowerBound,
        upper: upperBound,
        containsTrueMean: lowerBound <= populationMean && populationMean <= upperBound,
      });
    }
    
    setSimulations(prev => [...prev, ...newSimulations].slice(-100).map((s, idx) => ({ ...s, id: idx + 1 })));
  }, [populationMean, populationStdDev, sampleSize, confidenceLevel]);

  const coverage = useMemo(() => {
    if (simulations.length === 0) return 0;
    const contained = simulations.filter(s => s.containsTrueMean).length;
    return (contained / simulations.length) * 100;
  }, [simulations]);
  
  const handleConfidenceChange = (value: number[]) => {
    const level = [80, 90, 95, 99].sort((a, b) => Math.abs(a - value[0]) - Math.abs(b - value[0]))[0];
    setConfidenceLevel(level);
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Target /> Whiskerfang Fish Netting</CardTitle>
                <CardDescription>
                  We're trying to estimate the average length of Whiskerfang fish. Each net-cast (sample) gives us an interval. How many intervals contain the true average length?
                </CardDescription>
              </CardHeader>
            </Card>
            <div className="space-y-4">
              <label className="block font-medium">True Average Fish Length (μ): <span className="text-primary font-bold">{populationMean.toFixed(1)} cm</span></label>
              <Slider value={[populationMean]} onValueChange={(v) => setPopulationMean(v[0])} min={10} max={100} step={1} />
            </div>
            <div className="space-y-4">
              <label className="block font-medium">Length Variation (σ): <span className="text-primary font-bold">{populationStdDev.toFixed(1)} cm</span></label>
              <Slider value={[populationStdDev]} onValueChange={(v) => setPopulationStdDev(v[0])} min={1} max={30} step={0.5} />
            </div>
            <div className="space-y-4">
              <label className="block font-medium">Fish per Net (n): <span className="text-primary font-bold">{sampleSize}</span></label>
              <Slider value={[sampleSize]} onValueChange={(v) => setSampleSize(v[0])} min={5} max={200} step={5} />
            </div>
            <div className="space-y-4">
              <label className="block font-medium">Confidence Level: <span className="text-primary font-bold">{confidenceLevel}%</span></label>
              <Slider value={[confidenceLevel]} onValueChange={handleConfidenceChange} min={80} max={99} step={1} />
            </div>
            <div className="flex gap-2">
                <Button onClick={() => runSimulation(1)} className="w-full">Cast 1 Net</Button>
                <Button onClick={() => runSimulation(100)} className="w-full">Cast 100 Nets</Button>
            </div>
            <Button variant="outline" onClick={() => setSimulations([])} className="w-full">Reset</Button>
          </div>
          <div className="lg:col-span-2 min-h-[500px] space-y-4">
             <h3 className="text-lg font-semibold mb-2 text-center">Confidence Interval Simulations (last 100)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
                <CartesianGrid />
                <XAxis type="number" dataKey="mean" name="Sample Mean" unit="cm" domain={['dataMin - 5', 'dataMax + 5']} label={{ value: 'Confidence Interval for μ', position: 'insideBottom', offset: -10 }} />
                <YAxis type="number" dataKey="id" name="Simulation #" reversed domain={[0, 101]} tick={false} label={{ value: 'Simulations', angle: -90, position: 'insideLeft' }} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} content={<CustomTooltip />} />
                <ReferenceLine x={populationMean} stroke="hsl(var(--destructive))" strokeWidth={2} strokeDasharray="4 4" label={{ value: "True Mean (μ)", position: 'insideTopRight', fill: 'hsl(var(--destructive))' }} />
                <Scatter data={simulations} fill="hsl(var(--primary))" shape={<CustomShape />} />
              </ScatterChart>
            </ResponsiveContainer>
             <Card>
                <CardHeader>
                  <CardTitle>Simulation Results</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center pt-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Simulations Run</p>
                    <p className="text-2xl font-bold">{simulations.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Actual Coverage</p>
                    <p className="text-2xl font-bold">{coverage.toFixed(1)}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Confidence Level</p>
                    <p className="text-2xl font-bold">{confidenceLevel}%</p>
                  </div>
                </CardContent>
              </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-card text-card-foreground border p-2 rounded shadow-lg">
        <p className="font-bold">Simulation #{data.id}</p>
        <p>Sample Mean: {data.mean.toFixed(2)}</p>
        <p>Interval: [{data.lower.toFixed(2)}, {data.upper.toFixed(2)}]</p>
        <p style={{ color: data.containsTrueMean ? 'hsl(var(--primary))' : 'hsl(var(--destructive))' }}>
          {data.containsTrueMean ? 'Contains true mean' : 'Does NOT contain true mean'}
        </p>
      </div>
    );
  }
  return null;
};

export default ConfidenceIntervalsSimulation;

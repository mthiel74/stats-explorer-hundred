
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Line } from 'recharts';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

// Sigmoid function
const sigmoid = (z: number) => 1 / (1 + Math.exp(-z));

const generateData = (count = 50) => {
    const data = [];
    for (let i = 0; i < count; i++) {
        const studyHours = Math.random() * 10;
        // More likely to pass with more study hours
        const passProbability = sigmoid((studyHours - 5) * 1.5);
        const passed = Math.random() < passProbability ? 1 : 0;
        data.push({ studyHours, passed });
    }
    return data;
};

const LogisticRegressionSimulation = () => {
  const [data, setData] = useState(generateData(100));
  // These are just for visualization, not a real fit
  const [slope, setSlope] = useState(1.5);
  const [intercept, setIntercept] = useState(-7.5); // equivalent to -5 * 1.5

  const logisticCurveData = useMemo(() => {
    return Array.from({ length: 101 }, (_, i) => {
      const x = i * 0.1; // study hours from 0 to 10
      const z = slope * x + intercept;
      return { x, y: sigmoid(z) };
    });
  }, [slope, intercept]);

  const passedData = data.filter(d => d.passed === 1).map(d => ({ x: d.studyHours, y: 1 }));
  const failedData = data.filter(d => d.passed === 0).map(d => ({ x: d.studyHours, y: 0 }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Logistic Regression Simulation</CardTitle>
        <p className="text-sm text-muted-foreground">Predicting Pass/Fail based on Study Hours</p>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="Study Hours" unit="h" domain={[0, 10]} />
              <YAxis type="number" dataKey="y" name="Outcome" domain={[-0.1, 1.1]} ticks={[0, 1]} tickFormatter={(val) => val === 1 ? 'Pass' : 'Fail'} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Failed" data={failedData} fill="#ff7300" shape="cross" />
              <Scatter name="Passed" data={passedData} fill="#387908" shape="star" />
              <Line type="monotone" dataKey="y" data={logisticCurveData} stroke="#8884d8" strokeWidth={2} dot={false} name="Logistic Curve" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium mb-2">Slope (Steepness): {slope.toFixed(2)}</label>
                <Slider value={[slope]} onValueChange={(v) => setSlope(v[0])} min={0.1} max={5} step={0.1} />
            </div>
            <div>
                <label className="block text-sm font-medium mb-2">Intercept (Position): {intercept.toFixed(2)}</label>
                <Slider value={[intercept]} onValueChange={(v) => setIntercept(v[0])} min={-15} max={0} step={0.25} />
            </div>
        </div>
        <div className="text-center">
            <Button onClick={() => setData(generateData(100))}>Generate New Data</Button>
        </div>
        <div className="text-sm text-muted-foreground">
            <p><strong>Logistic Regression</strong> is used for binary classification. It models the probability of an outcome using the logistic (sigmoid) function. Adjust the sliders to see how the curve changes to fit the data points representing students who passed or failed an exam based on their study hours.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogisticRegressionSimulation;

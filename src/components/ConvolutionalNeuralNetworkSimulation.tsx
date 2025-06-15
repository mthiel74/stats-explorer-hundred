
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, RotateCw, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

const INPUT_SIZE = 7;
const KERNEL_SIZE = 3;
const OUTPUT_SIZE = INPUT_SIZE - KERNEL_SIZE + 1;

const initialInput = [
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
];

const kernel = [
  [-1, -1, -1],
  [ 0,  0,  0],
  [ 1,  1,  1],
];

const ConvolutionalNeuralNetworkSimulation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [output, setOutput] = useState(() => Array(OUTPUT_SIZE).fill(0).map(() => Array(OUTPUT_SIZE).fill(0)));
  const [animStep, setAnimStep] = useState(-1);

  const reset = useCallback(() => {
    setIsAnimating(false);
    setAnimStep(-1);
    setOutput(Array(OUTPUT_SIZE).fill(0).map(() => Array(OUTPUT_SIZE).fill(0)));
  }, []);

  useEffect(() => {
    if (isAnimating && animStep < OUTPUT_SIZE * OUTPUT_SIZE - 1) {
      const timer = setTimeout(() => setAnimStep(s => s + 1), 100);
      return () => clearTimeout(timer);
    }
    if (animStep >= OUTPUT_SIZE * OUTPUT_SIZE - 1) {
      setIsAnimating(false);
    }
  }, [isAnimating, animStep]);
  
  const kernelY = animStep >= 0 ? Math.floor(animStep / OUTPUT_SIZE) : -1;
  const kernelX = animStep >= 0 ? animStep % OUTPUT_SIZE : -1;

  useEffect(() => {
    if (kernelX !== -1) {
      let sum = 0;
      for (let i = 0; i < KERNEL_SIZE; i++) {
        for (let j = 0; j < KERNEL_SIZE; j++) {
          sum += initialInput[kernelY + i][kernelX + j] * kernel[i][j];
        }
      }
      setOutput(prev => {
        const newOutput = JSON.parse(JSON.stringify(prev));
        newOutput[kernelY][kernelX] = sum;
        return newOutput;
      });
    }
  }, [animStep, kernelX, kernelY]);

  const Grid = ({ data, highlightY = -1, highlightX = -1, highlightSize = 0, label }: any) => (
    <div>
      <p className="text-center font-semibold mb-2">{label}</p>
      <div className="relative">
        <div className="grid border" style={{ gridTemplateColumns: `repeat(${data.length}, minmax(0, 1fr))` }}>
          {data.map((row: number[], y: number) =>
            row.map((val, x) => (
              <div key={`${y}-${x}`} className="w-8 h-8 flex items-center justify-center border" style={{ backgroundColor: `rgba(75, 85, 99, ${Math.abs(val / 4)})` }}>
                <span className="text-xs text-white">{val.toFixed(0)}</span>
              </div>
            ))
          )}
        </div>
        {highlightY !== -1 && (
          <div className="absolute border-2 border-yellow-400 pointer-events-none" style={{
            top: `${highlightY * (100 / data.length)}%`,
            left: `${highlightX * (100 / data.length)}%`,
            width: `${highlightSize * (100 / data.length)}%`,
            height: `${highlightSize * (100 / data.length)}%`,
          }}/>
        )}
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><BrainCircuit /> Convolutional Neural Network (CNN)</CardTitle>
        <CardDescription>Visualizing a convolution operation, where a filter (kernel) slides over an input image to create a feature map.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row justify-around items-center gap-6">
          <Grid data={initialInput} highlightY={kernelY} highlightX={kernelX} highlightSize={KERNEL_SIZE} label="Input Image" />
          <Grid data={kernel} label="Kernel (Filter)" />
          <Grid data={output} highlightY={kernelY} highlightX={kernelX} highlightSize={1} label="Feature Map" />
        </div>
        <div className="flex gap-2 justify-center mt-6">
          <Button onClick={() => setIsAnimating(true)} disabled={isAnimating || animStep >= OUTPUT_SIZE * OUTPUT_SIZE -1}>
            <Play className="mr-2" /> Animate
          </Button>
          <Button variant="outline" onClick={reset}>
            <RotateCw className="mr-2" /> Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConvolutionalNeuralNetworkSimulation;

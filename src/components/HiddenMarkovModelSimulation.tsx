
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sun, CloudRain, Footprints, ShoppingCart, Sparkles, ArrowRight } from 'lucide-react';

const HMM_CONFIG = {
  states: ['Sunny', 'Rainy'],
  observations: ['Walk', 'Shop', 'Clean'],
  transition_matrix: {
    Sunny: { Sunny: 0.7, Rainy: 0.3 },
    Rainy: { Sunny: 0.4, Rainy: 0.6 },
  },
  emission_matrix: {
    Sunny: { Walk: 0.6, Shop: 0.3, Clean: 0.1 },
    Rainy: { Walk: 0.1, Shop: 0.4, Clean: 0.5 },
  },
};

const IconMap: { [key: string]: React.ReactNode } = {
  Sunny: <Sun className="w-8 h-8 text-yellow-500" />,
  Rainy: <CloudRain className="w-8 h-8 text-blue-500" />,
  Walk: <Footprints className="w-8 h-8 text-green-600" />,
  Shop: <ShoppingCart className="w-8 h-8 text-purple-600" />,
  Clean: <Sparkles className="w-8 h-8 text-pink-600" />,
};

const getRandomState = (dist: { [key: string]: number }): string => {
  const rand = Math.random();
  let cumulative = 0;
  for (const state in dist) {
    cumulative += dist[state];
    if (rand < cumulative) {
      return state;
    }
  }
  return Object.keys(dist)[0];
};

const HiddenMarkovModelSimulation = () => {
  const [currentState, setCurrentState] = useState('Sunny');
  const [sequence, setSequence] = useState<{ state: string, observation: string }[]>([]);

  const runStep = useCallback(() => {
    const observation = getRandomState(HMM_CONFIG.emission_matrix[currentState as 'Sunny' | 'Rainy']);
    const nextState = getRandomState(HMM_CONFIG.transition_matrix[currentState as 'Sunny' | 'Rainy']);
    
    setSequence(prev => [...prev, { state: currentState, observation }]);
    setCurrentState(nextState);
  }, [currentState]);

  const reset = () => {
    setCurrentState('Sunny');
    setSequence([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hidden Markov Model Simulation</CardTitle>
        <CardDescription>
          Observing activities to infer the weather. The weather is a "hidden" state that we can't see directly, but we can observe activities which depend on the weather.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center gap-4 mb-8">
          <Button onClick={runStep}>Generate Next Observation</Button>
          <Button onClick={reset} variant="outline">Reset</Button>
        </div>

        <div className="grid grid-cols-3 items-center text-center gap-4 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Previous State</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center gap-2">
                {sequence.length > 0 ? IconMap[sequence[sequence.length-1].state] : 'Start'}
                <span className="font-bold">{sequence.length > 0 ? sequence[sequence.length-1].state : ''}</span>
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-center">
            <ArrowRight className="w-12 h-12" />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Current Hidden State</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center items-center gap-2">
                {IconMap[currentState]}
                <span className="font-bold">{currentState}</span>
              </div>
              <p className="text-sm text-muted-foreground">(This is what we want to infer)</p>
            </CardContent>
          </Card>
        </div>

        {sequence.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Generated Sequence of Observations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {sequence.map((item, index) => (
                  <div key={index} className="flex flex-col items-center p-2 border rounded-md">
                     {IconMap[item.observation]}
                     <span className="text-sm">{item.observation}</span>
                     <span className="text-xs text-muted-foreground">(from {item.state})</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
};

export default HiddenMarkovModelSimulation;

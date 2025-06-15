
import React, { useState, useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Let's define some animal species with average weights
const animalPopulation = Array.from({ length: 200 }, (_, i) => {
  const species = i % 4; // 4 species
  let baseWeight, speciesName, color;
  switch (species) {
    case 0: // Squirrels
      baseWeight = 0.5;
      speciesName = 'Squirrel';
      color = '#8884d8';
      break;
    case 1: // Rabbits
      baseWeight = 2;
      speciesName = 'Rabbit';
      color = '#82ca9d';
      break;
    case 2: // Foxes
      baseWeight = 8;
      speciesName = 'Fox';
      color = '#ffc658';
      break;
    default: // Deer
      baseWeight = 70;
      speciesName = 'Deer';
      color = '#ff8042';
      break;
  }
  return {
    id: i,
    species: speciesName,
    weight: baseWeight + (Math.random() - 0.5) * baseWeight * 0.2, // Add some variance
    x: Math.random() * 100,
    y: Math.random() * 100,
    color: color
  };
});

const SamplingSimulation = () => {
  const [sampleSize, setSampleSize] = useState(30);
  const [samplingMethod, setSamplingMethod] = useState('simple');
  const [sample, setSample] = useState<typeof animalPopulation>([]);

  const populationMean = useMemo(() => animalPopulation.reduce((acc, animal) => acc + animal.weight, 0) / animalPopulation.length, []);

  const takeSample = () => {
    let newSample: typeof animalPopulation = [];
    if (samplingMethod === 'simple') {
      const shuffled = [...animalPopulation].sort(() => 0.5 - Math.random());
      newSample = shuffled.slice(0, sampleSize);
    } else if (samplingMethod === 'stratified') {
      const strata: { [key: string]: typeof animalPopulation } = {};
      animalPopulation.forEach(animal => {
        if (!strata[animal.species]) {
          strata[animal.species] = [];
        }
        strata[animal.species].push(animal);
      });

      const totalPopulation = animalPopulation.length;
      Object.values(strata).forEach((stratum) => {
        const stratumProportion = stratum.length / totalPopulation;
        const stratumSampleSize = Math.round(stratumProportion * sampleSize);
        const shuffled = [...stratum].sort(() => 0.5 - Math.random());
        newSample.push(...shuffled.slice(0, stratumSampleSize));
      });
    }
    setSample(newSample);
  };

  useEffect(() => {
    takeSample();
  }, []);
  
  const sampleMean = useMemo(() => {
    if (sample.length === 0) return 0;
    return sample.reduce((acc, animal) => acc + animal.weight, 0) / sample.length;
  }, [sample]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sampling Methods Simulation</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid md:grid-cols-3 gap-4 items-center">
          <div>
            <label htmlFor="sample-size" className="block text-sm font-medium text-muted-foreground mb-2">Sample Size: {sampleSize}</label>
            <Slider
              id="sample-size"
              min={10}
              max={100}
              step={5}
              value={[sampleSize]}
              onValueChange={(val) => setSampleSize(val[0])}
            />
          </div>
          <div>
            <label htmlFor="sampling-method" className="block text-sm font-medium text-muted-foreground mb-2">Sampling Method</label>
            <Select value={samplingMethod} onValueChange={setSamplingMethod}>
              <SelectTrigger>
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="simple">Simple Random Sampling</SelectItem>
                <SelectItem value="stratified">Stratified Sampling</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="self-end">
            <Button onClick={takeSample} className="w-full">Take New Sample</Button>
          </div>
        </div>
        
        <div className="w-full h-96">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="Location X" domain={[0, 100]} tick={false} label={{ value: 'Habitat Area', position: 'insideBottom', offset: -10 }} />
              <YAxis type="number" dataKey="y" name="Location Y" domain={[0, 100]} tick={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name="Population" data={animalPopulation} fillOpacity={0.3} fill="#a4a4a4" shape="circle" />
              {sample.length > 0 && <Scatter name="Sample" data={sample} fill="#8884d8" shape="star" />}
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 text-center">
            <Card>
                <CardHeader><CardTitle>Population Mean Weight</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold">{populationMean.toFixed(2)} kg</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Sample Mean Weight</CardTitle></CardHeader>
                <CardContent><p className="text-2xl font-bold">{sampleMean.toFixed(2)} kg</p></CardContent>
            </Card>
        </div>
        {samplingMethod === 'stratified' && (
            <div className="text-sm text-muted-foreground">
                <p><strong>Stratified Sampling:</strong> The population is divided into subgroups (strata) based on shared characteristics (here, species). A random sample is then drawn from each stratum. This ensures representation from all key groups.</p>
            </div>
        )}
        {samplingMethod === 'simple' && (
            <div className="text-sm text-muted-foreground">
                <p><strong>Simple Random Sampling:</strong> Every individual in the population has an equal chance of being selected. It's like drawing names out of a hat.</p>
            </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SamplingSimulation;

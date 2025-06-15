
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Cat, Dog, Fish, Bird, Settings, BrainCircuit } from 'lucide-react';
import { Button } from '@/components/ui/button';

const supervisedData = [
  { id: 1, icon: <Cat className="w-8 h-8 text-orange-500" />, label: 'Cat', x: 10, y: 20 },
  { id: 2, icon: <Dog className="w-8 h-8 text-blue-500" />, label: 'Dog', x: 25, y: 60 },
  { id: 3, icon: <Cat className="w-8 h-8 text-orange-500" />, label: 'Cat', x: 15, y: 30 },
  { id: 4, icon: <Dog className="w-8 h-8 text-blue-500" />, label: 'Dog', x: 35, y: 75 },
];

const unsupervisedData = [
    { id: 1, icon: <Fish className="w-8 h-8 text-cyan-500" />, x: 10, y: 20 },
    { id: 2, icon: <Bird className="w-8 h-8 text-purple-500" />, x: 80, y: 80 },
    { id: 3, icon: <Fish className="w-8 h-8 text-cyan-500" />, x: 20, y: 15 },
    { id: 4, icon: <Bird className="w-8 h-8 text-purple-500" />, x: 90, y: 70 },
    { id: 5, icon: <Fish className="w-8 h-8 text-cyan-500" />, x: 15, y: 25 },
    { id: 6, icon: <Bird className="w-8 h-8 text-purple-500" />, x: 85, y: 85 },
];

const MachineLearningSimulation = () => {
    const [isTrained, setIsTrained] = useState(false);
    const [isClustered, setIsClustered] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><BrainCircuit /> Machine Learning Concepts</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="supervised">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="supervised">Supervised Learning</TabsTrigger>
            <TabsTrigger value="unsupervised">Unsupervised Learning</TabsTrigger>
          </TabsList>
          <TabsContent value="supervised">
            <Card>
              <CardHeader>
                <CardTitle>Classification Example</CardTitle>
                <p className="text-sm text-muted-foreground">Training a model to distinguish between cats and dogs using labeled data.</p>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 bg-gray-100 rounded-lg p-4 border-dashed border-2">
                  {supervisedData.map(item => (
                    <div key={item.id} className="absolute transition-all" style={{ left: `${item.x}%`, top: `${item.y}%` }}>
                        {item.icon}
                        {isTrained && <span className="text-xs font-bold ml-1 animate-fade-in">{item.label}</span>}
                    </div>
                  ))}
                  {isTrained && <div className="absolute top-1/2 left-0 w-full h-px bg-gray-400 origin-left animate-scale-in" style={{ transform: 'rotate(-35deg) scaleX(1.2)' }} />}
                  <div className="absolute bottom-4 right-4">
                    <Button onClick={() => setIsTrained(!isTrained)}><Settings className="mr-2 h-4 w-4" /> {isTrained ? "Reset Model" : "Train Model"}</Button>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">In supervised learning, we provide the algorithm with data that is already labeled with the correct outcome. The model learns the relationship between the features and the labels to make predictions on new, unlabeled data.</p>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="unsupervised">
            <Card>
              <CardHeader>
                <CardTitle>Clustering Example</CardTitle>
                <p className="text-sm text-muted-foreground">Finding hidden patterns in unlabeled data.</p>
              </CardHeader>
              <CardContent>
                <div className="relative h-64 bg-gray-100 rounded-lg p-4 border-dashed border-2">
                  {unsupervisedData.map(item => (
                    <div key={item.id} className="absolute transition-all" style={{ left: `${item.x}%`, top: `${item.y}%` }}>
                      {item.icon}
                    </div>
                  ))}
                  {isClustered && (
                      <>
                        <div className="absolute top-5 left-5 w-2/5 h-2/5 border-2 border-cyan-500 border-dashed rounded-full animate-scale-in" />
                        <div className="absolute bottom-5 right-5 w-2/5 h-2/5 border-2 border-purple-500 border-dashed rounded-full animate-scale-in" />
                      </>
                  )}
                  <div className="absolute bottom-4 right-4">
                    <Button onClick={() => setIsClustered(!isClustered)}><Settings className="mr-2 h-4 w-4" /> {isClustered ? "Reset" : "Find Clusters"}</Button>
                  </div>
                </div>
                <p className="mt-4 text-sm text-muted-foreground">In unsupervised learning, the algorithm is given data without any labels and must find structure on its own. Clustering is a common task, where the goal is to group similar data points together.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default MachineLearningSimulation;

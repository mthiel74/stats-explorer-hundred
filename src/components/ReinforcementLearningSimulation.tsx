
```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Bot, Star, XCircle, Play, RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';

const GRID_SIZE = 5;
const GOAL_POS = { x: 4, y: 4 };
const START_POS = { x: 0, y: 0 };
const OBSTACLES = [{ x: 2, y: 1 }, { x: 1, y: 3 }, { x: 3, y: 3 }];

type QTable = number[][][]; // state (y * GRID_SIZE + x) -> action -> q-value
type Policy = number[][]; // y -> x -> best action

const actions = ['up', 'down', 'left', 'right']; // 0, 1, 2, 3

const ReinforcementLearningSimulation = () => {
    const [qTable, setQTable] = useState<QTable>(() => Array(GRID_SIZE * GRID_SIZE).fill(0).map(() => Array(4).fill(0)));
    const [policy, setPolicy] = useState<Policy>(() => Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(-1)));
    const [isTraining, setIsTraining] = useState(false);
    const [trainingProgress, setTrainingProgress] = useState(0);
    const [episodes, setEpisodes] = useState(0);

    const reset = useCallback(() => {
        setQTable(Array(GRID_SIZE * GRID_SIZE).fill(0).map(() => Array(4).fill(0)));
        setPolicy(Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(-1)));
        setIsTraining(false);
        setTrainingProgress(0);
        setEpisodes(0);
    }, []);

    const getReward = (x: number, y: number) => {
        if (x === GOAL_POS.x && y === GOAL_POS.y) return 100;
        if (OBSTACLES.some(obs => obs.x === x && obs.y === y)) return -100;
        return -1; // cost of moving
    };

    const derivePolicy = useCallback((currentQTable: QTable) => {
        const newPolicy: Policy = Array(GRID_SIZE).fill(0).map(() => Array(GRID_SIZE).fill(-1));
        for (let y = 0; y < GRID_SIZE; y++) {
            for (let x = 0; x < GRID_SIZE; x++) {
                if (OBSTACLES.some(obs => obs.x === x && obs.y === y)) continue;
                const state = y * GRID_SIZE + x;
                const bestAction = currentQTable[state].indexOf(Math.max(...currentQTable[state]));
                newPolicy[y][x] = bestAction;
            }
        }
        setPolicy(newPolicy);
    }, []);

    const trainStep = useCallback(() => {
        let currentQTable = JSON.parse(JSON.stringify(qTable));
        const learningRate = 0.1;
        const discountFactor = 0.9;
        const epsilon = 0.1;

        for (let i = 0; i < 10; i++) {
            const currentState = Math.floor(Math.random() * GRID_SIZE * GRID_SIZE);
            
            let action;
            if (Math.random() < epsilon) {
                action = Math.floor(Math.random() * 4);
            } else {
                action = currentQTable[currentState].indexOf(Math.max(...currentQTable[currentState]));
            }

            let { x, y } = { x: currentState % GRID_SIZE, y: Math.floor(currentState / GRID_SIZE) };
            
            let newX = x, newY = y;
            if (action === 0 && y > 0) newY--;
            if (action === 1 && y < GRID_SIZE - 1) newY++;
            if (action === 2 && x > 0) newX--;
            if (action === 3 && x < GRID_SIZE - 1) newX++;
            
            const reward = getReward(newX, newY);
            const newState = newY * GRID_SIZE + newX;
            
            const oldQValue = currentQTable[currentState][action];
            const maxFutureQ = Math.max(...currentQTable[newState]);
            const newQValue = oldQValue + learningRate * (reward + discountFactor * maxFutureQ - oldQValue);
            
            currentQTable[currentState][action] = newQValue;
        }

        setQTable(currentQTable);
        setEpisodes(prev => prev + 10);
        derivePolicy(currentQTable);
    }, [qTable, derivePolicy]);

    useEffect(() => {
        if (isTraining && trainingProgress < 100) {
            const timer = setTimeout(() => {
                trainStep();
                setTrainingProgress(p => p + 1);
            }, 50);
            return () => clearTimeout(timer);
        }
        if (trainingProgress >= 100) {
            setIsTraining(false);
        }
    }, [isTraining, trainingProgress, trainStep]);

    const getArrow = (action: number) => {
        switch (action) {
            case 0: return '↑';
            case 1: return '↓';
            case 2: return '←';
            case 3: return '→';
            default: return '';
        }
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bot /> Reinforcement Learning</CardTitle>
                <CardDescription>
                    An agent learns to navigate a grid to reach a goal by receiving rewards or penalties for its actions.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <div className="grid gap-0.5 bg-border" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}>
                            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
                                const x = i % GRID_SIZE;
                                const y = Math.floor(i / GRID_SIZE);
                                const isGoal = x === GOAL_POS.x && y === GOAL_POS.y;
                                const isObstacle = OBSTACLES.some(obs => obs.x === x && obs.y === y);
                                return (
                                    <div key={i} className={cn("relative w-full aspect-square flex items-center justify-center",
                                        isGoal ? 'bg-green-200' : isObstacle ? 'bg-slate-600' : 'bg-background'
                                    )}>
                                        {isGoal && <Star className="w-6 h-6 text-yellow-500" />}
                                        {isObstacle && <XCircle className="w-6 h-6 text-red-500" />}
                                        <span className="absolute text-xl font-bold opacity-70">
                                            {policy[y]?.[x] !== -1 && !isGoal && !isObstacle && getArrow(policy[y][x])}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            The agent explores the environment. Through trial and error (Q-learning), it builds a policy (the arrows) indicating the best action to take from any square to maximize its future rewards.
                        </p>
                        <div className="flex gap-2">
                           <Button onClick={() => setIsTraining(true)} disabled={isTraining || trainingProgress === 100}>
                                <Play className="mr-2" /> Train Agent
                            </Button>
                            <Button variant="outline" onClick={reset}>
                                <RotateCw className="mr-2" /> Reset
                            </Button>
                        </div>
                        <div className="space-y-1">
                            <Label>Training Progress (1000 Episodes)</Label>
                            <div className="w-full bg-muted rounded-full h-2.5">
                                <div className="bg-primary h-2.5 rounded-full" style={{ width: `${trainingProgress}%` }}></div>
                            </div>
                            <p className="text-xs text-muted-foreground">Episodes: {episodes}</p>
                        </div>
                        <div className="flex gap-4 text-sm">
                            <div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500" /> Goal</div>
                            <div className="flex items-center gap-2"><XCircle className="w-4 h-4 text-red-500" /> Obstacle</div>
                            <div className="flex items-center gap-2"><span className="text-xl font-bold">→</span> Policy</div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReinforcementLearningSimulation;
```


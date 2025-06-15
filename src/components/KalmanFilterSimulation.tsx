
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

const KalmanFilterSimulation = () => {
    const [data, setData] = useState<any[]>([]);
    const [processNoise, setProcessNoise] = useState(0.1);
    const [measurementNoise, setMeasurementNoise] = useState(2);
    const [isSimulating, setIsSimulating] = useState(false);

    const runSimulation = () => {
        setIsSimulating(true);
        const dt = 1;
        let x_true = 0; // true position
        let v_true = 1; // true velocity

        // Kalman filter state
        let x_est = 0; // estimated position
        let v_est = 1; // estimated velocity
        let P_pos = 1; // covariance of position
        let P_vel = 1; // covariance of velocity

        const results = [];

        for (let t = 0; t < 50; t++) {
            // --- Simulation (Truth) ---
            v_true += (Math.random() - 0.5) * processNoise;
            x_true += v_true * dt;
            const z_measured = x_true + (Math.random() - 0.5) * measurementNoise;

            // --- Kalman Filter ---
            // Prediction
            const x_pred = x_est + v_est * dt;
            const v_pred = v_est;
            P_pos += dt * dt * P_vel + processNoise;
            P_vel += processNoise;
            
            // Update
            const K_pos = P_pos / (P_pos + measurementNoise); // Kalman Gain for position
            x_est = x_pred + K_pos * (z_measured - x_pred);
            const K_vel = (dt * P_vel) / (P_pos + measurementNoise); // Kalman Gain for velocity
            v_est = v_pred + K_vel * (z_measured - x_pred);

            P_pos = (1 - K_pos) * P_pos;
            P_vel = (1 - K_vel) * P_vel;

            results.push({
                time: t,
                true: x_true,
                measured: z_measured,
                estimated: x_est,
            });
        }
        setData(results);
        setIsSimulating(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Kalman Filter Simulation</CardTitle>
                <CardDescription>Estimating the position of a moving object from noisy measurements.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                        <Label>Process Noise: {processNoise.toFixed(2)}</Label>
                        <Slider value={[processNoise]} onValueChange={v => setProcessNoise(v[0])} min={0} max={1} step={0.05} />
                        <Label>Measurement Noise: {measurementNoise.toFixed(2)}</Label>
                        <Slider value={[measurementNoise]} onValueChange={v => setMeasurementNoise(v[0])} min={0.1} max={10} step={0.1} />

                        <Button onClick={runSimulation} disabled={isSimulating} className="w-full">
                            {isSimulating ? 'Running...' : 'Run Simulation'}
                        </Button>
                        <Button variant="outline" onClick={() => setData([])} className="w-full">Clear</Button>
                    </div>
                    <div className="md:col-span-2">
                        <ResponsiveContainer width="100%" height={400}>
                            <LineChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis type="number" dataKey="time" name="Time" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="true" stroke="#8884d8" name="True Position" dot={false} />
                                <Line type="monotone" dataKey="measured" stroke="#82ca9d" name="Measured" strokeDasharray="5 5" dot={false} />
                                <Line type="monotone" dataKey="estimated" stroke="#ffc658" name="Kalman Estimate" dot={false} strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default KalmanFilterSimulation;

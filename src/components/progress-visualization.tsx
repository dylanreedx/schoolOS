'use client';

import {useState, useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function ProgressVisualization() {
  const [data, setData] = useState<
    {
      name: string;
      hours: number;
    }[]
  >([]);

  useEffect(() => {
    fetch('/api/study-sessions')
      .then((response) => response.json())
      .then((sessions) => {
        const subjectHours = sessions.reduce(
          (
            acc: {[x: string]: number},
            session: {subject: string | number; duration: number}
          ) => {
            if (!acc[session.subject]) {
              acc[session.subject] = 0;
            }
            acc[session.subject] += session.duration / 60; // Convert minutes to hours
            return acc;
          },
          {}
        );

        const chartData = Object.entries(subjectHours).map(([name, hours]) => ({
          name,
          hours: Number((hours as number).toFixed(1)),
        }));

        setData(chartData);
      });
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Study Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Bar dataKey='hours' fill='#8884d8' />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}

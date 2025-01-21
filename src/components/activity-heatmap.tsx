'use client';

import {useState, useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

export function ActivityHeatmap() {
  const [data, setData] = useState<{date: string; value: number}[]>([]);

  useEffect(() => {
    fetch('/api/study-sessions')
      .then((response) => response.json())
      .then((sessions) => {
        const heatmapData = new Array(7).fill(0).map((_, index) => {
          const date = new Date();
          date.setDate(date.getDate() - (6 - index));
          return {
            date: date.toISOString().split('T')[0],
            value: 0,
          };
        });

        sessions.forEach((session: {date: string; duration: number}) => {
          const index = heatmapData.findIndex(
            (day) => day.date === session.date
          );
          if (index !== -1) {
            heatmapData[index].value += session.duration / 60;
          }
        });

        setData(heatmapData);
      });
  }, []);

  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle>Activity Heatmap (Weekly)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='flex flex-wrap gap-1'>
          {data.map((day, index) => (
            <div
              key={index}
              className={`w-10 h-10 rounded-sm ${
                day.value === 0
                  ? 'bg-gray-200 dark:bg-gray-700'
                  : day.value <= 1
                  ? 'bg-green-200 dark:bg-green-900'
                  : day.value <= 2
                  ? 'bg-green-300 dark:bg-green-800'
                  : day.value <= 3
                  ? 'bg-green-400 dark:bg-green-700'
                  : 'bg-green-500 dark:bg-green-600'
              }`}
              title={`${day.date}: ${day.value.toFixed(1)} hours`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

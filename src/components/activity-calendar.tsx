'use client';

import {useState, useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';

type ActivityDay = {
  date: string;
  totalDuration: number;
  sessions: {
    subject: string;
    duration: number;
    notes?: string;
  }[];
};

export function ActivityCalendar() {
  const [data, setData] = useState<ActivityDay[]>([]);

  useEffect(() => {
    fetch('/api/study-sessions')
      .then((response) => response.json())
      .then((sessions) => {
        const last30Days = [...Array(30)]
          .map((_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
          })
          .reverse();

        const activityData = last30Days.map((date) => {
          const daySessions = sessions.filter(
            (s: {date: string}) => s.date === date
          );
          return {
            date,
            totalDuration: daySessions.reduce(
              (
                sum: number,
                s: {
                  duration: number;
                }
              ) => sum + s.duration,
              0
            ),
            sessions: daySessions.map(
              (s: {subject: string; duration: number; notes: string}) => ({
                subject: s.subject,
                duration: s.duration,
                notes: s.notes,
              })
            ),
          };
        });

        setData(activityData);
      });
  }, []);

  const getColorIntensity = (duration: number) => {
    const maxDuration = Math.max(...data.map((d) => d.totalDuration));
    const intensity = duration / maxDuration;
    return `rgba(34, 197, 94, ${intensity})`;
  };

  return (
    <Card className='h-fit'>
      <CardHeader>
        <CardTitle>Activity Calendar (Last 30 Days)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='grid grid-cols-7 gap-2'>
          {data.map((day, index) => (
            <Popover key={index}>
              <PopoverTrigger>
                <div
                  className='w-12 h-12 rounded-full flex items-center justify-center text-xs font-semibold'
                  style={{
                    backgroundColor: getColorIntensity(day.totalDuration),
                  }}
                >
                  {new Date(day.date).getDate()}
                </div>
              </PopoverTrigger>
              <PopoverContent>
                <div className='p-2'>
                  <h3 className='font-bold'>{day.date}</h3>
                  <p className='text-sm'>
                    Total: {(day.totalDuration / 60).toFixed(1)} hours
                  </p>
                  {day.sessions.map((session, i) => (
                    <div key={i} className='mt-2'>
                      <p className='text-sm font-semibold'>{session.subject}</p>
                      <p className='text-xs'>
                        {(session.duration / 60).toFixed(1)} hours
                      </p>
                      {session.notes && (
                        <p className='text-xs italic'>{session.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

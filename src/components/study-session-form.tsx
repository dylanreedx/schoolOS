'use client';

import {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useRouter} from 'next/navigation';
import {ClassPicker} from './ui/class-picker';
import {useQuery} from '@tanstack/react-query';
import {classOptions} from '@/lib/options/class';

export function StudySessionForm() {
  const {data: classes} = useQuery(classOptions);
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch('/api/study-sessions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({subject, duration: Number.parseInt(duration)}),
    });
    if (response.ok) {
      setSubject('');
      setDuration('');
      router.refresh();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log Study Session</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-2'>
            <ClassPicker
              classes={classes}
              onChange={(c) => setSubject(c.name)}
              selectedClass={subject}
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='duration'>Duration (minutes)</Label>
            <Input
              id='duration'
              type='number'
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <Button type='submit'>Log Session</Button>
        </form>
      </CardContent>
    </Card>
  );
}

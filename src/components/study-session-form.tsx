'use client';

import {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {useRouter} from 'next/navigation';
import {ClassPicker} from './ui/class-picker';

export function StudySessionForm() {
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [classes, setClasses] = useState<[]>([]);
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

  useEffect(() => {
    fetch('/api/classes')
      .then((res) => res.json())
      .then((data) => setClasses(data));
  }, []);

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

'use client';

import {useState, useEffect} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Class} from '@/db/schema';
import {Trash2} from 'lucide-react';

export function ClassManager() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [newClassName, setNewClassName] = useState('');

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const response = await fetch('/api/classes');
    if (response.ok) {
      const fetchedClasses = await response.json();
      setClasses(fetchedClasses);
    }
  };

  const addClass = async () => {
    if (!newClassName) return;

    const response = await fetch('/api/classes', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: newClassName}),
    });

    if (response.ok) {
      const newClass = await response.json();
      setClasses([...classes, newClass]);
      setNewClassName('');
    }
  };

  const removeClass = async (id: number) => {
    const response = await fetch('/api/classes', {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id}),
    });

    if (response.ok) {
      setClasses(classes.filter((cls) => cls.id !== id));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage Classes</CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          <div className='flex space-x-2'>
            <Input
              value={newClassName}
              onChange={(e) => setNewClassName(e.target.value)}
              placeholder='New class name'
            />
            <Button onClick={addClass}>Add Class</Button>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            {classes.map((cls) => (
              <div
                key={cls.id}
                className='p-2 border rounded flex justify-between items-center'
              >
                <span>{cls.name}</span>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => removeClass(cls.id)}
                >
                  <Trash2 className='h-4 w-4' />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

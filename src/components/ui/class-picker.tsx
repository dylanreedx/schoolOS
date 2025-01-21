'use client';
import {Class} from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';
import {LoadingSpinner} from './loading-spinner';
import {Button} from './button';

//props
type ClassPickerProps = {
  classes: Class[];
  selectedClass: string;
  onChange: (c: Class) => void;
};

export function ClassPicker({
  classes,
  onChange,
  selectedClass,
}: ClassPickerProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='w-full'>
        {!classes?.length ? (
          <LoadingSpinner className='w-6 h-6' />
        ) : (
          <Button className='w-full' variant='outline'>
            {selectedClass || 'Select a class'}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {classes?.map((c) => (
          <DropdownMenuItem key={c.id} onClick={() => onChange(c)}>
            {c.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

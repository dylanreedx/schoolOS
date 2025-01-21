'use client';
import {Class} from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './dropdown-menu';

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
      <DropdownMenuTrigger>
        <button className='btn btn-block'>
          {selectedClass || 'Select a class'}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {classes.map((c) => (
          <DropdownMenuItem key={c.id} onClick={() => onChange(c)}>
            {c.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

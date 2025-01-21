import {Button} from '@/components/ui/button';
import Link from 'next/link';

export default function RootPage() {
  return (
    <div>
      <Link href='/dashboard'>
        <Button>To dashboard</Button>
      </Link>
    </div>
  );
}

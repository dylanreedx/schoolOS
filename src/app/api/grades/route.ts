import {NextResponse} from 'next/server';
import {auth} from '@clerk/nextjs/server';
import db from '@/lib/db';

export async function POST(req: Request) {
  const {userId} = await auth();
  if (!userId) {
    return new NextResponse('Unauthorized', {status: 401});
  }

  const {subject, grade} = await req.json();
  const date = new Date().toISOString().split('T')[0];

  const stmt = db.prepare(
    'INSERT INTO grades (user_id, subject, grade, date) VALUES (?, ?, ?, ?)'
  );
  const result = stmt.run(userId, subject, grade, date);

  return NextResponse.json({id: result.lastInsertRowid});
}

export async function GET() {
  const {userId} = await auth();
  if (!userId) {
    return new NextResponse('Unauthorized', {status: 401});
  }

  const stmt = db.prepare(
    'SELECT * FROM grades WHERE user_id = ? ORDER BY date DESC'
  );
  const grades = stmt.all(userId);

  return NextResponse.json(grades);
}

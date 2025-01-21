import {NextResponse} from 'next/server';
import {auth} from '@clerk/nextjs/server';
import db from '@/lib/db';

export async function POST(req: Request) {
  const {userId} = await auth();
  if (!userId) {
    return new NextResponse('Unauthorized', {status: 401});
  }

  const {subject, duration} = await req.json();
  const date = new Date().toISOString().split('T')[0];

  const stmt = db.prepare(
    'INSERT INTO study_sessions (user_id, subject, duration, date) VALUES (?, ?, ?, ?)'
  );
  const result = stmt.run(userId, subject, duration, date);

  return NextResponse.json({id: result.lastInsertRowid});
}

export async function GET() {
  const {userId} = await auth();
  if (!userId) {
    return new NextResponse('Unauthorized', {status: 401});
  }

  const stmt = db.prepare(
    'SELECT * FROM study_sessions WHERE user_id = ? ORDER BY date DESC LIMIT 28'
  );
  const sessions = stmt.all(userId);

  return NextResponse.json(sessions);
}

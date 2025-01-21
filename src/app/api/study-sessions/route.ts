import {NextResponse} from 'next/server';
import {auth} from '@clerk/nextjs/server';
import {db} from '@/db';
import {studySessionsTable} from '@/db/schema';
import {eq} from 'drizzle-orm';

export async function POST(req: Request) {
  const {userId} = await auth();
  if (!userId) {
    return new NextResponse('Unauthorized', {status: 401});
  }

  const {subject, duration} = await req.json();
  const date = new Date().toISOString().split('T')[0];

  const result = await db
    .insert(studySessionsTable)
    .values({
      userId,
      subject,
      duration,
      date,
    })
    .returning({insertedId: studySessionsTable.id});

  return NextResponse.json({id: result[0].insertedId});
}

export async function GET() {
  const {userId} = await auth();
  if (!userId) {
    return new NextResponse('Unauthorized', {status: 401});
  }

  const sessions = await db
    .select()
    .from(studySessionsTable)
    .where(eq(studySessionsTable.userId, userId))
    .orderBy(studySessionsTable.date)
    .limit(28);

  return NextResponse.json(sessions);
}

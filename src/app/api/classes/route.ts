import {NextRequest, NextResponse} from 'next/server';
import {eq} from 'drizzle-orm';
import {db} from '@/db';
import {classesTable, usersTable} from '@/db/schema';
import {auth, currentUser} from '@clerk/nextjs/server';

export async function GET() {
  try {
    const classes = await db.select().from(classesTable);
    return NextResponse.json(classes);
  } catch (error) {
    console.error('Error fetching classes:', error);
    return NextResponse.json({error: 'Failed to fetch classes'}, {status: 500});
  }
}

export async function POST(request: NextRequest) {
  const {userId} = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    return new NextResponse('Unauthorized', {status: 401});
  }
  try {
    const {name, description} = await request.json();

    if (!name) {
      return NextResponse.json(
        {error: 'Class name is required'},
        {status: 400}
      );
    }

    // Check if the user exists
    const userExists = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .limit(1);

    if (userExists.length === 0) {
      await db.insert(usersTable).values({
        id: userId,
        name: user.firstName || user.fullName || user.username || 'User',
        email: user.emailAddresses[0].emailAddress,
      });
    }

    const newClass = await db
      .insert(classesTable)
      .values({
        name,
        description,
        userId,
      })
      .returning();

    return NextResponse.json(newClass[0]);
  } catch (error) {
    console.error('Error adding class:', error);
    return NextResponse.json({error: 'Failed to add class'}, {status: 500});
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const {id} = await request.json();

    if (!id) {
      return NextResponse.json({error: 'Class ID is required'}, {status: 400});
    }

    await db.delete(classesTable).where(eq(classesTable.id, id));

    return NextResponse.json({success: true});
  } catch (error) {
    console.error('Error removing class:', error);
    return NextResponse.json({error: 'Failed to remove class'}, {status: 500});
  }
}

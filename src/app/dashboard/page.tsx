import {auth} from '@clerk/nextjs/server';
import {redirect} from 'next/navigation';
import {DashboardHeader} from '@/components/dashboard-header';
import {ActivityCalendar} from '@/components/activity-calendar';
import {StudySessionForm} from '@/components/study-session-form';
import {GradeForm} from '@/components/grade-form';
import {ProgressVisualization} from '@/components/progress-visualization';
import {ClassManager} from '@/components/class-manager';

export default async function DashboardPage() {
  const {userId} = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className='container mx-auto p-4'>
      <DashboardHeader />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <ActivityCalendar />
        <ProgressVisualization />
        <StudySessionForm />
        <GradeForm />
        <ClassManager />
      </div>
    </div>
  );
}

import {auth} from '@clerk/nextjs/server';
import {redirect} from 'next/navigation';
import {DashboardHeader} from '@/components/dashboard-header';
import {ActivityHeatmap} from '@/components/activity-heatmap';
import {StudySessionForm} from '@/components/study-session-form';
import {GradeForm} from '@/components/grade-form';
import {ProgressVisualization} from '@/components/progress-visualization';

export default async function DashboardPage() {
  const {userId} = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  return (
    <div className='container mx-auto p-4'>
      <DashboardHeader />
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <ActivityHeatmap />
        <ProgressVisualization />
        <StudySessionForm />
        <GradeForm />
      </div>
    </div>
  );
}

import Navbar from '@/components/Navbar';
import Panel from '@/components/Panel';
import ApplicationForm from '@/components/ApplicationForm';

export default function ApplyPage() {
  return (
    <div>
      <Navbar />
      <div className="content">
        <Panel title="Apply to the guild" styleName="panel-md">
          <ApplicationForm />
        </Panel>
      </div>
    </div>
  );
}

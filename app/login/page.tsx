import Navbar from '@/components/Navbar';
import Panel from '@/components/Panel';
import LoginForm from '@/components/LoginForm';

export default function LoginPage() {
    return (
        <div>
            <Navbar />
            <div className="content">
                <Panel title="Login" styleName="panel-sm">
                    <LoginForm />
                </Panel>
            </div>
        </div>
    );
}

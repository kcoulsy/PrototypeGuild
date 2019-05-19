import React from 'react';
import AuthService from '../utils/AuthService';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';
import Loader from '../components/Loader';


const auth = new AuthService();

export default () => {
    return (
        <div>
            <Navbar auth={auth} />
            <div className="content">
                <Panel title="hello" className="">
                    <Loader />
                </Panel>
            </div>
        </div>
    );
};

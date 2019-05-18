import React from 'react';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';
import Loader from '../components/Loader';

export default () => {
    return (
        <div>
            <Navbar loggedIn={false} />
            <div className="content">
                <Panel title="hello" className="">
                    <Loader />
                </Panel>
            </div>
        </div>
    );
};

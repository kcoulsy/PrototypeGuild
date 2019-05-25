import React, { Component } from 'react';
import AuthService from '../utils/AuthService';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';
import Carousel from '../components/Carousel';
import Loader from '../components/Loader';

const auth = new AuthService();

export default class Index extends Component {
    state = {
        playerClasses: [],
        featured: [],
        posts: []
    }
    componentWillMount() {
        auth.api('get', '/home').then(res => {
            this.setState(res);
        });
    }
    render() {
        const {posts, playerClasses, featured} = this.state;
        return (
            <div>
                <Navbar auth={auth} />
                <div className="content">
                    <Panel styleName="no-padding">
                        <Carousel featured={featured}/>
                        {/* <Loader /> */}
                    </Panel>
                </div>
            </div>
        );
    }
}

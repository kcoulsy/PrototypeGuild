import React, { Component } from 'react';
import AuthService from '../utils/AuthService';
import Navbar from '../components/Navbar';
import SkewedImageRow from '../components/SkewedImageRow';
import NewRecruitment from '../components/NewRecruitment';

const auth = new AuthService();

export default class Index extends Component {
    static getInitialProps(ctx) {
        const auth = new AuthService();
        console.log(ctx.req.headers.host);
        return { auth }
    }
    state = {
        playerClasses: [],
        featured: [],
        posts: []
    };
    componentWillMount() {
        auth.api('get', '/home').then(res => {
            this.setState(res);
        });
    }
    render() {
        const { posts, playerClasses, featured } = this.state;

        return (
            <div>
                <Navbar auth={auth} />
                <div className="content">
                    <div className="proto-hero">
                        <img src="/static/images/logo.png" />
                        <h2>A Classic WoW guild</h2>
                    </div>
                    <NewRecruitment classValues={playerClasses} />
                    <SkewedImageRow posts={posts} />
                </div>
            </div>
        );
    }
}

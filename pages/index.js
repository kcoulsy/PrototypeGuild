import React, { Component } from 'react';

import { SITE_URL } from '../constants/site';
import AuthService from '../utils/AuthService';
import Navbar from '../components/Navbar';
import SkewedImageRow from '../components/SkewedImageRow';
import NewRecruitment from '../components/NewRecruitment';

const auth = new AuthService(SITE_URL);

export default class Index extends Component {
    static getInitialProps() {}

    state = {
        playerClasses: [],
        featured: [],
        posts: []
    };

    componentDidMount() {
        auth.api('get', '/home')
            .then(res => {
                this.setState(res);
            })
            .catch(err => {
                console.error(err);
            });
    }

    render() {
        const { posts, playerClasses } = this.state;

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

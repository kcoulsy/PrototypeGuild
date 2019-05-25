import React, { Component } from 'react';
import AuthService from '../utils/AuthService';
import Navbar from '../components/Navbar';
import Panel from '../components/Panel';
import Carousel from '../components/Carousel';
import Recruitment from '../components/Recruitment';
import DiscordEmbed from '../components/DiscordEmbed';
import PostList from '../components/PostList';
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
        console.log(this.state);
        return (
            <div>
                <Navbar auth={auth} />
                <div className="content">
                    <Panel styleName="no-padding panel-flex">
                        <Carousel featured={featured}/>
                        <Recruitment classValues={playerClasses} />
                        {/* <Loader /> */}
                    </Panel>
                    <Panel styleName="no-padding panel-flex panel-clear">
                        <PostList posts={posts}/>
                        <DiscordEmbed />
                        {/* <Loader /> */}
                    </Panel>
                </div>
            </div>
        );
    }
}

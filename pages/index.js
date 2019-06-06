import React, { Component } from 'react';
import AuthService from '../utils/AuthService';
import Navbar from '../components/Navbar';
import SkewedImageRow from '../components/SkewedImageRow';
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
                <div className="proto-hero">
                    <img src="/static/images/logo.png" />
                    <h2>A Classic WoW guild</h2>
                </div>
                <img style={{
                    height: 30
                }} src="https://c-5uwzmx78pmca09x24oiumx78mlqix2ekczamklvx2ekwu.g00.gamepedia.com/g00/3_c-5ewe.oiumx78mlqi.kwu_/c-5UWZMXPMCA09x24pbbx78ax3ax2fx2foiumx78mlqi.kczamklv.kwux2fewex78mlqix2fbpcujx2f1x2f15x2fKtiaaQkwv_x78zqmab.x78vox2f17x78f-KtiaaQkwv_x78zqmab.x78vox3fdmzaqwvx3d467i6m091372ij54i7i325k3ki6l6m06x26q98k.uizsx3dquiom_$/$/$/$/$/$/$"/>
                <SkewedImageRow />
                    {/* <Panel styleName="no-padding panel-flex">
                        <Carousel featured={featured}/>
                        <Recruitment classValues={playerClasses} />
                       
                    </Panel>
                    <Panel styleName="no-padding panel-flex panel-clear">
                        <PostList posts={posts}/>
                        <DiscordEmbed />
                       
                    </Panel> */}
                </div>
            </div>
        );
    }
}

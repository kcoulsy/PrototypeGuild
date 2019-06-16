import React, { Component } from 'react';

import Navbar from '../components/Navbar';
import Panel from '../components/Panel';

import AuthService from '../utils/AuthService';
import Loader from '../components/Loader';
import PostList from '../components/PostList';

const auth = new AuthService();

class Post extends Component {
    static async getInitialProps({ query }) {
        return { id: query.id };
    }

    state = {
        post: {},
        sideBarPosts: [],
        isLoading: true
    };

    componentDidMount() {
        auth.api('get', `/posts/${this.props.id}`).then(res => {
            this.setState({
                post: res[0],
                isLoading: false
            });
        });
        auth.api('get', '/posts').then(res=> {
            this.setState({
                sideBarPosts: res
            })
        })
    }

    render() {
        const { post, sideBarPosts } = this.state;

        if (this.state.isLoading) {
            return (
                <div>
                    <Navbar auth={auth} />
                    <div className="content">
                        <Panel styleName="panel-sm">
                            <Loader />
                        </Panel>
                    </div>
                </div>
            );
        }
        // todo handle no post
        return (
            <div>
                <Navbar auth={auth} />
                <div className="content">
                    <Panel styleName="no-padding panel-flex">
                        <div className="main-post">
                            <div className="cover-image">
                                <img src={post.imageUrl} alt={post.title} />
                            </div>
                            <h2>{post.title}</h2>
                            <p>{post.body}</p>
                        </div>
                        <div className="side-posts">
                        <PostList posts={sideBarPosts} />
                        </div>
                    </Panel>
                </div>
            </div>
        );
    }
}

export default Post;

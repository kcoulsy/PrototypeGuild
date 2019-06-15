import React, { Component } from 'react';

import Panel from './Panel';
import CreatePost from './admin/CreatePost';
import Modal from './utils/Modal';

export default class PostList extends Component {
    state = {
        posts: [],
        createPostOpen: false
    };
    componentWillMount() {
        this.fetchPosts();
    }

    fetchPosts = () => {
        const { auth } = this.props;

        auth.api('get', '/posts').then(res => {
            this.setState({
                posts: res
            });
        });
    };
    render() {
        const { posts } = this.state;
        const { auth } = this.props;

        return (
            <Panel styleName="no-padding">
                <Modal
                    on={this.state.createPostOpen}
                    toggle={() => {
                        this.setState({
                            createPostOpen: !this.state.createPostOpen
                        });
                        this.fetchPosts();
                    }}
                >
                    <CreatePost auth={auth} />
                </Modal>
                <div className="panel-header">
                    Featured Posts
                    <button
                        className="proto-btn"
                        onClick={() => this.setState({ createPostOpen: true })}
                    >
                        Create Post
                    </button>
                </div>
                <div>
                    <table className="post-list-table">
                        <tbody>
                            {posts &&
                                posts.map(post => {
                                    return (
                                        <tr key={post.title}>
                                            <td>
                                                <img
                                                    src={post.imageUrl}
                                                    alt={post.title}
                                                />
                                            </td>
                                            <td>{post.title}</td>
                                            <td>
                                                <button className="proto-btn">
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </Panel>
        );
    }
}

import React, { Component } from 'react';

import Panel from './Panel';
import CreatePost from './admin/CreatePost';
import Modal from './utils/Modal';

export default class PostList extends Component {
    state = {
        posts: [],
        createPostOpen: false
    };

    componentDidMount() {
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

    removePost = ev => {
        const { value } = ev.target;
        const { auth } = this.props;

        ev.preventDefault();

        if (window.confirm('Are you sure you want to delete this post?')) {
            auth.api('patch', '/posts/remove', {
                data: {
                    _id: value
                }
            }).then(() => {
                this.fetchPosts();
            });
        }
    };

    closeModal = () => {
        this.setState(({ createPostOpen }) => ({
            createPostOpen: !createPostOpen
        }));
        this.fetchPosts();
    };

    render() {
        const { posts, createPostOpen } = this.state;
        const { auth } = this.props;

        return (
            <Panel styleName="no-padding">
                <Modal on={createPostOpen} toggle={this.closeModal}>
                    <CreatePost auth={auth} cb={this.closeModal} />
                </Modal>
                <div className="panel-header">
                    Featured Posts
                    <button
                        className="proto-btn"
                        type="button"
                        onClick={() => this.setState({ createPostOpen: true })}
                    >
                        Create Post
                    </button>
                </div>
                <div>
                    <table className="post-list-table">
                        <tbody>
                            {(!posts || !posts.length) && (
                                <tr>
                                    <td style={{ textAlign: 'center' }}>
                                        No Posts Found!
                                    </td>
                                </tr>
                            )}
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
                                                <button
                                                    value={post._id}
                                                    className="proto-btn"
                                                    type="button"
                                                    onClick={this.removePost}
                                                >
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

import React, { useState, Fragment } from 'react';

import Modal from './utils/Modal';

export default ({ posts }) => {
    const [selected, setSelected] = useState({});

    return (
        <Fragment>
            <Modal on={selected && selected.src} toggle={() => setSelected({})}>
                <img src={selected.src} alt={selected.title} />
            </Modal>

            <div className="skewed-image-row">
                <div className="skewed-image-container">
                    {posts.map((post, idx) => {
                        return (
                            idx < 5 && (
                                <div
                                    className="image"
                                    key={post._id}
                                    role="button"
                                    tabIndex={0}
                                    onKeyUp={() => null}
                                    onClick={() =>
                                        setSelected({
                                            id: post._id,
                                            src: post.imageUrl
                                        })
                                    }
                                >
                                    <img src={post.imageUrl} alt={post.title} />
                                </div>
                            )
                        );
                    })}
                </div>
            </div>
        </Fragment>
    );
};

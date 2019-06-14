import React, { useState, Fragment } from 'react';

import Modal from './utils/Modal';

export default ({ posts }) => {
    const [selected, setSelected] = useState({});

    return (
        <>
            <Modal on={selected && selected.src} toggle={() => setSelected({})}>
                <img src={selected.src} alt={selected.title} />
            </Modal>

            <div className="skewed-image-row">
                <div className="skewed-image-container">
                    {posts.map((post, idx) => {
                        return (
                            idx < 4 && (
                                <div class="image">
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        onClick={() =>
                                            setSelected({
                                                id: post._id,
                                                src: post.imageUrl
                                            })
                                        }
                                    />
                                </div>
                            )
                        );
                    })}
                    <div class="image">
                        <img
                            src="https://bnetcmsus-a.akamaihd.net/cms/blog_header/2k/2KISFCWBJXZL1540950728113.jpg"
                            alt=""
                        />
                    </div>
                    <div class="image">
                        <img
                            src="https://cdn.vox-cdn.com/thumbor/TF9NftkEPiALMcB4AlrYoD0cYto=/0x0:3840x2160/1200x800/filters:focal(1613x773:2227x1387)/cdn.vox-cdn.com/uploads/chorus_image/image/63833116/ClassicStormwind_4k.0.jpg"
                            alt=""
                        />
                    </div>
                    <div class="image">
                        <img
                            src="https://www.thesun.co.uk/wp-content/uploads/2018/11/WoW_Classic_Molten_Core_3840x2160.jpg"
                            alt=""
                        />
                    </div>
                    <div class="image">
                        <img
                            src="https://cdn.images.express.co.uk/img/dynamic/143/590x/WoW-Classic-Beta-1127183.jpg?r=1557865458430"
                            alt=""
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

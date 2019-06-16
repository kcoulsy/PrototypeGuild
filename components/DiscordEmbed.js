import React from 'react';
import { DISCORD_EMBED_URL } from '../constants/site';
export default () => {
    return (
        <div className="discord-embed">
            <iframe
                src={DISCORD_EMBED_URL}
                width="260"
                height="500"
                allowTransparency="true"
                frameBorder="0"
            />
        </div>
    );
};

import React from 'react';
import Link from 'next/link';

import classes from '../constants/classes';

export default ({ classValues }) => {
    return (
        <div className="proto-recruitment-icons">
            <h2>Recruitment</h2>
            <div className="icons">
                {Object.keys(classes).map(playerClassKey => {
                    const playerClass = classes[playerClassKey];
                    const value = classValues.find(
                        e => e.playerClass === playerClassKey.toLowerCase()
                    );
                    const recruiting = value && value.recruiting;
                    return (
                        <Link href="/apply" key={playerClassKey}>
                            <div className="icon">
                                <img
                                    src={`/static/images/classes/${playerClass.name.toLowerCase()}.png`}
                                    alt={playerClass.name}
                                />
                                <span
                                    className={`status ${
                                        recruiting ? 'open' : 'closed'
                                    }`}
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

import React from "react";
import './styles.scss';

import classes from "./classes.json";

export default ({ classValues }) => {
  return (
    <div className="recruitment">
      <div className="title">Recruitment</div>
      {Object.keys(classes).map(playerClassKey => {
          const playerClass = classes[playerClassKey];
          const value = classValues.find(e => e.playerClass === playerClassKey.toLowerCase());
          const recruiting = value && value.recruiting;
          return (
            <div className="player-class" key={playerClassKey}>
                <img
                src={playerClass.image}
                alt={playerClass.name}
                />
                <span>{playerClass.name}</span>
                <span className={`status ${recruiting ? 'open' : 'closed' }`} />
            </div>
          )
      })}
    </div>
  );
};

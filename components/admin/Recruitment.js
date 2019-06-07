import React, { Component } from 'react';
import upperFirst from 'lodash/upperFirst';

import Panel from '../Panel';

export default class componentName extends Component {
    state = {
        playerClasses: []
    };
    componentWillMount() {
        const { auth } = this.props;

        auth.api('get', '/recruitment').then(playerClasses => {
            this.setState({ playerClasses });
        });
    }

    handleClick = ev => {
        ev.preventDefault();
        const { auth } = this.props;
        const { target } = ev;
        const { name, disabled } = target;
        const type = target.getAttribute('data-type');
        const recruiting = type === 'open' ? !disabled : disabled;

        auth.api('patch', '/recruitment', {
            data: {
                playerClass: name,
                recruiting
            }
        }).then(res => {
            const { playerClasses } = this.state;
            const updatedClasses = playerClasses.map(player => {
                if (player.playerClass === name) {
                    return res.playerClass;
                }
                return player;
            });
            this.setState({ playerClasses: updatedClasses });
        });
    };

    render() {
        const { playerClasses } = this.state;
        return (
            <Panel title="Recruitment" styleName="no-padding">
                <table className="proto-table no-hover recruitment-table">
                    <tbody>
                        {playerClasses.map(
                            ({ playerClass, recruiting }, idx) => {
                                return (
                                    <tr key={idx}>
                                        <td>{upperFirst(playerClass)}</td>
                                        <td>
                                            <button
                                                name={playerClass}
                                                className="proto-btn btn-success"
                                                disabled={recruiting}
                                                onClick={this.handleClick}
                                                data-type="open"
                                            >
                                                Open
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                name={playerClass}
                                                className="proto-btn btn-danger"
                                                disabled={!recruiting}
                                                onClick={this.handleClick}
                                                data-type="close"
                                            >
                                                Closed
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </Panel>
        );
    }
}

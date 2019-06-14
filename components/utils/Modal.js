import React, { Component, Fragment } from 'react';

// import Portal from './Portal';

export default class Modal extends Component {
    render() {
        const { children, toggle, on } = this.props;
        return (
            <>
                {on && (
                    <>
                    <div className="modal-wrapper">
                        <div className="modal-card">
                            {children}
                        </div>
                    </div>
                    <div className="modal-background" onClick={toggle} />
                    </>
                )}
            </>
        );
    }
}


import React, { Fragment } from 'react';

export default ({ children, toggle, on }) => {
    return (
        <Fragment>
            {on && (
                <>
                    <div className="modal-wrapper">
                        <div className="modal-card">{children}</div>
                    </div>
                    <div
                        className="modal-background"
                        onClick={toggle}
                        role="button"
                        tabIndex={0}
                        onKeyUp={() => null}
                    />
                </>
            )}
        </Fragment>
    );
};

import React, { Fragment } from 'react';

interface ModalProps {
    children: React.ReactNode;
    toggle: () => void;
    on: boolean;
}

export default function Modal({ children, toggle, on }: ModalProps) {
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
}

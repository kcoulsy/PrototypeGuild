import React from 'react'

export default props => {
    return (
        <div className={`proto-panel ${props.styleName}`}>
            {props.title && <div className="panel-header">{props.title}</div>}
            <div className="panel-content">{props.children}</div>
        </div>
    )
}

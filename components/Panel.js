import React from 'react'

export default ({styleName, title, children}) => {
    return (
        <div className={`proto-panel ${styleName}`}>
            {title && <div className="panel-header">{title}</div>}
            <div className="panel-content">{children}</div>
        </div>
    )
}

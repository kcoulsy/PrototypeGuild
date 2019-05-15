import React from 'react'

export default props => {
    return (
        <div class={`proto-panel ${props.styleName}`}>
            {props.title && <div class="panel-header">{props.title}</div>}
            <div class="panel-content">{props.children}</div>
        </div>
    )
}

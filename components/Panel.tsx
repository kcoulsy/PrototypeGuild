import React from 'react';

interface PanelProps {
    styleName?: string;
    title?: string;
    children: React.ReactNode;
}

export default function Panel({ styleName, title, children }: PanelProps) {
    return (
        <div className={`proto-panel ${styleName}`}>
            {title && <div className="panel-header">{title}</div>}
            <div className="panel-content">{children}</div>
        </div>
    );
}

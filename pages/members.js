import React from 'react'
import Navbar from '../components/Navbar'
import Panel from '../components/Panel'
export default () => {
    return (
        <div>
            <Navbar />
            <div className="content">
                <Panel title="Members" styleName="panel-md">
                    <table class="proto-table">
                        <tbody>
                            <tr>
                                <td>Syth</td>
                                <td>Warrior</td>
                                <td>Tank</td>
                            </tr>
                            <tr>
                                <td>Syth</td>
                                <td>Warrior</td>
                                <td>Tank</td>
                            </tr>
                        </tbody>
                    </table>
                </Panel>
            </div>
        </div>
    )
}

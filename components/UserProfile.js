import React, { Component, Fragment } from 'react';

import Profile from './Profile';
import UpdatePassword from './UpdatePassword';

export default class UserProfile extends Component {
    render() {
        const { auth, canEdit, id } = this.props;
        const isAdmin = auth && auth.isAdmin();
        return (
            <>
            <Profile {...this.props} />
            {
                isAdmin && canEdit && <UpdatePassword id={id} auth={auth} requirePrevious={false} />
            }
            </>
        );
    }
}

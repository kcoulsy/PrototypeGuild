import React, { Fragment } from 'react';

import Profile from './Profile';
import UpdatePassword from './UpdatePassword';

export default props => {
    const { auth, canEdit, id } = props;
    const isAdmin = auth && auth.isAdmin();
    return (
        <Fragment>
            <Profile {...props} />
            {isAdmin && canEdit && (
                <UpdatePassword id={id} auth={auth} requirePrevious={false} />
            )}
        </Fragment>
    );
};

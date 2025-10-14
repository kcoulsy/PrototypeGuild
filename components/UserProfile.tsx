import React, { Fragment } from 'react';
import Profile from './Profile';
import UpdatePassword from './UpdatePassword';

interface UserProfileProps {
    auth?: any;
    canEdit?: boolean;
    id?: string;
}

export default function UserProfile(props: UserProfileProps) {
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
}

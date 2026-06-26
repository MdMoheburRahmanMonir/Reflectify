import React from 'react';
import ManageUserPage from './ManageUserPage';
import { getUserFromAdmin } from '@/lib/api/adminApi/UserManaging/getUserFromAdmin';
import { userSessionServer } from '@/lib/actions/session';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import NavigationDrowerForAdmin from '@/components/adminDashboard/DrowerAdmin';

const ManageUserPageToEditDelete = async () => {
    const { token } = await auth.api.getToken({ headers: await headers() });
    const session = await userSessionServer();
    const userId = session?.user?.id;
    const users = await getUserFromAdmin(userId, token, session);

    return (
        <div>
            <NavigationDrowerForAdmin />
            <ManageUserPage users={users} token={token} />
        </div>
    );
};

export default ManageUserPageToEditDelete;
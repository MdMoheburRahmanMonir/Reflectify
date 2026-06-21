import React from 'react';
import ManageUserPage from './ManageUserPage'; 
import { getUserFromAdmin } from '@/lib/api/adminApi/getUserFromAdmin';
import { userSessionServer } from '@/lib/actions/session';

const ManageUserPageToEditDelete = async () => {
    const session = await userSessionServer();
    const userId = session?.user?.id; 
    const users = await getUserFromAdmin(userId); 

    return (
        <div>
            <ManageUserPage users={users}/>
        </div>
    );
};

export default ManageUserPageToEditDelete;
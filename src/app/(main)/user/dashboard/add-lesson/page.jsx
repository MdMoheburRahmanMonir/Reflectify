import React from 'react';
import AddLessonPage from './AddLessonPage';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import NavigationDrower from '@/components/userDashboard/NavigationDrower';

const PublicLessonCreatePage = async () => {
    const { token } = await auth.api.getToken({ headers: await headers() });

    return (
        <div>
            <NavigationDrower />
            <AddLessonPage token={token} />
        </div>
    );
};

export default PublicLessonCreatePage;
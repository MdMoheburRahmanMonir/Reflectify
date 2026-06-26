import React from 'react';
import MyLessonsPage from './MyLessonsPage';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import NavigationDrower from '@/components/userDashboard/NavigationDrower';

const MyLessonMainPage = async () => {
    const { token } = await auth.api.getToken({ headers: await headers() });

    return (
        <div>
            <NavigationDrower />
            <MyLessonsPage token={token} />

        </div>
    );
};

export default MyLessonMainPage;
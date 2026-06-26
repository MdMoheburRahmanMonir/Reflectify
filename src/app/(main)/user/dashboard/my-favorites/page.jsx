
import { userSessionServer } from '@/lib/actions/session';
import { MyFavoritesLessonData } from '@/lib/api/userapi/MyFavoritesLessonData';
import React from 'react';
import { MyFavoritesPage } from './MyFavoritesPage';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import NavigationDrower from '@/components/userDashboard/NavigationDrower';
const MyFavoritePageMain = async () => {
    const { token } = await auth.api.getToken({ headers: await headers() });
    const session = await userSessionServer();
    const userId = session?.user?.id;

    const savedLessons = await MyFavoritesLessonData(userId, session, token)




    return (
        <div>
            <NavigationDrower />
            <MyFavoritesPage savedLessons={savedLessons} token={token} />

        </div>
    );
};

export default MyFavoritePageMain;
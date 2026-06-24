
import { userSessionServer } from '@/lib/actions/session';
import { MyFavoritesLessonData } from '@/lib/api/userapi/MyFavoritesLessonData';
import React from 'react';
import { MyFavoritesPage } from './MyFavoritesPage';
const MyFavoritePageMain = async () => {
    const session = await userSessionServer();
    const userId = session?.user?.id;

    const savedLessons = await MyFavoritesLessonData(userId)
    console.log(savedLessons);




    return (
        <div>
            <MyFavoritesPage savedLessons={savedLessons} />
            
        </div>
    );
};

export default MyFavoritePageMain;
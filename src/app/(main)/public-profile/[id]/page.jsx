import React from 'react';
import PublicUserProfile from './PublicUserProfile';
import { userSessionServer } from '@/lib/actions/session';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { GetMyDataForProfile } from '@/lib/api/userapi/profile/GetMyDataForProfile';

const PublicPage = async ({ params }) => {
    const { id } = await params;
    const session = await userSessionServer()
    const MyId = session?.user?.id;
    const { token } = await auth.api.getToken({ headers: await headers() });
    const data = await GetMyDataForProfile(id, session, token);
    const featuredLessons = data.publicData;
    const publicSessionData = data.publicSession;
    console.log(id, 'id is ');

    return (
        <div> 
            <PublicUserProfile featuredLessons={featuredLessons} publicSessionData={publicSessionData}  />
        </div>
    );
};

export default PublicPage;
import React from 'react';
import ProfilePage from './ProfilePage';
import { userSessionServer } from '@/lib/actions/session';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import { GetMyDataForProfile } from '@/lib/api/userapi/profile/GetMyDataForProfile';

const ProfileMainPage = async () => {
  const session = await userSessionServer();
  const MyId = session?.user?.id;
  const { token } = await auth.api.getToken({ headers: await headers() });
  const data = await GetMyDataForProfile(MyId, session, token);
  const featuredLessons = data.publicData;
  const coverImage = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/get-user-cover/${MyId}`)
  const img = await coverImage.json() 
  const coverPhoto = img?.coverImage;
  return (
    <div>
      <ProfilePage  featuredLessons={featuredLessons} token={token} coverPhoto={coverPhoto}/>
    </div>
  );
};

export default ProfileMainPage;
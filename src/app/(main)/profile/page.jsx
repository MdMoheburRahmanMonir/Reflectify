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
  const totalLesson = data?.totalLesson[0]?.totalLesson;
  const totalSavedByMe = data?.countSave[0]?.totalSavedByMe;
  
  console.log(totalLesson, 'My Total Lesson');
  
  return (
    <div>
      <ProfilePage  
      featuredLessons={featuredLessons} 
      token={token} 
      coverPhoto={coverPhoto} 
      totalLesson={totalLesson}
      totalSavedByMe={totalSavedByMe}
      />
    </div>
  );
};

export default ProfileMainPage;
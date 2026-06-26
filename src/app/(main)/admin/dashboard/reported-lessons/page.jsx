import React from 'react';
import { ReportedLessonPage } from './ReportedLessonPage';
import { userSessionServer } from '@/lib/actions/session';
import { GetReportForAdminFromServer } from '@/lib/api/adminApi/ReportManaging/GetReportForAdmin';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';
import NavigationDrowerForAdmin from '@/components/adminDashboard/DrowerAdmin';

const ReportMainPage = async () => {
    const { token } = await auth.api.getToken({ headers: await headers() });
    const session = await userSessionServer();
    const reportedLessons = await GetReportForAdminFromServer(session, token);

    return (
        <div>
            <NavigationDrowerForAdmin />
            <ReportedLessonPage reportedLessons={reportedLessons} session={session} token={token} />
        </div>
    );
};

export default ReportMainPage;
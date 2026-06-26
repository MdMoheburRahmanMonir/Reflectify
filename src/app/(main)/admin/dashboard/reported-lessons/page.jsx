import React from 'react';
import { ReportedLessonPage } from './ReportedLessonPage';
import { userSessionServer } from '@/lib/actions/session';
import { GetReportForAdminFromServer } from '@/lib/api/adminApi/ReportManaging/GetReportForAdmin';
import { headers } from 'next/headers';
import { auth } from '@/lib/auth';

const ReportMainPage = async () => {
    const { token } = await auth.api.getToken({ headers: await headers() });
    const session = await userSessionServer();
    const reportedLessons = await GetReportForAdminFromServer(session, token);
    console.log( reportedLessons,'Report is', session);

    return (
        <div>
            <ReportedLessonPage reportedLessons={reportedLessons} />

        </div>
    );
};

export default ReportMainPage;
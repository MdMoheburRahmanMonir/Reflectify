import React from 'react';
import { ReportedLessonPage } from './ReportedLessonPage';
import { userSessionServer } from '@/lib/actions/session';
import { GetReportForAdminFromServer } from '@/lib/api/adminApi/ReportManaging/GetReportForAdmin';

const ReportMainPage = async () => {
    const session = await userSessionServer();
    const reportedLessons = await GetReportForAdminFromServer(session);
    console.log(reportedLessons, 'Report is');

    return (
        <div>
            <ReportedLessonPage reportedLessons={reportedLessons} />

        </div>
    );
};

export default ReportMainPage;
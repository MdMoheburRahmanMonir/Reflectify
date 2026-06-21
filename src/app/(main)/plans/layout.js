import { userSessionServer } from '@/lib/actions/session'; 
import React from 'react'; 
import { redirect } from 'next/navigation';

const PlanPageLayout = async ({ children }) => {
    const session = await userSessionServer();
    console.log(session);
    if (session?.user?.role !== 'user') {
        redirect('/')
    }
    return (
        <div> 
            {children}
        </div>
    );
};

export default PlanPageLayout;
import { userSessionServer } from '@/lib/actions/session'; 
import React from 'react'; 
import { redirect } from 'next/navigation';

const PlanPageLayout = async ({ children }) => {
    const session = await userSessionServer(); 
    if (!session?.user) {
        redirect('/')
    }
    if (session?.user?.plan === 'user_pro'){
        redirect("/")
    }
    return (
        <div> 
            {children}
        </div>
    );
};

export default PlanPageLayout;
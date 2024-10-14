import SignOut from '@/components/forms/auth/SignOut';
import { getSession } from '@/lib/auth/getsession';
import React from 'react';

const Page = async () => {
    const session = await getSession();
    return (
        <div>
            
        </div>
    );
};

export default Page;
import SignOut from '@/components/forms/auth/SignOut';
import { getSession } from '@/lib/auth/getsession';
import React from 'react';

const Page = async () => {
    const session = await getSession();
    return (
        <div>
            <pre>
                {JSON.stringify(session, null, 2)}
            </pre>
            <SignOut />
        </div>
    );
};

export default Page;
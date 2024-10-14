import { signOut } from '@/lib/auth/auth';
import React from 'react';
import SubmitActionButton from '../SubmitActionButton';

const SignOut = () => {
    return (
        <form action={async () => {
            "use server"
            await signOut()
        }}>
            <SubmitActionButton>Se déconnecter</SubmitActionButton>
        </form>
    );
};

export default SignOut;
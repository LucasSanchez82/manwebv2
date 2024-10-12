import { signOut } from '@/lib/auth';
import React from 'react';
import SubmitButton from '../SubmitButton';

const SignOut = () => {
    return (
        <form action={async () => {
            "use server"
            await signOut()
        }}>
            <SubmitButton>Se déconnecter</SubmitButton>
        </form>
    );
};

export default SignOut;
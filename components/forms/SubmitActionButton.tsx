"use client"

import React from 'react';
import { Button } from '../ui/button';
import { useFormStatus } from 'react-dom';
import Spinner from '../global/Spinner';

const SubmitActionButton = ({children}: {children: React.ReactNode}) => {
    const {pending} = useFormStatus();
    return (
        <Button aria-disabled={pending} type='submit'>
            {pending ? <Spinner /> : children || 'Submit'}
        </Button>
    );
};

export default SubmitActionButton;
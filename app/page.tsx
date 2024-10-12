import SignIn from '@/components/forms/auth/SignIn';
import SignOut from '@/components/forms/auth/SignOut';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import React from 'react';

const page = async () => {
  const  session = await auth();
  if(session?.user?.email) {
    return (
      <main>
        <pre>Connected as {JSON.stringify(session, null, 2)}</pre>
        <p>email : {session.user.email}</p>
        <SignOut />
      </main>
    )

  }
  return (
    <main>
      <h1>Hello world</h1>
      <SignIn />
      {session && <pre>Connected as {JSON.stringify(session, null, 2)}</pre>}
    </main>
  );
};

export default page;
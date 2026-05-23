import React from 'react'
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react'
import { toast } from 'react-hot-toast';

const HomePage = () => {

    //fetch some data -without using tanstack
    

  return (
    <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={()=> toast.success("This is a Success Toast")} >Click me</button>
      <SignedOut>
        <SignInButton mode="modal">
          <button>Login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton/>
      </SignedIn>

      <UserButton/>
    </div>
  )
}

export default HomePage
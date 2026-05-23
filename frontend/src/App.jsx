import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton ,useUser} from '@clerk/clerk-react'

import {Navigate,Routes,Route} from "react-router";
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { Toaster } from 'react-hot-toast';



function App() {

  const {isSignedIn}=useUser();

  return (
    <>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/problems" element={isSignedIn ? <ProblemsPage /> : <Navigate to="/" />} />
    </Routes>
    <Toaster/>
    </>
  )
}

export default App


//tailwinf , daisyui , react-router , react-hot-toast
//todo : react-query aka tanstack query axios

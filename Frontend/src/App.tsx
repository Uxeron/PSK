import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Routes } from 'react-router-dom'
import { BrowseScreen } from './Screens/BrowseScreen/BrowseScreen';
import { DetailsScreen } from './Screens/DetailsScreen';
import { NotFound } from './Screens/NotFound';
import { UploadScreen } from './Screens/UploadScreen/UploadScreen';
import { UserScreen } from './Screens/UserScreen';
import "react-toastify/dist/ReactToastify.css";
import { NavBar } from './Components/NavBar';
import { ProtectedRoute } from './Auth/ProtectedRoute';
import { LandingPage } from './Screens/LandingPage';
import { RegisterScreen } from './Screens/RegisterScreen';
import { EditDetailsScreen } from './Screens/EditDetailsScreen';

function App() {
  return (<div>
    <NavBar />
    <ToastContainer />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/browse" element={<ProtectedRoute component={BrowseScreen} />} />
        <Route path="/upload" element={<ProtectedRoute component={UploadScreen} />} />
        <Route path="/details/:itemId" element={<ProtectedRoute component={DetailsScreen} />} />
        <Route path="/details/:itemId/edit" element={<ProtectedRoute component={EditDetailsScreen} />} />
        <Route path="/user/:userId" element={<ProtectedRoute component={UserScreen} />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
  </div>  
  );
}

export default App;

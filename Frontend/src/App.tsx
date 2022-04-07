import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { BrowseScreen } from './Screens/BrowseScreen';
import { DetailsScreen } from './Screens/DetailsScreen';
import { NotFound } from './Screens/NotFound';
import { GeneralUploadScreen } from './Screens/UploadScreen/GeneralUploadScreen';
import { UserScreen } from './Screens/UserScreen';

function App() {
  return (<div>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<BrowseScreen/>} />
          <Route path="/upload" element={<GeneralUploadScreen/>} />
          <Route path="/details/:itemId" element={<DetailsScreen/>} />          <Route path="/user/:userId" element={<UserScreen/>} />
          <Route path="/user/:userId" element={<UserScreen/>} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

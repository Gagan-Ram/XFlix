import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home';
import VideoPage from './Components/VideoPage';
import { useState } from 'react';

export const config = {
  endpoint: process.env.REACT_APP_WEBSITE_ENDPOINT,
};

function App() {

  const [locationPath, setLocationPath] = useState()
  // console.log("************** "+ locationPath);

  return (
    <>
      <Router  >
        <Routes>

          <Route path="/:value" element={<VideoPage locationPath={locationPath} setLocationPath={setLocationPath} />} />

          <Route exact path="/" element={<Home />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;

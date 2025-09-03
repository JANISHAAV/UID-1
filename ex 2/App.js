import React from 'react';
import './App.css';
import Profile from './components/Profile';

function App() {
  return (
    <div className="App">
      <h1>User Profile Page</h1>
      <Profile
  name="Janishaa V"
  email="janishaav.23it@kongu.edu"
  location="Tamil Nadu, India"
  phone="+91 6369875596"
  bio="An aspiring React developer and smart worker!"
  image={process.env.PUBLIC_URL + '/images/profile.jpg'}
/>
    </div>
  );
}

export default App;

import React from 'react';
import './App.css';
import Header from './components/Header';
import Content from './components/Content';
import About from './components/About';
import List from './components/List';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <About />
      <List />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

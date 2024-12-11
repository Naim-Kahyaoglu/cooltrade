// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';  // Burada app.css dosyasını import ettik
import Header from './layout/Header';
import Footer from './layout/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

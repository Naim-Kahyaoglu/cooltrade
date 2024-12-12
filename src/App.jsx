import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage'; 
import LoginPage from './pages/LoginPage';
import Header from './layout/Header';
import Footer from './layout/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/signup" component={SignupPage} /> 
        <Route path="/login" component={LoginPage} /> 
      </Switch>
      <Footer />
    </div>
  );
};

export default App;


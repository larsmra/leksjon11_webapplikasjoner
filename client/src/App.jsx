import React from 'react';
import Routes from './routes/Routes';
import AuthProvider from './context/AuthProvider';
// import Home from './pages/Home';

const App = () => (
  <AuthProvider>
    <Routes />
  </AuthProvider>
);

export default App;

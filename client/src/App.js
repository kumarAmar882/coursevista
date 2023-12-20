import './App.css';
import React  from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../src/components/common/Header/Header';
import Footer from '../src/components/common/Footer/Footer';
//import UserPage from '../src/pages/UserPage/UserPage';
function App() {
  return (
    <div className="App">
     <Header/>
     <Footer/>
  
    </div>
  );
}

export default App;

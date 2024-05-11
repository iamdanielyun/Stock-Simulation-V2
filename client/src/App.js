import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AnimatedRoutes from './components/AnimatedRoutes';
import Navbar from './components/Navbar';

function App() {
  // return (
  //   <Router>
  //     <Navbar />
  //     <AnimatedRoutes />
  //   </Router>
  
  // );
  return (
    <Router>
        <div className="app-container">
            <Navbar />
            <div className="grid-container">
                <AnimatedRoutes />
            </div>
        </div>
    </Router>
);
}

export default App;

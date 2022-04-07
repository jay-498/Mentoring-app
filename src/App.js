import Booking from './components/booking';
import './App.css';
import Navbar from './components/common/Navbar';
import HomePage from './pages/home';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="container w-360 h-[937px] bg-[#FFE8EB]">
      <Navbar />
      <HomePage />
        {/* <Routes>
            <Route path="/" element={<HomePage />}/>
        </Routes> */}
    </div>
  );
}

export default App;

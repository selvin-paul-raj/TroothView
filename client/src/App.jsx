
import { BrowserRouter as Router, Routes, Route,  } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Hero from "./pages/Hero";
import ImageUpload from './components/ImageUpload';
import About from './pages/About';
import Contact from './pages/Contact';
import Price from './pages/Price';
import Footer from './Components/Footer';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-900 ">
        <Navbar />
        <Routes >
            <Route path="/" element={<Hero />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/price" element={<Price />} />
            <Route path="/upload" element={<ImageUpload />} />
        </Routes>
        <Footer/>
      </div>
    </Router>
  );
};

export default App;

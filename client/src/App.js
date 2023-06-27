import Footer from "./components/Footer";

import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mainpage from "./components/pages/Mainpage";
import Contact from "./components/pages/Contact";
import Privacy from "./components/pages/Privacy";
import Terms from "./components/pages/Terms";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/termsandconditions" element={<Terms />} />
      </Routes>
      <Footer />
    </Router>
   
  );
}

export default App;

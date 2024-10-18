import { act } from 'react';
import logo from './logo.svg'; // Đảm bảo rằng đường dẫn là chính xác
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SaltCalculation from './SaltCalculation'; // import trang mới
import Home from './Home'; // giả sử trang Home là trang chính


const App = () => {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />  {/* Trang chủ */}
          <Route path="/salt-calculation" element={<SaltCalculation />} />  {/* Trang salt-calculation */}
        </Routes>
      </Router>
  );
}

export default App;

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login';
import Signup from './signup';
import Home from './Home';
import NotFound from './404';
import MemberProfile from './Member/MemberProfile';
import UpdateMember from './Member/UpdateMember';
import ManageFish from './Fish/ManageFish';
import GrowthRecord from './GrowthRecord/GrowthRecord';
import AddRecord from './GrowthRecord/AddRecord';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<MemberProfile />} />
        <Route path='/UpdateMember/:id' element={<UpdateMember />} />
        <Route path="/manage-fish" element={<ManageFish />} />
        <Route path="/growthRecord" element={<GrowthRecord/>} />
        <Route path="/addRecord" element={<AddRecord/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
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
import FoodCalculator from './Calculator/FoodCalculator';
import FoodHistory from './Fish/ConsumeFoodHistory';
import Chart from './GrowthRecord/Chart';
import Reminder from './Reminder/Reminder';
import Admin from './Admin/Admin';
import BlogList from './Blog/BlogList';
import BlogCreator from './Blog/BlogCreator';
import BlogEditor from './Blog/BlogEditor';

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
        <Route path="/growthRecord" element={<GrowthRecord />} />
        <Route path="/chart" element={<Chart />} />
        <Route path="/addRecord/:fishID" element={<AddRecord />} />
        <Route path="/manage-fish" element={<ManageFish />} />
        <Route path="/calulator/food" element={<FoodCalculator />} />
        <Route path="/consume-food-history" element={<FoodHistory />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/reminder" element={<Reminder />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/public-blogs" element={<BlogList />} />
        <Route path="/create-blog" element={<BlogCreator />} />
        <Route path="/edit-blog/:id" element={<BlogEditor />} />
      </Routes>
    </Router>
  );
};

export default App;
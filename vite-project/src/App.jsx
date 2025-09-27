import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
export default App;

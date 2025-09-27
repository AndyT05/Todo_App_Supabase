import Todo from "./pages/todo";
import SignIn from "./pages/SignIn";
import { Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/todo" element={<Todo />} />
    </Routes>
  );
};
export default App;

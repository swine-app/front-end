import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root';
import Login from './pages/Login';
import PreCommit from "./pages/PreCommit";
import Reporting from "./pages/Reporting";

const router = createHashRouter([
  {path: "/login", element: <Login />},
  {path: "/", element: <Root />, children: [
    {path: "precommit", element: <PreCommit />},
    {path: "reporting", element: <Reporting />}
  ]}
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );

}

export default App;

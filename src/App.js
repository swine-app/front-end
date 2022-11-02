import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Root from './Root';
import Login from './pages/Login';
import PreCommit from "./pages/PreCommit";

const router = createBrowserRouter([
  {path: "/login", element: <Login />},
  {path: "/", element: <Root />, children: [
    {path: "precommit", element: <PreCommit />}
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

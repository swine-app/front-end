import Login from './Login';
import config from "./config";

function App() {
  console.log(process.env)
  console.log(config)
  return (
    <div className="App">
      <Login />
    </div>
  );

}

export default App;

import './App.css'
import DownloadCsv from './Components/Body/DownloadCsv';
import Download from './Components/Body/DownloadJson';
import Form from './Components/Body/Form'
import { BrowserRouter as Router, Route, createBrowserRouter } from "react-router-dom";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <h2>Whats upp</h2>,
    },
    {
      path: "/form",
      element: <Form />,
    },
  ]);

  return (
    <div className="App" >
      {/* <Router routes={router} /> */}
      {/* <h1>Hey</h1> */}
      <Form/>
      <Download/>
      <DownloadCsv/>
    </div>
  );
}

export default App;
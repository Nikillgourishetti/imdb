import Banner from "./components/Banner";
import Movies from "./components/Movies";
import NavBar from "./components/NavBar";
import Watchlist from "./components/Watchlist";

import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>

    <div className="App">
    <NavBar />
      <Routes>
        <Route
        path="/"
        element={
          <>
            <Banner />
            <Movies />
          </>
        }
        />
        <Route
        path="/watchlist"
        element={
          <>
            <Watchlist />
          </>
        }
        />
      </Routes>
    
    </div>
    </BrowserRouter>
  );
}

export default App;

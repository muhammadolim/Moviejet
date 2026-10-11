// Components and Pages
import Home from "./pages/Home";
import Nav from "./components/Nav";
import MovieDetails from "./pages/MovieDetails";
import Search from "./pages/Search";
import NotFound from "./pages/NotFound";

//Router
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
    const location = useLocation();

    return (
        <div className="App">
            <Nav />
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
				<Route path="/movie/:id" element={<MovieDetails />} />
				<Route path="/search/:query" element={<Search />} />
				<Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;

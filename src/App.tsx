import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Info from './Info';
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="app-layout">
                <nav className="app-nav">
                    <div className="nav-content">
                        <Link to="/" className="nav-brand">PDFMan</Link>
                        <ul className="nav-links">
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/info">Info</Link></li>
                        </ul>
                    </div>
                </nav>

                <main className="app-main">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/info" element={<Info />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;

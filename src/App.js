import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={<h1 align="center">Welcome to the Home Page</h1>}/>
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
}

export default App;

import { Link } from 'react-router-dom';
import './ReviewForm.css';
function NavBar() {
  return (
    <nav style={{ backgroundColor: '#007bff', padding: '1rem' }} className='nav'>
      <Link to="/" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
        Home
      </Link>
      <Link to="/products" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>
        Products
      </Link>
    </nav>
  );
}

export default NavBar;

import { Link, useLocation, useNavigate } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleTitleClick = () => {
    navigate('/');
  };

  return (
    <header className="bg-gray-50 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span 
            onClick={handleTitleClick}
            className="text-2xl font-extrabold tracking-tight text-[#889e38] drop-shadow-sm cursor-pointer hover:text-[#6e812e] transition"
          >
            🎂 Birthday Tracker App
          </span>
        </div>
        <nav className="bg-white rounded-xl shadow flex overflow-hidden border border-gray-200">
          {token ? (
            <>
              <button
                onClick={() => navigate('/profile')}
                className="px-4 md:px-6 py-2 md:py-3 text-base md:text-lg font-semibold transition-colors focus:outline-none bg-white text-[#1a1a1a] hover:bg-[#e6ebd6] rounded-lg"
                style={{ borderRight: '1px solid #e5e7eb' }}
              >
                Profil
              </button>
              <button
                onClick={handleLogout}
                className="px-4 md:px-6 py-2 md:py-3 text-base md:text-lg font-semibold transition-colors focus:outline-none bg-white text-[#1a1a1a] hover:bg-[#e53935] hover:text-white rounded-lg"
              >
                Çıkış Yap
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`px-4 md:px-6 py-2 md:py-3 text-base md:text-lg font-semibold transition-colors focus:outline-none rounded-lg ${location.pathname === '/login'
                  ? 'bg-[#889e38] text-white shadow'
                  : 'text-[#1a1a1a] hover:bg-[#e6ebd6]'} `}
                style={{ borderRight: '1px solid #e5e7eb' }}
              >
                Giriş Yap
              </Link>
              <Link
                to="/register"
                className={`px-4 md:px-6 py-2 md:py-3 text-base md:text-lg font-semibold transition-colors focus:outline-none rounded-lg ${location.pathname === '/register'
                  ? 'bg-[#889e38] text-white shadow'
                  : 'text-[#1a1a1a] hover:bg-[#e6ebd6]'} `}
              >
                Üye Ol
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;

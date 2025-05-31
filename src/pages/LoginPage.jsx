import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-start justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 w-full max-w-md border border-gray-200 mt-8">
        
        <div className="flex mb-6 md:mb-8">
          <button
            className="flex-1 py-2 md:py-4 rounded-tl-xl rounded-bl-xl text-base md:text-lg font-bold transition-colors focus:outline-none"
            style={{ background: '#889e38', color: 'white', boxShadow: '0 2px 8px #889e3840' }}
          >
            Giriş Yap
          </button>
          <button
            className="flex-1 py-2 md:py-4 rounded-tr-xl rounded-br-xl text-base md:text-lg font-bold transition-colors focus:outline-none text-[#1a1a1a] bg-white border border-l-0 border-gray-200"
            onClick={() => navigate('/register')}
          >
            Üye Ol
          </button>
        </div>

        <form
          onSubmit={async e => {
            e.preventDefault();
            setError('');
            setLoading(true);
            try {
              const response = await axios.post(`${API_BASE}/login`, { email, password });
              localStorage.setItem('token', response.data.token);
              navigate('/dashboard');
            } catch (err) {
              if (err.response?.data?.message) {
                setError(err.response.data.message);
              } else {
                setError('Bir hata oluştu.');
              }
            } finally {
              setLoading(false);
            }
          }}
          className="space-y-6"
        >
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="E-posta"
            className="w-full bg-[#f0f4ff] text-base md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Şifre"
            className="w-full bg-[#f0f4ff] text-base md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition"
            required
          />
          {error && <div className="text-red-500 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-[#889e38] text-white text-base md:text-lg font-bold py-2 md:py-3 rounded-lg mt-2 shadow-md hover:bg-[#6e812e] transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;

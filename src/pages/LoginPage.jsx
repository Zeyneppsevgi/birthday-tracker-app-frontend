import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(f => ({ ...f, [name]: value }));
    if (formErrors[name]) {
        setFormErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const handleEmailBlur = () => {
    if (!isValidEmail(formData.email)) {
      setFormErrors(prevErrors => ({ ...prevErrors, email: "Geçersiz e-posta formatı" }));
    } else {
       setFormErrors(prevErrors => ({ ...prevErrors, email: '' }));
    }
  };

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
            const newErrors = {};
            setFormErrors({});

            if (!isValidEmail(formData.email)) {
                newErrors.email = "Geçersiz e-posta formatı";
            }
            if (formData.password.length < 6) {
                newErrors.password = "Parola en az 6 karakter olmalıdır";
            }

            setFormErrors(newErrors);

            if (Object.keys(newErrors).length > 0) {
                return;
            }

            
            setLoading(true);
            try {
              const response = await axios.post(`${API_BASE}/login`, { email: formData.email, password: formData.password });
              localStorage.setItem('token', response.data.token);
              navigate('/dashboard');
            } catch (err) {
              if (err.response?.data?.errors) {
                setFormErrors(err.response.data.errors);
              } else if (err.response?.data?.message) {
                 setFormErrors({});
                 setError(err.response.data.message);
              } else {
                 setFormErrors({});
                 setError('Bir hata oluştu.');
              }
            } finally {
              setLoading(false);
            }
          }}
          className="space-y-6"
        >
           <div>
            <label className="block text-base font-medium mb-1">E-posta</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleEmailBlur}
              placeholder="E-posta"
               className={`w-full bg-[#f0f4ff] text-base md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-lg border ${formErrors.email ? 'border-red-500' : 'border-gray-200'} focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition`}
              required
            />
             {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
          </div>

           <div>
            <label className="block text-base font-medium mb-1">Şifre</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Şifre"
              className={`w-full bg-[#f0f4ff] text-base md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-lg border ${formErrors.password ? 'border-red-500' : 'border-gray-200'} focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition`}
              required
            />
             {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center text-sm mt-4">
              {error}
            </div>
          )}

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

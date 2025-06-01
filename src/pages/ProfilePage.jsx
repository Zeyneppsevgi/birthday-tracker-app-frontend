import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProfilePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    password: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Oturum bulunamadı. Lütfen tekrar giriş yapın.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${API_BASE_URL}/auth/user/info`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (response.data && response.data.data) {
          setFormData({
            firstName: response.data.data.firstName || '',
            lastName: response.data.data.lastName || '',
            birthDate: response.data.data.birthDate || '',
            password: '',
          });
        } else {
          setError('Kullanıcı bilgileri alınamadı.');
        }
        setLoading(false);
      } catch (err) {
        console.error('Profil bilgileri yüklenirken hata:', err);
        if (err.response) {
          setError(`Hata: ${err.response.data?.message || 'Sunucu hatası'}`);
        } else if (err.request) {
          setError('Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.');
        } else {
          setError('Bir hata oluştu. Lütfen tekrar deneyin.');
        }
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === 'password' && passwordError) {
        setPasswordError('');
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    setPasswordError('');

    if (formData.password && formData.password.length < 6) {
        setPasswordError('Parola en az 6 karakter olmalıdır');
        return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Oturum bulunamadı. Lütfen tekrar giriş yapın.');
        setLoading(false);
        return;
      }

      await axios.put(`${API_BASE_URL}/auth/user/update`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Profil güncellendi!');
      setLoading(false);
      setFormData(prev => ({ ...prev, password: '' }));
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      console.error('Profil güncellenirken hata:', err);
      if (err.response) {
        if (err.response.data?.errors?.password) {
            setPasswordError(err.response.data.errors.password);
        } else {
            setError(`Hata: ${err.response.data?.message || 'Sunucu hatası'}`);
        }
      } else if (err.request) {
        setError('Sunucuya ulaşılamıyor. Lütfen internet bağlantınızı kontrol edin.');
      } else {
        setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-4">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-[60vh] flex items-start justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md border border-gray-200 mt-8">
        <h2 className="text-2xl font-extrabold text-[#222] mb-6 text-center tracking-tight">Profil Bilgileri</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-base font-medium mb-1">Adınız</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-[#f0f4ff] text-base px-5 py-3 rounded-lg border border-gray-200 focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition placeholder-gray-400 font-sans"
              style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-1">Soyadınız</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-[#f0f4ff] text-base px-5 py-3 rounded-lg border border-gray-200 focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition placeholder-gray-400 font-sans"
              style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-1">Doğum Tarihi</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              className="w-full bg-[#f0f4ff] text-base px-5 py-3 rounded-lg border border-gray-200 focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition placeholder-gray-400 font-sans"
              style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}
              required
            />
          </div>
          <div>
            <label className="block text-base font-medium mb-1">
              Yeni Şifre <span className="text-sm italic text-gray-500">(İsteğe bağlı)</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full bg-[#f0f4ff] text-base px-5 py-3 rounded-lg border ${passwordError ? 'border-red-500' : 'border-gray-200'} focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition placeholder-gray-400 font-sans`}
              style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}
              placeholder="Şifreyi değiştirmek için girin"
            />
            {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
          </div>
          {success && <div className="text-green-600 text-center">{success}</div>}
          {error && <div className="text-red-500 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-[#889e38] text-white text-lg font-bold py-3 rounded-lg mt-2 shadow-md hover:bg-[#6e812e] transition disabled:opacity-60"
            disabled={loading}
          >
            Güncelle
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    birthdate: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-start justify-center bg-gray-50">
      <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8 w-full max-w-md border border-gray-200 mt-8">
        
        <div className="flex mb-6 md:mb-8">
          <button
            className="flex-1 py-2 md:py-4 rounded-tl-xl rounded-bl-xl text-base md:text-lg font-bold transition-colors focus:outline-none text-[#1a1a1a] bg-white border border-r-0 border-gray-200"
            onClick={() => navigate('/login')}
          >
            Giriş Yap
          </button>
          <button
            className="flex-1 py-2 md:py-4 rounded-tr-xl rounded-br-xl text-base md:text-lg font-bold transition-colors focus:outline-none"
            style={{ background: '#889e38', color: 'white', boxShadow: '0 2px 8px #889e3840' }}
          >
            Üye Ol
          </button>
        </div>
        <form onSubmit={async e => {
          e.preventDefault();
          setError('');
          setSuccess('');
          setLoading(true);
          try {
            const response = await axios.post('http://localhost:3000/api/register', form);
            setSuccess(response.data.message || 'Kayıt başarılı');
            setForm({ name: '', surname: '', email: '', password: '', birthdate: '' });
          } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
              setError(err.response.data.message);
            } else {
              setError('Bir hata oluştu.');
            }
          } finally {
            setLoading(false);
          }
        }} className="space-y-6">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            placeholder="İsim"
            className="w-full bg-[#f0f4ff] text-base md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition"
            required
          />
          <input
            type="text"
            name="surname"
            value={form.surname}
            onChange={e => setForm(f => ({ ...f, surname: e.target.value }))}
            placeholder="Soyisim"
            className="w-full bg-[#f0f4ff] text-base md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition"
            required
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="E-posta"
            className="w-full bg-[#f0f4ff] text-base md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            placeholder="Şifre"
            className="w-full bg-[#f0f4ff] text-base md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition"
            required
          />
          <input
            type="date"
            name="birthdate"
            value={form.birthdate}
            onChange={e => setForm(f => ({ ...f, birthdate: e.target.value }))}
            placeholder="Doğum Tarihi"
            className="w-full bg-[#f0f4ff] text-base md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-lg border border-gray-200 focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition"
            required
          />
          {error && <div className="text-red-500 text-center">{error}</div>}
          {success && <div className="text-green-600 text-center">{success}</div>}
          <button
            type="submit"
            className="w-full bg-[#889e38] text-white text-base md:text-lg font-bold py-2 md:py-3 rounded-lg mt-2 shadow-md hover:bg-[#6e812e] transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
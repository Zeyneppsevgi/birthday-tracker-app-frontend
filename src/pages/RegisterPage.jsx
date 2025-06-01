import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE);

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

function RegisterPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    birthDate: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [birthDateError, setBirthDateError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === 'birthDate' && birthDateError) {
        setBirthDateError('');
    }
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

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
        <form
          onSubmit={async e => {
            e.preventDefault();
            setSuccess('');
            const newErrors = {};
            setFormErrors({});
            setBirthDateError('');

            if (form.firstName.length < 3) {
                newErrors.firstName = "İsim en az 3 karakter olmalıdır";
            }
            if (form.lastName.length < 3) {
                newErrors.lastName = "Soyadı en az 3 karakter olmalıdır";
            }
            if (!isValidEmail(form.email)) {
                newErrors.email = "Geçersiz e-posta formatı";
            }
            if (form.password.length < 6) {
                newErrors.password = "Parola en az 6 karakter olmalıdır";
            }
            
            const today = new Date().toISOString().split('T')[0];
            if (form.birthDate && form.birthDate > today) {
                setBirthDateError('Doğum tarihi gelecekte olamaz.');
                 setFormErrors(newErrors);
                return;
            }

            setFormErrors(newErrors);

            if (Object.keys(newErrors).length > 0) {
                return;
            }

            setLoading(true);
            try {
              const response = await axios.post(`${API_BASE}/register`, form);
              setSuccess(response.data.message || 'Kayıt başarılı');
              setForm({ firstName: '', lastName: '', email: '', password: '', birthDate: '' });
              setFormErrors({});
              setBirthDateError('');
              
              setTimeout(() => {
                navigate('/login');
              }, 2000);
            } catch (err) {
              console.error('Kayıt hatası:', err);
              if (err.response?.data?.errors) { 
                 if (err.response.data?.errors?.birthDate) {
                     setBirthDateError(err.response.data.errors.birthDate);
                 } else {
                    setFormErrors(err.response.data.errors);
                 }
              } else {
                setFormErrors({});
                setBirthDateError('');
                setSuccess(''); 
                alert(`Kayıt sırasında bir hata oluştu: ${err.response?.data?.message || err.message}`);
              }
            } finally {
              setLoading(false);
            }
          }}
          className="space-y-6"
        >
           <div>
            <label className="block text-base font-medium mb-1">İsim</label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleInputChange} 
              placeholder="İsim"
              className={`w-full bg-[#f0f4ff] text-base md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-lg border ${formErrors.firstName ? 'border-red-500' : 'border-gray-200'} focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition`}
              required
            />
             {formErrors.firstName && <p className="text-red-500 text-xs mt-1">{formErrors.firstName}</p>} 
          </div>

           <div>
            <label className="block text-base font-medium mb-1">Soyisim</label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleInputChange} 
              placeholder="Soyisim"
              className={`w-full bg-[#f0f4ff] text-base md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-lg border ${formErrors.lastName ? 'border-red-500' : 'border-gray-200'} focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition`}
              required
            />
             {formErrors.lastName && <p className="text-red-500 text-xs mt-1">{formErrors.lastName}</p>} 
          </div>

           <div>
            <label className="block text-base font-medium mb-1">E-posta</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleInputChange} 
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
              value={form.password}
              onChange={handleInputChange} 
              placeholder="Şifre"
              className={`w-full bg-[#f0f4ff] text-base md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-lg border ${formErrors.password ? 'border-red-500' : 'border-gray-200'} focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition`}
              required
            />
             {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>} 
          </div>

           <div>
            <label className="block text-base font-medium mb-1">Doğum Tarihi</label>
            <input
              type="date"
              name="birthDate"
              value={form.birthDate}
              onChange={handleInputChange} 
              placeholder="Doğum Tarihi"
              className={`w-full bg-[#f0f4ff] text-base md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-lg border ${formErrors.birthDate || birthDateError ? 'border-red-500' : 'border-gray-200'} focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition`}
              required
            />
             {formErrors.birthDate && <p className="text-red-500 text-xs mt-1">{formErrors.birthDate}</p>} 
             {birthDateError && <p className="text-red-500 text-xs mt-1">{birthDateError}</p>}
          </div>

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

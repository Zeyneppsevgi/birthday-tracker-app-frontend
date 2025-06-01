import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;
console.log(API_BASE);

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const isValidDate = (dateString) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;
    if(!dateString.match(regEx)) return false; 
    const d = new Date(dateString);
    const dNum = d.getTime();
    if(!dNum && dNum !== 0) return false; 
    return d.toISOString().slice(0,10) === dateString;
};

function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    birthdate: '',
  });
 
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

   const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (formErrors[name]) {
        setFormErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
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

            if (form.name.length < 3) {
                newErrors.name = "İsim en az 3 karakter olmalıdır";
            }
            if (form.surname.length < 3) {
                newErrors.surname = "Soyadı en az 3 karakter olmalıdır";
            }
            if (!isValidEmail(form.email)) {
                newErrors.email = "Geçersiz e-posta formatı";
            }
            if (form.password.length < 6) {
                newErrors.password = "Parola en az 6 karakter olmalıdır";
            }
             if (!isValidDate(form.birthdate)) {
                 newErrors.birthdate = "Doğum tarihi formatı YYYY-MM-DD olmalıdır";
             }

            
            setFormErrors(newErrors);

            
            if (Object.keys(newErrors).length > 0) {
                return;
            }

            setLoading(true);
            try {
              const response = await axios.post(`${API_BASE}/register`, form);
              setSuccess(response.data.message || 'Kayıt başarılı');
              setForm({ name: '', surname: '', email: '', password: '', birthdate: '' });
              
              setFormErrors({});
            } catch (err) {
              
              if (err.response?.data?.errors) { 
                setFormErrors(err.response.data.errors);
              } else {
                 
                 setFormErrors({});
                 setSuccess(''); 
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
              name="name"
              value={form.name}
              onChange={handleInputChange} 
              placeholder="İsim"
              className={`w-full bg-[#f0f4ff] text-base md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-lg border ${formErrors.name ? 'border-red-500' : 'border-gray-200'} focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition`}
              required
            />
             {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>} 
          </div>

           <div>
            <label className="block text-base font-medium mb-1">Soyisim</label>
            <input
              type="text"
              name="surname"
              value={form.surname}
              onChange={handleInputChange} 
              placeholder="Soyisim"
              className={`w-full bg-[#f0f4ff] text-base md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-lg border ${formErrors.surname ? 'border-red-500' : 'border-gray-200'} focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition`}
              required
            />
             {formErrors.surname && <p className="text-red-500 text-xs mt-1">{formErrors.surname}</p>} 
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
              name="birthdate"
              value={form.birthdate}
              onChange={handleInputChange} 
              placeholder="Doğum Tarihi"
              className={`w-full bg-[#f0f4ff] text-base md:text-lg px-3 md:px-4 py-2 md:py-3 rounded-lg border ${formErrors.birthdate ? 'border-red-500' : 'border-gray-200'} focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition`}
              required
            />
             {formErrors.birthdate && <p className="text-red-500 text-xs mt-1">{formErrors.birthdate}</p>} 
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

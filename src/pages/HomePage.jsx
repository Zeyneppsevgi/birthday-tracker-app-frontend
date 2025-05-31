import { Link, useNavigate } from 'react-router-dom';
import { FaBirthdayCake, FaUsers, FaCalendarAlt } from 'react-icons/fa';

function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const features = [
    {
      icon: <FaBirthdayCake className="w-8 h-8 text-[#889e38]" />,
      title: "Doğum Günü Takibi",
      description: "Arkadaşlarınızın ve sevdiklerinizin doğum günlerini kolayca takip edin."
    },
    {
      icon: <FaUsers className="w-8 h-8 text-[#889e38]" />,
      title: "Kategoriler",
      description: "Arkadaşlarınızı kategorilere ayırarak düzenli bir şekilde yönetin."
    },
    {
      icon: <FaCalendarAlt className="w-8 h-8 text-[#889e38]" />,
      title: "Kolay Yönetim",
      description: "Doğum günlerini ekleyin, düzenleyin ve silin."
    }
  ];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a] mb-6">
          Birthday Tracker App
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Sevdiklerinizin doğum günlerini asla unutmayın. Kolay takip ve daha fazlası.
        </p>
        {token ? (
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-[#889e38] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#6e812e] transition shadow-lg"
          >
            Dashboard'a Git
          </button>
        ) : (
          <div className="space-x-4">
            <Link
              to="/register"
              className="bg-[#889e38] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#6e812e] transition shadow-lg inline-block"
            >
              Hemen Başla
            </Link>
            <Link
              to="/login"
              className="bg-white text-[#889e38] px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-50 transition shadow-lg border border-[#889e38] inline-block"
            >
              Giriş Yap
            </Link>
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition"
          >
            <div className="mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-[#1a1a1a] mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
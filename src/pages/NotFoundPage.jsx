import { Link } from 'react-router-dom';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

function NotFoundPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
      <div className="text-center">
        <div className="mb-8">
          <FaExclamationTriangle className="w-24 h-24 text-[#889e38] mx-auto" />
        </div>
        <h1 className="text-6xl font-extrabold text-[#1a1a1a] mb-4">404</h1>
        <h2 className="text-3xl font-bold text-[#1a1a1a] mb-6">Sayfa Bulunamadı</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Aradığınız sayfa mevcut değil veya taşınmış olabilir.
        </p>
        <Link
          to="/"
          className="inline-flex items-center bg-[#889e38] text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-[#6e812e] transition shadow-lg"
        >
          <FaHome className="mr-2" />
          Ana Sayfaya Dön
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
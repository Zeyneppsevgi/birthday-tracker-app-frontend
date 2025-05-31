import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaSearch, FaPlus, FaEdit } from 'react-icons/fa';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function DashboardPage() {
  const [birthdays, setBirthdays] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [modalFriendId, setModalFriendId] = useState(null);
  const [form, setForm] = useState({ name: '', birthDate: '', category: '' });
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  const [categoriesArr, setCategoriesArr] = useState([]);
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState(null);

  const zodiacIcons = {
    'Koç': '♈', 'Boğa': '♉', 'İkizler': '♊', 'Yengeç': '♋',
    'Aslan': '♌', 'Başak': '♍', 'Terazi': '♎', 'Akrep': '♏',
    'Yay': '♐', 'Oğlak': '♑', 'Kova': '♒', 'Balık': '♓',
  };

  const categoryColors = {
    'Family': 'bg-red-100 text-red-700',
    'Friends': 'bg-blue-100 text-blue-700',
    'School': 'bg-yellow-100 text-yellow-800',
    'Job': 'bg-green-100 text-green-700',
    'Dear': 'bg-pink-100 text-pink-700',
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const [birthdaysRes, categoriesRes] = await Promise.all([
          axios.get(`${API_BASE}/auth/friends/sorted`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_BASE}/categories`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setBirthdays(Array.isArray(birthdaysRes.data) ? birthdaysRes.data : []);
        const catMap = {};
        if (Array.isArray(categoriesRes.data)) {
          categoriesRes.data.forEach(cat => {
            catMap[cat.id] = cat.name;
          });
          setCategoriesArr(categoriesRes.data);
        }
        setCategories(catMap);
      } catch (err) {
        setError('Veriler alınamadı.');
        setBirthdays([]);
        setCategories({});
        setCategoriesArr([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const sortedBirthdays = birthdays.slice().sort((a, b) => a.daysLeft - b.daysLeft);
  const filteredBirthdays = sortedBirthdays.filter(friend =>
    friend.name.toLowerCase().includes(search.toLowerCase())
  );

  const openModal = (mode, friend = null) => {
    setModalMode(mode);
    setModalError('');
    setModalSuccess('');
    setModalLoading(false);
    if (mode === 'edit' && friend) {
      setModalFriendId(friend.id);
      setForm({
        name: friend.name,
        birthDate: friend.birthDate,
        category: friend.category,
      });
    } else {
      setModalFriendId(null);
      setForm({ name: '', birthDate: '', category: '' });
    }
    setShowModal(true);
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setModalError('');
    setModalSuccess('');
    setModalLoading(true);
    try {
      const token = localStorage.getItem('token');
      let response;
      if (modalMode === 'add') {
        response = await axios.post(`${API_BASE}/auth/add/friend`, {
          name: form.name,
          birthDate: form.birthDate,
          category: Number(form.category),
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (modalMode === 'edit' && modalFriendId) {
        response = await axios.put(`${API_BASE}/auth/friends/updated/${modalFriendId}`, {
          name: form.name,
          birthDate: form.birthDate,
          categoryId: Number(form.category),
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setModalSuccess(response.data.message || (modalMode === 'add' ? 'Arkadaş eklendi' : 'Arkadaş güncellendi'));
      setForm({ name: '', birthDate: '', category: '' });
      const birthdaysRes = await axios.get(`${API_BASE}/auth/friends/sorted`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBirthdays(Array.isArray(birthdaysRes.data) ? birthdaysRes.data : []);
      setTimeout(() => {
        setShowModal(false);
        setModalSuccess('');
      }, 1000);
    } catch (err) {
      setModalError(err.response?.data?.message || 'Bir hata oluştu.');
    } finally {
      setModalLoading(false);
    }
  };

  const handleDeleteFriend = (id, e) => {
    e.stopPropagation();
    setDeleteTargetId(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteFriend = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE}/auth/friends/deleted/${deleteTargetId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const birthdaysRes = await axios.get(`${API_BASE}/auth/friends/sorted`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBirthdays(Array.isArray(birthdaysRes.data) ? birthdaysRes.data : []);
      setShowDeleteModal(false);
      setDeleteTargetId(null);
    } catch (err) {
      setShowDeleteModal(false);
      setDeleteTargetId(null);
      alert('Silme işlemi başarısız!');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-6 gap-4">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
            <FaSearch />
          </span>
          <input
            type="text"
            placeholder="İsme göre ara..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#f0f4ff] text-base px-5 py-3 rounded-lg border border-gray-200 focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition placeholder-gray-400 font-sans pl-10"
            style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}
          />
        </div>
        <button
          className="bg-[#889e38] text-white rounded-full w-12 h-12 flex items-center justify-center text-3xl shadow-lg hover:bg-[#6e812e] transition-all font-bold focus:outline-none focus:ring-2 focus:ring-[#889e38]/40"
          title="Arkadaş Ekle"
          onClick={() => openModal('add')}
        >
          <FaPlus className="w-5 h-5" />
        </button>
      </div>

      {loading && <div>Yükleniyor...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {!loading && !error && (
        <ul className="space-y-2">
          {filteredBirthdays.map(friend => {
            const catName = categories[friend.category] || categories[String(friend.category)] || categories[Number(friend.category)];
            return (
              <li
                key={friend.id}
                className={`bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between cursor-pointer transition-transform duration-150 hover:scale-[1.025] hover:shadow-lg mb-2 ${friend.daysLeft === 0 ? 'ring-2 ring-green-300' : friend.isUpcoming ? 'ring-2 ring-yellow-200' : ''}`}
                onClick={() => openModal('edit', friend)}
                title="Düzenle"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-lg text-[#222]">{friend.name}</span>
                    {catName && (
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${categoryColors[catName] || 'bg-gray-100 text-gray-700'}`}>{catName}</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                    <span>🎂 {new Date(friend.birthDate).toLocaleDateString('tr-TR')}</span>
                    <span>{zodiacIcons[friend.zodiac] || '⭐'} {friend.zodiac}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {friend.daysLeft === 0 && <span className="text-green-700 font-bold">Bugün Doğum Günü!</span>}
                  {friend.isUpcoming && friend.daysLeft > 0 && <span className="text-yellow-700 font-semibold">{friend.daysLeft} gün sonra</span>}
                  {!friend.isUpcoming && friend.daysLeft > 0 && <span className="text-gray-500">{friend.daysLeft} gün sonra</span>}
                  {friend.daysLeft > 350 && <span className="text-gray-400">Geçti</span>}
                  <button
                    className="ml-2 bg-red-500 hover:bg-red-700 text-white p-2 rounded-full shadow transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                    title="Sil"
                    onClick={e => handleDeleteFriend(friend.id, e)}
                  >
                    <FaTrash size={16} />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6">
              {modalMode === 'add' ? 'Yeni Arkadaş Ekle' : 'Arkadaş Düzenle'}
            </h3>
            <form onSubmit={handleModalSubmit} className="space-y-6">
              <div>
                <label className="block text-base font-medium mb-1">İsim</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
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
                  value={form.birthDate}
                  onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
                  className="w-full bg-[#f0f4ff] text-base px-5 py-3 rounded-lg border border-gray-200 focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition placeholder-gray-400 font-sans"
                  style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}
                  required
                />
              </div>
              <div>
                <label className="block text-base font-medium mb-1">Kategori</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full bg-[#f0f4ff] text-base px-5 py-3 rounded-lg border border-gray-200 focus:border-[#889e38] focus:ring-2 focus:ring-[#889e38]/20 outline-none transition placeholder-gray-400 font-sans"
                  style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}
                  required
                >
                  <option value="">Kategori Seçin</option>
                  {categoriesArr.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 text-base font-semibold text-gray-600 hover:text-gray-800 transition"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="bg-[#889e38] text-white px-6 py-3 rounded-lg text-base font-semibold hover:bg-[#6e812e] transition shadow-md"
                >
                  {modalMode === 'add' ? 'Ekle' : 'Güncelle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-6">Arkadaşı Sil</h3>
            <p className="text-base text-gray-700 mb-6">
              Bu arkadaşı silmek istediğinizden emin misiniz?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={confirmDeleteFriend}
                className="px-6 py-3 text-base font-semibold text-gray-600 hover:text-gray-800 transition"
              >
                Sil
              </button>
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-6 py-3 text-base font-semibold text-gray-600 hover:text-gray-800 transition"
              >
                İptal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardPage;

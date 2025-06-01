# Birthday Tracker App (Doğum Günü Takip Uygulaması)

🌐 [https://birthday-tracker-app-mu.vercel.app](https://birthday-tracker-app-mu.vercel.app)

> Bu uygulamanın frontend kısmı [Vercel](https://vercel.com) üzerinde deploy edilmiştir.

Birthday Tracker App, kullanıcıların arkadaşları ve tanıdıklarının doğum günlerini kaydetmelerini, yönetmelerini ve takip etmelerini sağlayan  bir web uygulamasıdır. Sevdiklerinizin doğum günlerini unutmamanıza ve düzenli bir şekilde yönetmenize yardımcı olur.

**Proje Reposu:** [https://github.com/Zeyneppsevgi/birthday-tracker-app-frontend](https://github.com/Zeyneppsevgi/birthday-tracker-app-frontend)

##  Özellikler

* **Kullanıcı Kimlik Doğrulama**:
    * Güvenli kullanıcı kayıt özelliği.
    * Mevcut kullanıcılar için giriş yapma özelliği.
    * Kimlik doğrulama belirteci (token) kullanılarak korunan özel yollar (/dashboard, /profile).
* **Kontrol Paneli (Dashboard)**:
    * Kayıtlı doğum günlerinin kapsamlı bir listesini görüntüler.
    * Doğum gününe kalan gün sayısını gösterir, aynı gün olan veya yaklaşan doğum günlerini vurgular.
    * **CRUD İşlemleri**:
        * Yeni doğum günü ekleme (isim, tarih, kategori).
        * Mevcut doğum günü bilgilerini düzenleme.
        * Gereksiz doğum günü bilgilerini silme (onay penceresi ile).
    * **Arama**: İsimle gerçek zamanlı arama özelliği.
    * **Sayfalama**: Çok sayıda veriyi kolayca yönetmek için sayfa numaralandırma.
    * **Kategori Yönetimi**: Doğum günlerini "Aile", "Arkadaşlar", "Okul", "İş", "Sevgili" gibi kategorilere ayırma.
    * Her kategoriye görsel ayrım için özel renkler atanmıştır.
    * **Burç Gösterimi**: Doğum tarihinden otomatik olarak burcu hesaplar ve simgesiyle birlikte gösterir.
* **Profil Yönetimi**:
    * Kullanıcıların kendi profil bilgilerini (isim, soyisim, doğum tarihi) görüntülemesi ve güncellemesi.
    * Şifre değiştirme özelliği (isteğe bağlı).
* **Duyarlı Tasarım**:
    * Tailwind CSS kullanılarak çeşitli ekran boyutlarına uyum sağlayan modern ve duyarlı kullanıcı arayüzü.
* **Ana Sayfa**:
    * Uygulamanın temel özelliklerini tanıtan karşılama sayfası.
    * Kimliği doğrulanmamış kullanıcılar için kayıt/giriş bağlantıları, kimliği doğrulanmış kullanıcılar için kontrol paneline yönlendirme.
* **Hata Yönetimi ve Yükleme Durumları**:
    * API istekleri sırasında yükleme göstergeleri.
    * Kullanıcı dostu hata mesajları gösterimi.
* **Modal Pencereler**:
    * Doğum günü bilgisi ekleme/düzenleme için kullanılan pencereler.
    * Silme işlemleri için onay pencereleri.

##  Kullanılan Teknolojiler

* **Ön Yüz (Frontend)**:
    * [React](https://reactjs.org/) (v19.1.0) - Kullanıcı arayüzü kütüphanesi
    * [Vite](https://vitejs.dev/) (v6.3.5) - Ön yüz geliştirme ve derleme aracı
    * [React Router DOM](https://reactrouter.com/) (v7.6.1) - İstemci taraflı yönlendirme
    * [Tailwind CSS](https://tailwindcss.com/) (v4.1.8) - Yardımcı sınıf tabanlı CSS çatısı
    * [@tailwindcss/vite](https://www.npmjs.com/package/@tailwindcss/vite) (v4.1.8) - Vite için Tailwind CSS eklentisi
* **HTTP İstemcisi**:
    * [Axios](https://axios-http.com/) (v1.9.0) - Promise tabanlı HTTP istemcisi
* **İkonlar**:
    * [React Icons](https://react-icons.github.io/react-icons/) (v5.5.0)
* **Fontlar**:
    * [@fontsource/montserrat](https://fontsource.org/fonts/montserrat) (v5.2.5) - Montserrat fontu
* **Linting ve Formatlama**:
    * [ESLint](https://eslint.org/) (v9.28.0)
    * [Prettier](https://prettier.io/) (v3.5.3)
    * Çeşitli ESLint eklentileri (jsx-a11y, react, react-hooks, react-refresh, prettier-config)
* **Geliştirme Araçları**:
    * @types/react, @types/react-dom - TypeScript tip tanımlamaları
    * globals

##  Kurulum ve Çalıştırma

Projeyi yerel makinenizde kurmak ve çalıştırmak için aşağıdaki adımları izleyin.

### Ön Koşullar

* [Node.js](https://nodejs.org/) (Tavsiye edilen sürüm: 18.x veya üzeri)
* [npm](https://www.npmjs.com/) (Node.js ile birlikte gelir) veya [yarn](https://yarnpkg.com/)

### Kurulum

1.  **Depoyu klonlayın:**
    
bash
    git clone [https://github.com/Zeyneppsevgi/birthday-tracker-app-frontend.git](https://github.com/Zeyneppsevgi/birthday-tracker-app-frontend.git)
    cd birthday-tracker-app


2.  **Bağımlılıkları yükleyin:**
    
bash
    npm install
    # veya
    # yarn install


3.  **Ortam değişkenlerini ayarlayın:**
    Projenin kök dizininde .env adında bir dosya oluşturun ve backend API'nizin temel URL'sini ayarlayın.
    
env
    VITE_API_BASE_URL=https://birthday-tracker-production.up.railway.app/api


### Geliştirme Sunucusunu Çalıştırma

Aşağıdaki komutu çalıştırarak geliştirme sunucusunu başlatın:
bash
npm run dev

Uygulama varsayılan olarak http://localhost:5173 (veya Vite'ın belirlediği başka bir port) adresinde çalışmaya başlayacaktır.

## Kullanılabilir Komutlar

package.json dosyasında aşağıdaki komutlar tanımlanmıştır:

-   npm run dev: Uygulamayı geliştirme modunda başlatır.
-   npm run build: Uygulamayı üretim için derler. Derlenmiş dosyalar dist klasörüne çıkarılır.
-   npm run lint: ESLint kullanarak kodun statik analizini yapar.
-   npm run preview: dist klasöründeki üretim için derlenmiş uygulamayı yerel olarak önizler.

##  Proje Yapısı

Başlıca klasör ve dosyaların genel görünümü:
```
birthday-tracker-app/
├── src/
│   ├── components/           # Yeniden kullanılabilir arayüz bileşenleri
│   │   └── Layout/           # Header, Footer gibi düzen bileşenleri
│   ├── pages/                # Her bir rotaya karşılık gelen sayfa bileşenleri
│   │   ├── DashboardPage.jsx
│   │   ├── HomePage.jsx     
│   │   ├── LoginPage.jsx    
│   │   ├── NotFoundPage.jsx 
│   │   ├── ProfilePage.jsx  
│   │   └── RegisterPage.jsx 
│   ├── App.jsx               # Ana uygulama bileşeni (yönlendirme ayarları)
│   ├── index.css             # Global stiller, Tailwind CSS importları
│   └── main.jsx              # React uygulamasının giriş noktası
├── .eslintrc.cjs             # ESLint ayar dosyası
├── .gitignore                # Git tarafından yok sayılacak dosyalar/klasörler
├── index.html                # Ana HTML dosyası
├── package.json              # Proje meta verileri ve bağımlılıklar
├── tailwind.config.js        # Tailwind CSS ayarları
└── vite.config.js            # Vite ayar dosyası

```

## API Entegrasyonu

Bu uygulama, aşağıdaki işlemleri gerçekleştirmek için bir backend API ile iletişim kurar:

-   Kullanıcı kimlik doğrulaması (kayıt, giriş)
-   Kullanıcı profil bilgilerinin alınması ve güncellenmesi
-   Doğum günü verilerinin alınması, eklenmesi, güncellenmesi ve silinmesi
-   Kategori verilerinin alınması

API'nin temel URL'si, .env dosyasındaki VITE_API_BASE_URL ortam değişkeni ile ayarlanır. Tüm API istekleri axios kullanılarak yapılır ve kimlik doğrulaması gerektiren uç noktalara Authorization başlığında Bearer token eklenir.

##  Yönlendirme (Routing)

Uygulamanın yönlendirme işlemleri react-router-dom kullanılarak src/App.jsx dosyasında yönetilmektedir.

-   **Herkese Açık Yollar (Public Routes)**:
    -   /: HomePage.jsx - Uygulamanın tanıtım sayfası
    -   /login: LoginPage.jsx - Kullanıcı giriş sayfası
    -   /register: RegisterPage.jsx - Yeni kullanıcı kayıt sayfası
-   **Özel Yollar (Private Routes)** (Kimlik doğrulaması gerektirir):
    -   /dashboard: DashboardPage.jsx - Doğum günü yönetim paneli
    -   /profile: ProfilePage.jsx - Kullanıcı profil sayfası
    -   Özel yollar PrivateRoute bileşeni ile sarmalanmıştır; localStorage içinde geçerli bir belirteç bulunamazsa /login sayfasına yönlendirilir.
-   **Diğerleri**:
    -   *: NotFoundPage.jsx - Tanımlanmamış yollara erişildiğinde görüntülenir

##  Stil (Styling)

-   **Tailwind CSS**: Arayüz bileşenlerinin stillendirilmesinde yardımcı sınıf öncelikli bir yaklaşımla kullanılır. Ayarları tailwind.config.js dosyasındadır.
-   **Montserrat Fontu**: @fontsource/montserrat aracılığıyla global olarak uygulanır ve index.css dosyasında yüklenir.
-   **Global Stiller**: src/index.css dosyası, Tailwind CSS direktiflerini ve temel body stillerini içerir.

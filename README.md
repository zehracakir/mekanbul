# MekanBul Uygulaması
---
Süleyman Demirel Üniversitesi Bilgisayar Mühendisliği bölümünde Web Teknolojileri ve Programlama dersinde yapmış olduğum insanların konumları civarındaki mekanları, sunduğu imkanları görmelerini, mekanlara yorum yapabilmelerini sağlayan bir web uygulamasıdır.

- Uygulamanın aynı zamanda bir admin paneli mevcuttur. Admin mekan ekleme, silme, güncelleme, tüm mekanları görme gibi işlemleri yapabilmektedir.
 ## Uygulama Özellikleri
 - Uygulama front-end ve back-end olmak üzere iki kısımdan oluşmaktadır. **MVC** mimarisine uygun bir şekilde tasarlanmıştır. Frontend, Bootstrap, PugJS, CSS, Javascript ile kodlanmıştır. Backend'de NodeJS üzerinde geliştirilmiş REST API çalışmaktadır.
 - Normal Kullanıcı: Konuma göre mekan listeleme, mekan detaylarını görebilme
 - Admin: Tüm mekanları listeleme, mekan detaylarını görebilme, mekan ekleme; mekan silme, mekan güncelleme.
 
 ## Kullanılan Teknolojiler ve Araçlar
 - Front-end: PugJS, CSS, JSX, Javascript
 - Back-end: NodeJS, ExpressJS, Javascript
 - Veritabanı: MongoDB
 - Veri Modelleme: Mongoose
 - Kimlik Doğrulama, Güvenlik: PassportJS, JWT
 - Haberleşme: REST API, Axios
 - Test: Mocha,Mochawesome, Chai, Supertest
 - IDE: Visual Studio Code
 - REST API Client: Thunder Client
 - Versiyonlama: Git

## API Metotları
- Tüm koleksiyon thunder-collection_Zehra Çakır Mekanbul API Testi.json dosyasında yer almaktadır. Thunder Client aracılığı ile import edilebilir.
- Mekan Ekleme: POST "/api/mekanlar". Mekan bilgileri girilmeli. Mekan Bilgileri: ad,adres, imkanlar, enlem, boylam, gunler1, acilis1, kapanis1, kapali1, gunler2, acilis2, kapanis2, kapali2.
- Konuma Göre Mekan Listeleme: GET "/api/mekanlar?enlem=37&boylam=35". Enlem ve boylam sorgu parametresi olarak verilmeli.
- Tüm Mekanları Listeleme: GET "/api/tummekanlar". Giriş yapılmalı.
- Mekan Getir: GET "/api/mekanlar/:mekanid".
- Mekan Güncelle: PUT "/api/mekanlar/:mekanid". Auth.Bearer Token Girilmeli. Mekan bilgileri girilmeli. Mekan Bilgileri: ad,adres, imkanlar, enlem, boylam, gunler1, acilis1, kapanis1, kapali1, gunler2, acilis2, kapanis2, kapali2.
- Mekan Sil: DELETE "/api/mekanlar/:mekanid". Auth.Bearer Token Girilmeli.
- Yorum Getir: GET "/api/mekanlar/:mekanid/yorumlar/:yorumid".
- Yorum Ekle: POST "/api/mekanlar/:mekanid/yorumlar". Auth.Bearer Token Girilmeli. Yorum bilgileri girilmeli. Yorum Bilgileri: yorumMetni, puan
- Yorum Güncelle: PUT "/api/mekanlar/mekanid/yorumlar/:yorumid". Auth.Bearer Token Girilmeli. Yorum bilgileri girilmeli. Yorum Bilgileri: yorumMetni, puan
- Yorum Sil: DELETE "/api/mekanlar/:mekanid/yorumlar/:yorumid". Auth.Bearer Token Girilmeli
- Giriş Yap: POST "/api/admin/girisyap". Auth.Bearer Token Girilmeli. Kullanıcı bilgileri girilmeli. Kullanıcı Bilgileri: eposta, sifre.
- Kayıt Ol: POST "/api/admin/kayitol". Auth.Bearer Token Girilmeli. Kullanıcı bilgileri girilmeli. Kullanıcı Bilgileri: adsoyad, eposta, sifre.

 ## Kütüphanelerin Yüklenmesi
- Çalıştırmadan önce gerekli kütüphanelerin yüklenmesi gerekir. Proje klasörü içindeyken terminalde aşağıdaki komutları kullanarak bu kütüphaneleri yükleyin.
```
npm install 
```
## Uygulamanın Çalıştırılması
- Aşağıdaki komut ile uygulamayı çalıştırabilirsiniz.
```
npm start
```
## REST API Testi
- Aşağıdaki komut ile API testini çalıştırabilirsiniz.
```
npm run test
```
- **npm run test** API testi ekran görüntüsü
![](/resimler/npmRunTest.PNG)
- **Thunder Client** API testi ekran görüntüsü
 ![](/resimler/zehraCakirMekanbulApiTesti.PNG) 
- Uygulama http://localhost:3000 adresinde çalışmaktadır. Anasayfaya erişmek için enlem ve boylam parametreleri verilmelidir.
 Örnek: http://localhost:3000?enlem=38&boylam=37
 
 - Mongo Cloud benzeri bir veritabanı kullanılacaksa "app_api/models/db.js" dosyasındaki dbURI değiştirilmelidir.
 - Uygulama localhost yerine domain altında çalışacaksa "app_server/controllers/mekanlar.js" dosyasındaki apiSecenekleri.sunucu parametresini değiştirilmelidir.
 
 ## Uygulamadan Örnek Sayfalar
 - Girilen enlem ve boylama göre çevredeki mekanların listelendiği sayfa :
 ![](/resimler/sonEnlemBoylamSayfasi.PNG)
 - Admin giriş sayfası üzerinden giriş yapabilir ya da kayıt olma sayfasına gidebiliriz : 
 ![](/resimler/sonAdminGirisYapSayfasi.PNG)
 - Kayıt ol sayfası :
 ![](/resimler/sonAdminKayitOlSayfasi.PNG)
 - Giriş yapıldıktan sonra karşımıza çıkan **admin** sayfası : 
 ![](/resimler/sonAdminSayfasi.PNG)
  Burada admin tüm mekanları listeleme, yeni bir mekan ekleme, mekan güncelleme ve mekan silme işlemlerini yapabilir.
  - Yeni bir mekan ekleme sayfası : 
  ![](/resimler/sonYeniMekanEklemeSayfasi.PNG)
  - Var olan bir mekanı güncelleme sayfası :
  ![](/resimler/sonMekanGuncellemeSayfasi.PNG)
  - Var olan bir mekanı silme sayfası : 
  ![](/resimler/sonMekanSilSayfasi.PNG)
  - Mekan Sayfası
  ![](/resimler/sonMekanSayfasi.PNG)
  - Yorum Ekle sayfası : 
  ![](/resimler/sonYorumEkleSayfasi.PNG)
   

#### NOT 
- Bu repository de bulunan proje hocamızın anlatımıyla ve benim araştırmalarım sonucu eklediğim kodlarla yapılmış halidir.
- Projenin tam hali için hocamızın github proje linki : [Asım Sinan Yüksel mekanbul-fullstack projesi](https://github.com/asimsinan/mekanbul-fullstack)
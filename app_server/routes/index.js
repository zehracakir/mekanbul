var express = require('express');
var router = express.Router();
var ctrlMekanlar=require('../controllers/mekanlar');
var ctrlDigerleri=require('../controllers/digerleri');
/* GET home page. */

router.get('/', ctrlMekanlar.anaSayfa);
router.get('/mekan/:mekanid', ctrlMekanlar.mekanBilgisi);
router.get('/mekan/:mekanid/yorum/yeni', ctrlMekanlar.yorumEkle);
router.post('/mekan/:mekanid/yorum/yeni', ctrlMekanlar.yorumumuEkle);
router.get('/hakkinda', ctrlDigerleri.hakkinda);

router.get('/admin',ctrlMekanlar.admin);
router.post('/admin',ctrlMekanlar.adminGirisiYap)
router.get('/admin/adminsayfa',ctrlMekanlar.adminSayfa);

router.get('/admin/mekan/yeni', ctrlMekanlar.mekanEkle);
router.post('/admin/mekan/yeni', ctrlMekanlar.mekanEkleSayfasiOlustur);

router.get('/admin/kayitol',ctrlMekanlar.kayitol);
router.post('/admin/kayitol',ctrlMekanlar.kayitolmaSayfasi);

router.get('/admin/mekan/:mekanid/guncelle', ctrlMekanlar.mekanGuncelle);
router.post('/admin/mekan/:mekanid/guncelle', ctrlMekanlar.mekanGuncellemeSayfasi);

router.get('/admin/mekan/:mekanid/sil',ctrlMekanlar.mekanSilSayfasi);
router.post('/admin/mekan/:mekanid/sil',ctrlMekanlar.mekanSil);


module.exports = router;

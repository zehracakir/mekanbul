const axios=require("axios");
var express = require('express');
var router = express.Router();
var apiSecenekleri={
    sunucu:"http://localhost:3000",
    //sunucu:"https://mekanbul.zehracakir.repl.co",
    apiYolu:"/api/mekanlar/",
    adminApiYolu:"/api/tummekanlar",
    adminGirisApiYolu:"/api/admin/girisyap",
    adminKayitApiYolu:"/api/admin/kayitol",
    mekanEkleApiYolu:"/api/mekanlar"
  //https://github.com/zehracakir  
}
var mesafeyiFormatla=function(mesafe){
    var yeniMesafe,birim;
    if(mesafe>1){
        yeniMesafe=parseFloat(mesafe).toFixed(1); //virgülden sonra 1 karakter getirmesini sağladık toFixed ile.
        birim=" km";
    }else{
        yeniMesafe=parseInt(mesafe*1000,10); //cevrim 10luk düzende olacak
        birim=" m";
    }
     return yeniMesafe+birim; // js de string+int i string olarak birleştirir
}
var adminSayfaOlustur = function(res,req,mekanListesi){
    var mesaj;
    var eposta;
    eposta=req.session.eposta;
    if(!(mekanListesi instanceof Array)){
        mesaj="API HATASI: Bir şeyler ters gitti.";
        mekanListesi=[];
    }else{
        if(!mekanListesi.length){
            mesaj="Civarda herhangi bir mekan yok."
        }
    }
      if(!eposta){
        res.redirect('/admin');
      }
      else{
        res.render("admin-sayfa",{
            "baslik":"Admin-Sayfa",
            "sayfaBaslik":{
                "siteAd":"Mekanbul",
                "slogan":"Mekanları Keşfet"
            },
            "mekanlar":mekanListesi,
            "mesaj":mesaj
        });
      }
        
      
    
}
   
var anaSayfaOlustur=function(res,mekanListesi){
    var mesaj;
    if(!(mekanListesi instanceof Array)){
        mesaj="API HATASI: Bir şeyler ters gitti.";
        mekanListesi=[];
    }else{
        if(!mekanListesi.length){
            mesaj="Civarda herhangi bir mekan yok."
        }
    }
    res.render("anasayfa",{
        "baslik":"Anasayfa",
        "sayfaBaslik":{
            "siteAd":"Mekanbul",
            "slogan":"Mekanları Keşfet"
        },
        "mekanlar":mekanListesi,
        "mesaj":mesaj
    });
}
const admin = function(req,res){
    req.session.eposta=null;
    res.render('admin',{"title":"Admin Page"})
}
const adminSayfa = function(req,res,next){
    axios.get(apiSecenekleri.sunucu+apiSecenekleri.adminApiYolu).then(function(response){
        var mekanlar;
        mekanlar=response.data; //mekanlara ulaşmamızı sağlar
        adminSayfaOlustur(res,req,mekanlar);
    }).catch(function(hata){
        adminSayfaOlustur(res,hata);
    });
}

const anaSayfa=function(req,res,next){
    axios.get(apiSecenekleri.sunucu+apiSecenekleri.apiYolu,{
        params:{
            enlem:req.query.enlem,
            boylam:req.query.boylam
        }
    }).then(function(response){ //tüm mekanları dolaştık
        var i,mekanlar;
        mekanlar=response.data; //mekanlara ulaşmamızı sağlar
        for(i=0;i<mekanlar.length;i++){
            mekanlar[i].mesafe=mesafeyiFormatla(mekanlar[i].mesafe);
        }
        anaSayfaOlustur(res,mekanlar);
    }).catch(function(hata){
        anaSayfaOlustur(res,hata);
    });
}
var mekanEkleSayfasiOlustur = function(req, res) {
      var eklenenMekanBilgileri;
            
      if (!req.body.mekanAdi || !req.body.mekanAdresi || !req.body.imkanlar || !req.body.enlem || 
        !req.body.boylam || !req.body.gunler1 || !req.body.acilis1 || !req.body.kapanis1 || 
        !req.body.gunler2 || !req.body.acilis2 || !req.body.kapanis2) {
        res.redirect("/admin/mekan/yeni"); 
      } else{
        eklenenMekanBilgileri={
            ad:req.body.mekanAdi,
            adres:req.body.mekanAdresi,
            imkanlar:req.body.imkanlar,
            enlem:req.body.enlem,
            boylam:req.body.boylam,
            gunler1:req.body.gunler1,
            acilis1:req.body.acilis1,
            kapanis1:req.body.kapanis1,
            gunler2:req.body.gunler2,
            acilis2:req.body.acilis2,
            kapanis2:req.body.kapanis2
      }
      axios.post(apiSecenekleri.sunucu+apiSecenekleri.mekanEkleApiYolu,eklenenMekanBilgileri).then(function(){
        res.redirect("/admin/adminsayfa")
    });
};
}
const mekanEkle = function (req, res){
    eposta=req.session.eposta;
    if(!eposta){
        res.redirect('/admin');
      }
   else{
    res.render('mekan-ekle',{"title":"Mekan Ekle"})
   }
    }

const mekanGuncelle = function (req, res) {
    eposta=req.session.eposta;
    if(!eposta){
        res.redirect('/admin');
      }
    else{
        axios
        .get(apiSecenekleri.sunucu + apiSecenekleri.apiYolu+req.params.mekanid)
        .then(function(response){
            res.render('mekan-guncelle', {
                "mekanAdi":response.data.ad ,
                "mekanAdresi":response.data.adres,
                "imkanlar":response.data.imkanlar,
                "enlem":response.data.koordinat[0],
                "boylam":response.data.koordinat[1],
                "gunler1":response.data.saatler[0].gunler,
                "acilis1":response.data.saatler[0].acilis,
                "kapanis1":response.data.saatler[0].kapanis,
                "gunler2":response.data.saatler[1].gunler,
                "acilis2":response.data.saatler[1].acilis,
                "kapanis2":response.data.saatler[1].kapanis
                })
        })
    }
    
}
    
    
   
    
const mekanGuncellemeSayfasi=function(req,res){
  var guncelBilgiler,mekanid;
  mekanid=req.params.mekanid;
  
  if (!req.body.mekanAdi || !req.body.mekanAdresi || !req.body.imkanlar|| !req.body.enlem|| 
    !req.body.boylam|| !req.body.gunler1|| !req.body.acilis1|| !req.body.kapanis1|| 
    !req.body.gunler2|| !req.body.acilis2|| !req.body.kapanis2) {
    res.redirect('/admin/mekan/'+mekanid+'/guncelle'); 
  } else{
    guncelBilgiler={
        ad:req.body.mekanAdi,
        adres:req.body.mekanAdresi,
        imkanlar:req.body.imkanlar,
        enlem:req.body.enlem,
        boylam:req.body.boylam,
        gunler1:req.body.gunler1,
        acilis1:req.body.acilis1,
        kapanis1:req.body.kapanis1,
        gunler2:req.body.gunler2,
        acilis2:req.body.acilis2,
        kapanis2:req.body.kapanis2
  }
  axios.put(apiSecenekleri.sunucu+apiSecenekleri.apiYolu+mekanid,guncelBilgiler).then(function(){
    res.redirect("/admin/adminsayfa")
});
  
  }

}

const mekanSilSayfasi=function(req,res){
    eposta=req.session.eposta;
    if(!eposta){
        res.redirect('/admin');
      }
      else{
        res.render('mekan-sil',{"title":"MekanSil"});
      }
   
}
const mekanSil = function (req, res) {
    axios.delete(apiSecenekleri.sunucu+apiSecenekleri.apiYolu+req.params.mekanid).then(function(){
        res.redirect("/admin/adminsayfa")
    });
}



// render metodunun ayrı bir metoda taşınması
var detaySayfasiOlustur=function(res,mekanDetaylari){
    mekanDetaylari.koordinat={
        "enlem":mekanDetaylari.koordinat[0],
        "boylam":mekanDetaylari.koordinat[1]
    }
    res.render('mekanbilgisi',
    {
        mekanBaslik:mekanDetaylari.ad,
        mekanDetay:mekanDetaylari
    });
}
// Hata kontrol metodunun oluşturulması    
var hataGoster = function(res,hata){
    var mesaj;
    if(hata.response.status==404){
        mesaj="404, Sayfa Bulunamadı";
    }else{
        mesaj=hata.response.status+" hatası";
    }
    res.status(hata.response.status);
    res.render('error',{
    "mesaj":mesaj
    });
};

const mekanBilgisi=function(req,res){
   axios
    .get(apiSecenekleri.sunucu+apiSecenekleri.apiYolu+req.params.mekanid)
    .then(function(response){
        req.session.mekanAdi=response.data.ad;
        detaySayfasiOlustur(res,response.data);
    })
    .catch(function(hata){
        hataGoster(res,hata);
    });
};

const yorumEkle=function(req,res,next){
    var mekanAdi=req.session.mekanAdi;
    var mekanid = req.params.mekanid;
    if(!mekanAdi){ //yönlendirme yapacağız
        res.redirect("mekanid/"+mekanid);
    }else
    res.render('yorumekle',{"baslik":mekanAdi+" mekanına yorum ekle",title: 'Yorum Ekle'});
};
const yorumumuEkle=function(req,res){
    var gonderilenYorum,mekanid;
    mekanid=req.params.mekanid;
    if(!req.body.adsoyad || !req.body.yorum){
        res.redirect("/mekan"+mekanid+"/yorum/yeni?hata=evet")
    }else{
        gonderilenYorum={
            yorumYapan:req.body.adsoyad, //sağ taraf pug dosyası sol taraf veritabanı
            puan:req.body.puan,
            yorumMetni:req.body.yorum
        }
        axios.post(apiSecenekleri.sunucu+apiSecenekleri.apiYolu+mekanid+"/yorumlar",gonderilenYorum).then(function(){
           res.redirect("/mekan/"+mekanid) 
        });
        
    }
};
const adminGirisiYap=function(req,res){
    var adminBilgileri;
    adminBilgileri = {
        eposta : req.body.eposta,
        sifre : req.body.sifre 
    }
    axios.post(apiSecenekleri.sunucu+apiSecenekleri.adminGirisApiYolu,adminBilgileri).then(function(){
        req.session.eposta=adminBilgileri.eposta;
        res.redirect("/admin/adminsayfa")
    });
}
const kayitolmaSayfasi=function(req,res){
    var kayitBilgileri;
    kayitBilgileri = {
        adsoyad:req.body.adsoyad,
        eposta : req.body.eposta,
        sifre : req.body.sifre 
    }
    axios.post(apiSecenekleri.sunucu+apiSecenekleri.adminKayitApiYolu,kayitBilgileri).then(function(){
        res.redirect("/admin")
    });
}

const kayitol= function(req,res){
    res.render('kayitol',{"title":"Admin Page"})
}
module.exports={
    anaSayfa,
    mekanBilgisi,
    yorumEkle,
    yorumumuEkle,
    admin,
    mekanEkle,
    adminSayfa,
    adminGirisiYap,
    kayitolmaSayfasi,
    kayitol,
    mekanGuncelle,
    mekanGuncellemeSayfasi,
    mekanSil,
    mekanSilSayfasi,
    mekanEkleSayfasiOlustur
}
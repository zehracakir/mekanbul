var mongoose = require("mongoose");
var Mekan = mongoose.model("mekan");
var Kullanici=mongoose.model("kullanici");
const cevapOlustur = function(res,status,content){
    res.status(status).json(content);
}
var sonPuanHesapla=function(gelenMekan){
    var i,yorumSayisi,ortalamaPuan,toplamPuan;
    if(gelenMekan.yorumlar && gelenMekan.yorumlar.length>0){
        yorumSayisi=gelenMekan.yorumlar.length;
        toplamPuan=0;
        for(i=0;i<yorumSayisi;i++){
            toplamPuan=toplamPuan+gelenMekan.yorumlar[i].puan;
        }
        ortalamaPuan=parseInt(toplamPuan/yorumSayisi,10); //10 luk tabanda ortalama puanı int olarak döndürür
        gelenMekan.puan=ortalamaPuan;
        gelenMekan.save(function(hata){ //veritabanına kayıt işlemi
            if(hata){
                console.log(hata);
            }
        });
    }
}

var ortalamaPuanGuncelle=function(mekanid){
    Mekan.findById(mekanid).select("puan yorumlar").exec(function(hata,mekan){
        if(!hata){
            sonPuanHesapla(mekan);
        }
    }); //Mekan.findById(mekanid). sorguyu hazırlar
}
var yorumOlustur=function(req,res,gelenMekan,kullaniciAdi){
    if(!gelenMekan){
        cevapOlustur(res,404,{"mesaj":"mekanid bulunamadı",});
    }
    else{
        gelenMekan.yorumlar.push({ //veritabanına pushlama
            yorumYapan:kullaniciAdi,
            puan:req.body.puan,
            yorumMetni:req.body.yorumMetni,
            tarih:Date.now()
        });
        gelenMekan.save(function(hata,mekan){
            var yorum;
            if(hata){
                cevapOlustur(res,404,hata);
            }else{
                ortalamaPuanGuncelle(mekan._id);
                yorum=mekan.yorumlar[mekan.yorumlar.length-1];
                cevapOlustur(res,201,yorum); //post put vs de 201 kodu kullanılıyor
            }
        });
    }
}
const kullaniciGetir =(req,res,callback)=>{
    if(req.auth && req.auth.eposta){
        Kullanici.findOne({eposta:req.auth.eposta}).exec((hata,kullanici)=>{
            if(!kullanici){
                return res.status(404).json({"hata":"Kullanıcı bulunamadı!"});
            }else if(hata){
                return res.status(404).json(hata);
            }
            callback(req,res,kullanici.adsoyad);
        });
    }else{
        return res.status(404).json({"hata":"Kullanıcı Bulunamadı!"})
    }
};

//push denemesi
const yorumEkle =(req,res) => {//request ve response alıyor
kullaniciGetir(req,res,(req,res,kullaniciAdi)=>{
         const mekanid=req.params.mekanid;
   if(mekanid){
    Mekan
        .findById(mekanid)
        .select("yorumlar")
        .exec((hata,mekan) => {
            if(hata){
                res.status(400).json(hata);
            }else{
                yorumOlustur(req,res,mekan,kullaniciAdi);
            }
        });
   }else{
    res.status(404).json({"hata": "Mekan bulunamadı."});
   }
});
};
const yorumSil = function(req,res){//request ve response alıyor
    if(!req.params.mekanid || !req.params.yorumid) {
        cevapOlustur(res,404,{"mesaj":"Bulunamadı mekanid ve yorumid gerekli"});
        return;
    }
    Mekan.findById(req.params.mekanid).select("yorumlar")
        .exec(function(hata,gelenMekan){
            if(!gelenMekan){
                cevapOlustur(res,404,{"mesaj":"mekanid bulunamadı"});
            return;    
            }else if(hata){
                cevapOlustur(res,400,hata);
                return;
            }
            if(gelenMekan.yorumlar && gelenMekan.yorumlar.length>0){
                if(!gelenMekan.yorumlar.id(req.params.yorumid)){
                    cevapOlustur(res,404,{"mesaj": "yorumid bulunamadı"});
                }else{
                    gelenMekan.yorumlar.id(req.params.yorumid).remove();
                    gelenMekan.save(function(hata,mekan){
                        if(hata){
                            cevapOlustur(res,404,hata);
                        }else{
                            ortalamaPuanGuncelle(mekan._id);
                            cevapOlustur(res,200,{"durum":"yorum silindi"});}});
                }}else {
                    cevapOlustur(res,404,{"mesaj":"Silinecek yorum bulunamadı",});
                }
})
}

const yorumGuncelle = function(req,res){//request ve response alıyor
   if(!req.params.mekanid || !req.params.yorumid){
    cevapOlustur(res,404,{"mesaj":"Bulunamdı. mekanid ve yorumid zorunlu."});
    return;
}
Mekan.findById(req.params.mekanid).select("yorumlar")
    .exec(function(hata,gelenMekan){
        var yorum;
        if(!gelenMekan){cevapOlustur(res,404,{"mesaj":"mekanid bulunamadı"});
        return;} else if(hata){cevapOlustur(res,400,hata);
        return;}
        if(gelenMekan.yorumlar && gelenMekan.yorumlar.length>0){
            yorum=gelenMekan.yorumlar.id(req.params.yorumid);
            if(!yorum) {cevapOlustur(res,404,{"mesaj":"yorumid bulunamadı."});
        }else{
            yorum.yorumYapan=req.body.yorumYapan;
            yorum.puan=req.body.puan;
            yorum.yorumMetni=req.body.yorumMetni;
            gelenMekan.save(function(hata,mekan){
                if(hata){
                    cevapOlustur(res,404,hata);}else{
                            ortalamaPuanGuncelle(mekan._id);
                            cevapOlustur(res,200,yorum);}});}
            }else{
                cevapOlustur(res,404,{"mesaj":"Güncellenecek yorum yok",
            });
            }
    });
};
const yorumGetir = function(req,res){//request ve response alıyor
   if(req.params && req.params.mekanid && req.params.yorumid) {
    Mekan.findById(req.params.mekanid)
    .select("ad yorumlar")
    .exec(function(hata,mekan){
        var cevap,yorum;
        if(!mekan){
            cevapOlustur(res,404,{
                "hata":"Böyle bir mesaj yok"
            });
            return;
        }else if (hata) {
            cevapOlustur(res,400,hata);
            return;
        }
        if(mekan.yorumlar && mekan.yorumlar.length > 0){
            yorum = mekan.yorumlar.id(req.params.yorumid);
            if(!yorum){
                cevapOlustur(res,404,{
                    "hata":"Böyle bir yorum yok!",
                });
            }
            else {
                cevap = {
                    mekan: {
                        ad:mekan.ad,
                        id:req.params.mekanid,
                    },
                    yorum: yorum,
                };
                cevapOlustur(res,200,cevap);
            }
        } else {
            cevapOlustur(res,404,{"hata":"Hiç yorum yok",
            });
        }
    });
   }else {
    cevapOlustur(res,404,{
        "hata":"Bulunamadı. mekanid ve yorumid mutlaka girilmeli",
    });
   }
}
module.exports={
    yorumEkle,
    yorumSil,
    yorumGuncelle,
    yorumGetir,
    kullaniciGetir
}
//test

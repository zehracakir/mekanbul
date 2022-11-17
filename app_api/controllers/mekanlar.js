var mongoose=require("mongoose");
var Mekan=mongoose.model("mekan"); //nesneleri büyük harfle yazarız->Mekan
const cevapOlustur=function(res,status,content){
    res.status(status).json(content);
}
const mekanlariListele=function(req,res){
    cevapOlustur(res,200,{"durum":"başarılı"});
}
const mekanEkle=function(req,res){
    cevapOlustur(res,200,{"durum":"başarılı"});
}
const mekanGetir=function(req,res){
   if(req.params && req.params.mekanid){
    Mekan.findById(req.params.mekanid).exec(function(hata,mekan){
        if(!mekan){
            cevapOlustur(res,404,{"hata":"Böyle bir mekan yok"});
        }else if(hata){
            cevapOlustur(res,404,{"hata":hata});
        }else{
            cevapOlustur(res,200,mekan);
        }
    });
   }else{
    cevapOlustur(res,404,{"hata":"İstekte mekanid yok"});
   }
}
const mekanGuncelle=function(req,res){
    cevapOlustur(res,200,{"durum":"başarılı"});
}
const mekanSil=function(req,res){
    cevapOlustur(res,200,{"durum":"başarılı"});
}

module.exports={
    mekanEkle,
    mekanGetir,
    mekanGuncelle,
    mekanlariListele,
    mekanSil
}
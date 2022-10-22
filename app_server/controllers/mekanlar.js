var express = require('express');
var router = express.Router();

const anaSayfa=function(req,res,next){
    res.render('anasayfa',
    {
    "baslik": 'Anasayfa',
    "sayfaBaslik":{
        "siteAd":"MekanBul",
        "slogan":"Civardaki Mekanları Keşfet!"
    },
    "mekanlar":[
        {
            "ad":"Starbucks",
            "puan":"3",
            "adres":"Centrum Garden AVM",
            "imkanlar":["Kahve","Çay","Kek"],
            "mesafe":"10km"
        },
        {
            "ad":"Barida Cafe",
            "puan":"4",
            "adres":"SDU Batı Kampüsü",
            "imkanlar":["Kahve","Çay","Kek"],
            "mesafe":"1km"
        }

    ]

});
}

const mekanBilgisi=function(req,res,next){
    res.render('mekanbilgisi',
    {"baslik": "Mekan Bilgisi",
    "mekanBaslik":"Starbucks",
    "mekanDetay":{
        "ad":"Starbucks",
        "puan":"4",
        "adres":"Centrum Garden AVM",
        "saatler":[
            {
                "gunler":"Pazartesi-Cuma",
                "acilis":"9:00",
                "kapanis":"23:00",
                "kapali":false
            },
            {
                "gunler":"Cumartesi-Pazar",
                "acilis":"10:00",
                "kapanis":"22:00",
                "kapali":false
            }

        ],
        "imkanlar":[
            "Kahve","Çay","Kek"

        ],
        "koordinatlar":{
            "enlem":"37.7",
            "boylam":"30.5"
        },
        "yorumlar":[
            {
                "yorumYapan":"Zehra Çakır",
                "yorumMetni":"Berbaaaat",
                "tarih":"20 Ekim 2022",
                "puan":"3"
            },
            {
                "yorumYapan":"Yusuf Dağdeviren",
                "yorumMetni":"Süper",
                "tarih":"20 Ekim 2022",
                "puan":"5"
            }
        ]
    }

});
}

const yorumEkle=function(req,res,next){
    res.render('yorumekle',{title: 'Yorum Ekle'});
}

module.exports={
    anaSayfa,
    mekanBilgisi,
    yorumEkle
}
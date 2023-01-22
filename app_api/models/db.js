var mongoose=require("mongoose");
require("./mekansema");
require("./kullanicilar");
var dbURI="mongodb://localhost/mekanbul";

function kapat(msg,callback){
    mongoose.connection.close(function(){
        console.log(msg);
        callback(); 
    });
}
process.on("SIGINT",function(){
    kapat("Uygulama kapatıldı!",function(){
        process.exit(0);
    })
})
mongoose.connection.on("connected",function(){
    console.log(dbURI+" adresindeki veritabanına bağlandı");
}
);
mongoose.connection.on("disconnected",function(){
    console.log(dbURI+" adresindeki veritabanı bağlantısı koptu");
}
);
mongoose.connection.on("error",function(){
    console.log("Bağlantı hatası");
}
);

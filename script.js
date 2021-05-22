var praveZraneJidlo = "";
var jizSezranaJidla = [];

var hrac1Zvire = "";
var hrac2Zvire = "";

function zkontrolujHeslo() {
    var heslo = document.getElementById("heslo").value;
    if(heslo == "cert"){
        document.getElementById("prihlasovani").style.display = "none";
        document.getElementById("zabezpeceno").style.display = "block";
    }
}    

function zmenPozadi() {
    var pozadi = document.getElementById("pozadi").value;
    document.body.style.backgroundColor = pozadi;
}

function nastavJidlo() {
    if(document.getElementById("jidlo").value != "") {
        switch(document.getElementById("jidlo").value.toLowerCase()){
            case "medříka":
                alert("Čertovi nechutná Medřík!");
                break;
            case "med":
                alert("Čertovi nechutná med ten je pro medvědy a medvěd pro Čerta!");
                break;
            case "učitele":
                alert("ty zrovna nemusí!");
                break;
            default:
                if(praveZraneJidlo != "") {
                    jizSezranaJidla.push(praveZraneJidlo);
                    document.getElementById("historie").innerHTML = "Už sežral " + jizSezranaJidla.join(", ") + ". ";
                
                    if(jizSezranaJidla.length == 3){
                        document.getElementById("varovani").innerHTML = "Asi bude zvracet. ";
                    } else if(jizSezranaJidla.length > 3){
                        certeZvracej(5000);
                    }
                }

                praveZraneJidlo = document.getElementById("jidlo").value;
                document.getElementById("informace").innerHTML = "Čert žere " + praveZraneJidlo + ". ";

                switch(praveZraneJidlo.toLowerCase()){
                    case "asistentku":
                        certeZvracej(10000);
                        break;
                    case "halinu":
                        certeZvracej(15000);
                        break;
                    case "alici":
                        certeZvracej(20000);
                        break;
                        case "olinu":
                        certeZvracej(13000);
                        break;
                        case "párky":
                        certeZvracej(50000);
                        break;
                }
        }

    }
}

function certeZvracej(pocetMilisekund) {
    document.getElementById("varovani").innerHTML = "Pozvracel se. ";
    document.getElementById("tlacitkoZer").disabled = true;
    setTimeout(vyprazdniCerta, pocetMilisekund);
}

function vyprazdniCerta() {
    praveZraneJidlo = "";
    jizSezranaJidla = [];
    document.getElementById("informace").innerHTML = "Čert už má zase hlad. <br><img src='certhlad.jpg' width='240'>";
    document.getElementById("historie").innerHTML = "";
    document.getElementById("varovani").innerHTML = "";
    document.getElementById("tlacitkoZer").disabled = false;
}

function zkontrolujTeplotu() {
    fetch('https://api.openweathermap.org/data/2.5/weather?units=metric&lat=49.7444444&lon=16.6238889&appid=e31d3441d060f09297aada23cb4dbd8d')
    .then(response => response.json())
    .then(json => {
    var teplotaVBorsove = json.main.temp;
    var certuvPocit = "akorát";
    if(teplotaVBorsove<12){
        certuvPocit = "zima";
    } else if (teplotaVBorsove>18){
        certuvPocit = "teplo";
    }
    document.getElementById("teplota").innerHTML = "V Boršově je " + parseInt(teplotaVBorsove) + " stupňů, takže je Čertovi " + certuvPocit + ". ";
    })
}

function hraj(hrac, zvire){
    switch(hrac){
        case 1:
            hrac1Zvire = zvire;
            break;
        case 2:
            hrac2Zvire = zvire;
            break;
    }

    zablokujTlacitka(hrac);
    
    if (hrac1Zvire != "" && hrac2Zvire != ""){
        var vysledek = zjistiVysledek();
        var text = "";
        text += "Hráč 1 vybral " + zjistiDruhyPad(hrac1Zvire) + " a Hráč 2 vybral " + zjistiDruhyPad(hrac2Zvire) + ". ";
        switch(vysledek){
            case 0:
                text += "Nikdo nikoho nesežral, takže ";
                text += "je to remíza. ";
                break;
            case 1:
                text += hrac1Zvire + " sežral " + zjistiDruhyPad(hrac2Zvire) + ", takže ";
                text += "vyhrál Hráč 1. ";
                break;
            case 2:
                text += hrac2Zvire + " sežral " + zjistiDruhyPad(hrac1Zvire) + ", takže ";
                text += "vyhrál Hráč 2. ";
                break;
        }

        document.getElementById("vysledek").innerHTML = text;
        odblokujTlacitka();
        hrac1Zvire = "";
        hrac2Zvire = "";
    }
}

function zjistiDruhyPad(zvire){
    switch(zvire){
        case "Čert":
            return "Čerta";
        case "Medvěd":
            return "Medvěda";
        case "Had":
            return "Hada";
    }
}

function zablokujTlacitka(hrac){
    switch(hrac){
        case 1:
            document.getElementById("1a").disabled = true;
            document.getElementById("1b").disabled = true;
            document.getElementById("1c").disabled = true;
            break;
        case 2:
            document.getElementById("2a").disabled = true;
            document.getElementById("2b").disabled = true;
            document.getElementById("2c").disabled = true;
            break;
        
    }
}

function odblokujTlacitka(){
    document.getElementById("1a").disabled = false;
    document.getElementById("1b").disabled = false;
    document.getElementById("1c").disabled = false;
    document.getElementById("2a").disabled = false;
    document.getElementById("2b").disabled = false;
    document.getElementById("2c").disabled = false;
}

function zjistiVysledek(){
    switch(hrac1Zvire){
        case "Čert":
            switch(hrac2Zvire){
                case "Čert":
                    return 0;
                case "Medvěd":
                    return 1;
                case "Had":
                    return 2;
            }
        case "Medvěd":
            switch(hrac2Zvire){
                case "Čert":
                    return 2;
                case "Medvěd":
                    return 0;
                case "Had":
                    return 1;
            }
        case "Had":
            switch(hrac2Zvire){
                case "Čert":
                    return 1;
                case "Medvěd":
                    return 2;
                case "Had":
                    return 0;
            }
    }
}
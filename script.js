var praveZraneJidlo = "";
var jizSezranaJidla = [];

function zkontrolujHeslo() {
    var heslo = document.getElementById("heslo").value;
    if(heslo == "certjezrout"){
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
var praveZraneJidlo = "";
var jizSezranaJidla = [];

function nastavJidlo() {
    if(document.getElementById("jidlo").value != "") {
        if(praveZraneJidlo != "") {
            jizSezranaJidla.push(praveZraneJidlo);
            document.getElementById("historie").innerHTML = "Už sežral " + jizSezranaJidla.join(", ") + ". ";
        
            if(jizSezranaJidla.length == 3){
                document.getElementById("varovani").innerHTML = "Asi bude zvracet. ";
            } else if(jizSezranaJidla.length > 3){
                document.getElementById("varovani").innerHTML = "Pozvracel se. ";
                document.getElementById("tlacitkoZer").disabled = true;
                setTimeout(vyprazdniCerta, 5000);
            }
        }

        praveZraneJidlo = document.getElementById("jidlo").value;
        document.getElementById("informace").innerHTML = "Čert žere " + praveZraneJidlo + ". ";
    }
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
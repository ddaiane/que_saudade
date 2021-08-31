let isPT = true;
let nome;
let latitude;
let longitude;
const latitudeOrigem = -30.032246;
const longitudeOrigem = -51.224916;

//eventListeners
document.getElementById("chooseEN").addEventListener('click', langEN);
document.getElementById("enviaNome").addEventListener('click', resultado);


function langEN() {
    isPT = false;
    let div = document.getElementById("entraNome");
    div.querySelector("h2").innerHTML = "oooh, right! u prefer english. <br> so... who is there?";
    div.querySelector("textarea").setAttribute("placeholder", "be polite! tell your name!!");
    div.querySelector("button").innerText = "reply";
    document.getElementById("chooseEN").remove();
}


let divSaudade = document.getElementById("saudade");

function resultado() {
isPT ? document.getElementById("chooseEN").remove() : null;
    nome = document.getElementById("nome").value;
    document.getElementById("entraNome").style.display = "none";
    latitude = geoplugin_latitude();
    longitude = geoplugin_longitude();
    let distancia = distanceInKmBetweenEarthCoordinates(latitudeOrigem, longitudeOrigem, latitude, longitude).toFixed(0);
    let string = "aaaaah " + nome + "! bem que eu percebi que era alguém conhecido! que saudade! <br> essa pandemia deixou a gente tao distante, né? ";
    if (distancia < 50) { string += "mas a gente tá tão pertinho que é só pegar um onibus pra gente se ver! quem sabe até um uber!";}

    divSaudade.querySelector("p").innerHTML = string;
}



// se não encontrar ou não tiver certa a localização, pede pro usuario
function solicitaLocaliz(){
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(sucessolocaliz, errolocaliz);
} else {
    divSaudade.querySelector("p").innerText = "ah, droga, não consegui descobrir sua localização automaticamente";
 }}

function sucessolocaliz(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
   
}

function errolocaliz() {
    if (isPT) {
        divSaudade.querySelector("p").innerHTML = "ah, droga, não deu pra descobrir sua localização automaticamente pq vc não me deu autorização (affff!!!!), cê ta de sacanagem, irmaozinho";
    } else {
        divSaudade.querySelector("p").innerHTML = "oohhh noooo, u didnt let me get your location :("
    }

}



//calcular distancia entre as coordenadas

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

function distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
}
var paraula = "a";
var lletra = "";
var paraulaJugant = "";
var fallos = 0;
var caracters = "abcdefghijklmnñopqrstuvwxyz";
var sortida = "";
var lletresUtilitzades = "";
var menu = 0;
var partidesJugades = 0;
var victorieString = window.localStorage.getItem("Partides guanyades");
var derroteString = window.localStorage.getItem("Partides perdudes");

//a dalt declarem les variables globals a utilitzar
//a baix mirem si hi ha estadístiques, si no hi ha les igualem a zero i si n'hi ha les parsejem a integer

if (victories == null) {
    var victories = 0;
} else {
    var victories = parseInt(victorieString);
}
if (derrotes == null) {
    var derrotes = 0;
} else {
    var derrotes = parseInt(derroteString);
}


//amb aquest for creem el teclat que sortirà per pantalla
for(let i=0;i<caracters.length;i++){
    sortida+=`<button type='button' class='btn btn-info' onclick='clickLletra("${caracters.charAt(i)}")'> ${caracters.charAt(i)}</button>`;
}

//aquesta funció arrenca el joc, la truquem quan encertem la paraula o quan acaben els intents
function novaPartida(){
    menu = prompt("1. Iniciar un joc \n2. Estadístiques \n3. Sortir")
    while (menu != 1 && menu != 2 && menu != 3){
        menu = prompt("1. Iniciar un joc \n2. Estadístiques \n3. Sortir")
    }
    paraulaJugant = "";
    lletresUtilitzades = "";
    lletra = "";
    fallos = 0;
    if (menu == 1) {
        paraula = prompt("Escriu una paraula");
        paraulaJugant = guions(paraula, paraulaJugant);
        document.getElementById("abecedari").innerHTML = sortida;
        document.getElementById("imatgePenjat").innerHTML=`<img src="./fotospenjat/penjat_${fallos}.png" id="imatgePenjat"/>`;
        document.getElementById("paraulaActual").innerHTML=`<h1>${paraulaJugant}</h1>`;
        document.getElementById("lletresUtilitzades").innerHTML=`<h1>Lletres fallades ${fallos}/6: ${lletresUtilitzades}</h1>`;
    }
    if (menu == 2) {
        estadistiques();
    }
    if (menu == 3) {
        var res = prompt("Segur/a que vols sortir? (Y/N)");
        res = res.toUpperCase();
        while (res != "Y" || res != "N") {
            res = prompt("Escriu Y o N!");
            res = res.toUpperCase();
        }
        if (res == "Y"){
            close();
        } else {
            novaPartida();
        }
    }
}

//aquesta funció obre una finestra amb les estadístiques de la partida actual
function estadistiques(){
    var window = open("","Estadístiques","scrollbars=yes,resizable=yes,width=780,height=200,");
    window.document.body.innerHTML = `<h1>Total de partides: ${partidesJugades} <br>Partides guanyades (${(victories/partidesJugades*100)}%): ${victories} <br>Partides perdudes (${(derrotes/partidesJugades*100)}%): ${derrotes} </h1>`;
}

//aquesta funció reinicia les estadístiques
function resetStats(){
    victories = 0;
    derrotes = 0;
    window.localStorage.setItem("Partides perdudes", "0");
    window.localStorage.setItem("Partides guanyades", "0");
}

//a aquesta funció se li truca cada cop que premem una lletra, a la seva vegada crida a la funcio 
//lletraProvada() per saber si s'ha encertat la lletra o no
function clickLletra(letra){
    lletra = letra;
    if (paraula.includes(lletra)){
        paraulaJugant.replace(/\s/g, '');
        paraulaJugant = lletraProvada(paraulaJugant, paraula, lletra);
        paraulaJugant = guions(paraula, paraulaJugant);
        document.getElementById("paraulaActual").innerHTML=`<h1>${paraulaJugant}</h1>`;
        document.getElementById("lletresUtilitzades").innerHTML=`<h1>Lletres fallades ${fallos}/6: ${lletresUtilitzades}</h1>`;
        document.getElementById("imatgePenjat").innerHTML=`<img src="./fotospenjat/penjat_${fallos}.png" id="imatgePenjat"/>`;
    } else {
        paraulaJugant.replace(/\s/g, '');
        paraulaJugant = guions(paraula, paraulaJugant);
        if (!(lletresUtilitzades.includes(lletra))) {
            fallos++;
            lletresUtilitzades += lletra + " ";
            document.getElementById("paraulaActual").innerHTML=`<h1>${paraulaJugant}</h1>`;
            document.getElementById("lletresUtilitzades").innerHTML=`<h1>Lletres fallades ${fallos}/6: ${lletresUtilitzades}</h1>`;
            document.getElementById("imatgePenjat").innerHTML=`<img src="./fotospenjat/penjat_${fallos}.png" id="imatgePenjat"/>`;   
        }
    }
    comprobaFinal();
}

//aquesta funció comproba si s'ha encertat ja la paraula o s'ha arribat a les 6 errades
function comprobaFinal(){
    var paraulaCompare = paraulaJugant.replace(/\s/g, '');
    if (paraulaCompare == paraula){
        alert("Has encertat! La paraula era " + paraula + ".");
        partidesJugades++;
        victories = parseInt(victories);
        victories++;
        window.localStorage.setItem("Partides guanyades", victories.toString());
        novaPartida();
    }
    if (fallos == 6){
        alert("Has mort! La paraula era " + paraula + ".");
        partidesJugades++;
        derrotes = parseInt(derrotes);
        derrotes++;
        window.localStorage.setItem("Partides perdudes", derrotes.toString());
        novaPartida();
    }
}

//aquesta funció transforma la paraula actual en guions a les lletres 
//encara no encertades i els separa per mostrar-la bé per pantalla
function guions(paraula, paraulaJugar) {
    paraulaRetorn = "";
    paraulaJugar = paraulaJugar.replace(/\s/g, '');
    for (let i = 0; i < paraula.length; i++) {
        if (paraulaJugar.charAt(i) != paraula.charAt(i)) {
            paraulaRetorn += "_ ";
        } else {
            paraulaRetorn += paraulaJugar.charAt(i) + " ";
        }
    }
    return paraulaRetorn;
}

//aquesta funció rep la paraula correcta, l'actual i una lletra, susbtitueix la lletra encertada
//a les posicions necessàries i retorna la paraula a mostrar
function lletraProvada(paraula, paraulaCorrecta, letra) {
    paraula = paraula.replace(/\s/g, '');
    paraulaJugant = "";
    arrayEncerts = [];
    if (paraulaCorrecta.includes(letra)){
        for (let i = 0; i < paraulaCorrecta.length; i++) {
            if (paraulaCorrecta.charAt(i)===letra) {
                arrayEncerts.push(i);
            } else {
                arrayEncerts.push(-1);
            }
        }
    }
    for (let j = 0; j < paraula.length; j++) {
        if (j === arrayEncerts[j]) {
            paraulaJugant += letra;
        } else {
            paraulaJugant += paraula.charAt(j);
        }
    }
    return paraulaJugant;
}

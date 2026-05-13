// webkomponens -- komponens alapú webprogramozás (továbbfejlesztés mindenhol... react pl!)

/**
 * létrehozza a mezőt mint div-et
 * @param {int} i 
 * @param {int} j
 * @return {HTMLElement} div 
 */
function aknamezo_div(i, j) {
    let div = document.createElement("div");
    div.classList.add("aknadiv");
    // div.id = `${i}_${j}`;
    div.id = i+"_"+j;
    div.addEventListener("click", akna_balkatt);
    div.addEventListener("contextmenu", akna_jobbkatt);
    return div;
}

/**
 * létrehozza a mezőket mint diveket
 * @param {HTMLElement} div_aknamezo
 * @param {int} sor 
 * @param {int} oszlop 
 */
function aknadivek_letrehozasa(div_aknamezo, sor, oszlop) {
    for (let i = 0; i < oszlop; i++) {
        for (let j = 0; j < sor; j++) {
            div_aknamezo.appendChild(aknamezo_div(i, j));
        }
    }
}

/**
 * @param {Array[Array[int]]} akna_map aknatérkép
 * @param {int} j oszlop
 * @param {int} i sor
 * @returns {int} a szomszédos aknák száma
 */
function hanySzomszedosAknaVanItt(akna_map, j, i) {
    let db = 0;

    for (let f = -1; f <= 1; f++) {
        for (let v = -1; v <= 1; v++) {
            if (0 <= j+f && j+f < N && 0 <= i+v && i+v < M && akna_map[j+f][i+v] === 1) {
                    db++;
            }
        }
    }

    return db;
}

/**
 * 
 * @param {Array[Array[int]]} akna_map aknatérkép
 * @returns {void} felfedi az összes aknát a mezőn
 */
function osszes_akna_felfedese(akna_map){
    for (let j = 0; j < M; j++) {
        for (let i = 0; i < N; i++) {
            if (akna_map[i][j] === 1) {
                let akna_div = document.getElementById(j + "_" + i);
                akna_div.innerHTML = "&#128163;"; // akna emoji
                akna_div.classList.add("kattintott");
            }
        }
    }
}


function akna_by_id(j, i) {
    return document.getElementById(j + "_" + i);
}


/**
 * 
 * @param {int} j oszlop
 * @param {int} i sor
 * @return {void} felfed
 */
function felfed(akna_map, j, i) {
    console.log("felfed: " + j + "_" + i);
    let szam = hanySzomszedosAknaVanItt(akna_map, j, i);
    let aknadiv = akna_by_id(i, j);
    aknadiv.classList.add("kattintott");
    if (szam != 0) {
        aknadiv.innerHTML = szam;
    } else {
        for (let f = -1; f <= 1; f++) {
            for (let v = -1; v <= 1; v++) {
                if (0 <= j+f && j+f < N && 0 <= i+v && i+v < M && !akna_by_id(j+f, i+v).classList.contains("kattintott")) {
                    felfed(akna_map, j+f, i+v);
                }
            }
        }
    }
}

function akna_balkatt(e) {
    // alert("katt: " + e.target.id);
    let kattintott_akna = e.target;
    // kattintott_akna.classList.add("kattintott");
    // aknára nyomtunk-e?
    
    let idkod = kattintott_akna.id; // "3_12"
    let par = idkod.split("_"); // ["3", "12"]
    let i = parseInt(par[0]);   // 3
    let j = parseInt(par[1]);   // 12

    if(akna_map[j][i] === 1) {
        osszes_akna_felfedese(akna_map);    
    } else {
        felfed(akna_map, j, i);
    }

}

function akna_jobbkatt(e) {
    e.preventDefault(); // ne jelenjen meg a böngésző menü
    let kattintott_akna = e.target;
    if (kattintott_akna.innerHTML === "") { // ha már zászló van rajta, akkor eltávolítjuk
        kattintott_akna.innerHTML = "&#128681;";
    } else {
        kattintott_akna.innerHTML = ""; // zászló emoji
    }
}

/**
 * Létrehoz egy NxM-es méretű mátrixot, amelyben véletlenszerűen van elszórva aknak_szama db 1-es (akna) és 0 (üres hely). 
 * @param {number} aknak_szama - az aknák száma
 * @param {number} N - a mátrix sorainak száma
 * @param {number} M - a mátrix oszlopainak száma
 * @returns {Array<Array<number>>} a NxM-es 0-1-mátrix
 */
function random_map_generalasa(aknak_szama, N, M){
    let lista = csupanullalista(N, M);
    lista_feltoltese_aknakkal(aknak_szama, lista);
    keveres(lista);
    return hajtogatas(lista, N, M);
}

/**
 * 
 * @param {number} N sorok száma
 * @param {number} M oszlopok száma
 * @returns {Array<number>} lista NxM db 0-val feltöltve
 */
function csupanullalista(N, M) {
    let lista = [];
    for (let i = 0; i < N*M; i++) {
        lista.push(0);
    }
    return lista;
}

/**
 * feltölti a listát aknak_szama db 1-essel
 * @param {number} aknak_szama 
 * @param {Array<number>} lista 
 */
function lista_feltoltese_aknakkal(aknak_szama, lista) {
    for (let i = 0; i < aknak_szama; i++) {
        lista[i] = 1;
    }  
}

/**
 * Fisher-Yates-Knuth keverés, hogy bármely akna egyenlő valószínűséggel fordulhasson elő bárhol.
 * @param {Array} l - a lista, amit megkever
 */
function keveres(l){
    let i = l.length;
    while(i!=0){
        let j = veletlen_szam(0, i-1);
        i--;
        [l[i], l[j]] = [l[j], l[i]];
    }
}

function veletlen_szam(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function hajtogatas(lista,N,M) {
    let index = 0;
    const matrix = [];
    for (let i = 0; i < N; i++) {
        let sor = [];
        for (let j = 0; j < M; j++) {
            sor.push(lista[index]);
            index++;
        }
        matrix.push(sor);
    }            
    return matrix;
}

function hajtogatas2(lista,N,M) {
    const matrix = [];
    for (let i = 0; i < N; i++) {
        let sor = [];
        for (let j = 0; j < M; j++) {
            sor.push(lista[i*M+j]);
        }
        matrix.push(sor);
    }            
    return matrix;
}



let div_aknamezo = document.getElementById("aknamezo");
console.log(div_aknamezo);
const aknak_szama = 100;
const N = 30;
const M = 16;
aknadivek_letrehozasa(div_aknamezo, N, M);
let akna_map = random_map_generalasa(aknak_szama, N, M);
console.log(akna_map);

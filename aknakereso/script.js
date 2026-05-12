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

function akna_balkatt(e) {
    // alert("katt: " + e.target.id);
    let kattintott_akna = e.target;
    kattintott_akna.classList.add("kattintott");
        // kattintott_akna.innerHTML = "&#128163;"; // akna emoji
    // aknára nyomtunk-e?
    // akna_map

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

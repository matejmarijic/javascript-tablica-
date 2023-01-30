// spremamo vrijednosti iz polja db u memoriju browsera
window.addEventListener('beforeunload',perzistiraj);


let tijeloTablice=document.querySelector("#table-body");

function popuniTablicu(){
    let tekstTijelaTablice='';
    for(let brojac = 0 ; brojac< db.length; brojac++){
        const redak=db[brojac];
        tekstTijelaTablice = tekstTijelaTablice + `<tr>
            <td>${redak.id}</td> 
            <td>${redak.naziv}</td> 
            <td>${redak.email}</td> 
            <td>${redak.zanimanje}</td> 
            <td>${redak.drzava}</td> 
            <td>${redak.datum}</td> 
            <td><button data-id="${ redak.id }" class="edit-btn btn btn-sm btn-warning form-control"> Izmjeni </button></td>
            <td><button data-id2="${ redak.id }" class="delete-btn btn btn-sm btn-danger form-control"> Obriši </button></td>
            </tr> `; 
    }
    tijeloTablice.innerHTML=tekstTijelaTablice;
    
    let gumbiZaIzmjenu= document.querySelectorAll(".edit-btn");
    console.log('broj gumba za izmjenu:'+ gumbiZaIzmjenu.length);
    for(let x=0; x < gumbiZaIzmjenu.length; x++){
        const g=gumbiZaIzmjenu[x];    
        g.addEventListener('click', dohvatiPodatak);
    }

    let gumbiZaBrisnje= document.querySelectorAll(".delete-btn");
    console.log('broj gumba za brisanje:'+ gumbiZaBrisnje.length);
    for(let x=0; x < gumbiZaBrisnje.length; x++){
        const g=gumbiZaBrisnje[x];    
        // g.addEventListener('click', ukloniPodatak);
        g.addEventListener('click', ukloniPodatakSaNovomPotvrdom);
    }
}

popuniTablicu();

let idN ;
let odabraniSlog;
let vrstaAkcije;

// dohvaćamo objekt za ciljani ID
function dohvatiElementPremaIdu( paramID){
    const x = db.filter( el => el.id==paramID);
    return x[0];
}
// dohvaćamo index elemnta iz baze za ciljani ID retka
function dohvatiIndexUbazi( paramID){    
    for(let x=0; x<=db.length; x++){
        if(db[x].id == paramID){
            return x;
        }
    }
}

// uklanjanje objekta iz polja kao baze  - 'stari' koji koristi ugrađeni potvrdni alert
function ukloniPodatak(){   
    idN = this.getAttribute('data-id2');
    // let odabraniSlog=db[idN];
    let odabraniSlog=dohvatiElementPremaIdu(idN);
    let upitZaPotvrdu=`Želite li ukloniti korisnika: ${odabraniSlog.naziv} ?`;
   
    if(mojaPotvrdaNamjere(upitZaPotvrdu)){ 
        idN = dohvatiIndexUbazi (odabraniSlog.id);
        db.splice(idN,1);
        popuniTablicu();
    }
}
function izvrsiAkciju(){
    if(vrstaAkcije=='Izmjeni'){
        spremiIzmjenu();
        vrstaAkcije='';
    }
    if(vrstaAkcije=='Briši'){        
        idN = dohvatiIndexUbazi (idN);
        db.splice(idN,1);
        vrstaAkcije='';
    }     
    pretrazi(); 

    let viewModalnogDialoga=document.querySelector(".modal");
    viewModalnogDialoga.style.display='none';
}

/* funkcija za fency modalni prozor */
function ukloniPodatakSaNovomPotvrdom(){
    vrstaAkcije="Briši" ;
    idN = this.getAttribute('data-id2');
    // let odabraniSlog=db[idN];
    let odabraniSlog=dohvatiElementPremaIdu(idN);
    let upitZaPotvrdu=`Želite li ukloniti korisnika: ${odabraniSlog.naziv} ?`;
  
    let naslovDialoga=document.querySelector(".modal-title");
    naslovDialoga.innerHTML= "Brisanje Korisnika !";
    let porukaDialoga=document.querySelector("#tekstZaModalniProzor");    
    porukaDialoga.innerHTML = upitZaPotvrdu;

    let spremiModalnogDialoga=document.querySelector("#modalSpremiButton");
    let brisiModalnogDialoga=document.querySelector("#modalUkloniButton");
    spremiModalnogDialoga.style.display='none';
    brisiModalnogDialoga.style.display='block';

    let viewModalnogDialoga=document.querySelector(".modal");
    viewModalnogDialoga.style.display='block';
}
/* funkcija za fency modalni prozor */
function izmjeniPodatakSaNovomPotvrdom(){
    vrstaAkcije="Izmjeni" ;
   let upitZaPotvrdu=`Želite li Izmjeni podatke za korisnika: ${odabraniSlog.naziv} ?`;

    let naslovDialoga=document.querySelector(".modal-title");
    naslovDialoga.innerHTML= "Izmjena postojećeg Korisnika !";
    let porukaDialoga=document.querySelector("#tekstZaModalniProzor");    
    porukaDialoga.innerHTML = upitZaPotvrdu;

    let spremiModalnogDialoga=document.querySelector("#modalSpremiButton");
    let brisiModalnogDialoga=document.querySelector("#modalUkloniButton");
    spremiModalnogDialoga.style.display='block';
    brisiModalnogDialoga.style.display='none';

    let viewModalnogDialoga=document.querySelector(".modal");
    viewModalnogDialoga.style.display='block';
}

/* funkcija za modalni prozor */
function sakrijModalniDialog(){
    let potvrdivPotvrda=document.querySelector(".modal");
    potvrdivPotvrda.style.display='none';
    vrstaAkcije='';
}


let spremiIzmjenuBtn = document.querySelector('#edit');
let eidI = document.querySelector('.eid');
let enazivI  =document.querySelector('.eNaziv');
let emailI   =document.querySelector('.eMail');
let edrzavaI =document.querySelector('.eDrzava');
let ezanimanjeI  =document.querySelector('.eZanimanje');
let edatumI  =document.querySelector('.eDatum');

function dohvatiPodatak(){            
        idN = this.getAttribute('data-id');
        odabraniSlog=dohvatiElementPremaIdu(idN);
        eidI.value=     odabraniSlog.id;
        enazivI.value=  odabraniSlog.naziv;
        emailI.value=   odabraniSlog.email;
        // edrzavaI.value= odabraniSlog.drzava;

        // punjenje select liste uz postavljanje ranije odabranog elementa
        let temp='';
        zemlje.forEach( d =>{
            if(d == odabraniSlog.drzava){
                temp = temp + `<option value="${d}" selected>${d}</option>`;
            }else{
                temp = temp + `<option value="${d}">${d}</option>`;
            }         
        });    
        document.querySelector("#eDrzava").innerHTML=temp;


        ezanimanjeI.value=odabraniSlog.zanimanje;
        edatumI.value=odabraniSlog.datum;

        // skrivanje ili prikazivanje komponenti na fronti (sučelju stranice)
        editKorisniciView.style.display= "block";
        addKorisniciView.style.display= "none";
        korisniciView.style.display= "none";
        
        // let edatumI  =document.querySelector('.eDatum');

        flatpickr(edatumI, parametriZaOblikDatuma);
}

let editKorisniciView = document.querySelector("#edit-korisnik-view");

function mojaPotvrdaNamjere(upitnik){
    return confirm(upitnik, 'Želim', 'Odustani');
}

spremiIzmjenuBtn.addEventListener('click',izmjeniPodatakSaNovomPotvrdom );

function spremiIzmjenu(){
  
    const novi={
        id: eidI.value,
        naziv:  enazivI.value,
        email:   emailI.value,
        drzava: edrzavaI.value,
        zanimanje:  ezanimanjeI.value,
        datum:  edatumI.value
    }
    idN=dohvatiIndexUbazi(odabraniSlog.id);
    db[idN]=novi;  
    eidI.value='';
    enazivI.value='';
    emailI.value='';
    edrzavaI.value='';
    ezanimanjeI.value='';
    edatumI.value='';

    editKorisniciView.style.display= "none";
    addKorisniciView.style.display= "none";
    korisniciView.style.display= "block";
    pretrazi(); //jer iz pretraži , također pozivamo popuniTablicu
    
}

let addKorisniciView = document.querySelector("#add-korisnik-view");
let korisniciView = document.querySelector("#korisnici-view");

let addKorisniciViewGumb= document.querySelector('[href="add-korisnik-view"]');
let korisniciViewGumb= document.querySelector('[href="korisnici-view"]');

let filterViewGumb= document.querySelector('[href="filter-view"]');
let filterView = document.querySelector("#filter-view");

addKorisniciViewGumb.addEventListener('click', function(e){
    e.preventDefault();
    addKorisniciView.style.display= "block";
    korisniciView.style.display= "none";
    
    let temp='';
    zemlje.forEach( d =>{
        temp = temp + `<option value="${d}">${d}</option>`;         
    });

    document.querySelector("#iDrzava").innerHTML=temp;
    // let listaInsert = document.querySelector("#iDrzava");   
    // listaInsert.innerHTML=temp; 

    flatpickr(datumI, parametriZaOblikDatuma);
    
});

korisniciViewGumb.addEventListener('click', function(e){
    e.preventDefault();
    korisniciView.style.display= "block";
    addKorisniciView.style.display= "none";
    editKorisniciView.style.display= "none";
});


filterViewGumb.addEventListener('click', function(e){
    e.preventDefault();
    if(filterView.style.display == "block"){
        filterView.style.display = 'none';
        filterViewGumb.innerHTML = 'Otkrij filter';
    }else{
        filterView.style.display = 'block';
        filterViewGumb.innerHTML = 'Sakrij filter';
    };
    ocistiPretragu();
});


let saveBtn = document.querySelector("#save");
let idI =document.querySelector('[placeholder="id"]');
let nazivI  =document.querySelector('[placeholder="Naziv"]');
let mailI   =document.querySelector('[placeholder="Mail"]');
// let drzavaI =document.querySelector('[placeholder="Drzava"]');
let drzavaI = document.querySelector("#iDrzava");
let zanimanjeI  =document.querySelector('[placeholder="Zanimanje"]');
let datumI  =document.querySelector('[placeholder="Datum"]');

saveBtn.addEventListener('click', spremiNoviPodatak);

function spremiNoviPodatak(){
    const novi={
        id: idI.value,
        naziv:  nazivI.value,
        email:   mailI.value,
        drzava: drzavaI.value,
        zanimanje:  zanimanjeI.value,
        datum:  datumI.value
    }
    db.push(novi);
    pretrazi();  
    idI.value='';
    nazivI.value='';
    mailI.value='';
    drzavaI.value='';
    zanimanjeI.value='';
    datumI.value='';

    korisniciView.style.display= "block";
    addKorisniciView.style.display= "none";
    editKorisniciView.style.display= "none";
}


function perzistiraj(){
    localStorage.db=JSON.stringify(db);
} 


let textPretrage = document.querySelector('[placeholder="pojam za pretragu"]');
let searchGumb = document.querySelector('#search');
searchGumb.addEventListener("click",pretrazi);

function pretrazi(){
    
   const p=textPretrage.value;
   let regTest = new RegExp(p,'i');
   const p2 = db.filter( x => {
        return ( 
            regTest.test(x.naziv)
            || regTest.test(x.email)
            || regTest.test(x.drzava)
            || regTest.test(x.zanimanje)
        );
   });

//    console.log(db);
   let db2 = db;
   db = p2;
//    console.log(db);
   popuniTablicu();
   db = db2;
//    console.log(db);
}


let gumbXsearch=document.querySelector('.btn-outline-secondary');
gumbXsearch.addEventListener('click', ocistiPretragu);

function ocistiPretragu(){
    textPretrage.value='';
    popuniTablicu();
}

////---------------sortiranje -----------
let atributi=['id','naziv','email','zanimanje','drzava'];
let indexPolja=0;

const zglavlje = document.querySelector('thead');
const kolone=zglavlje.querySelectorAll('td');
kolone.forEach(x =>{
    x.id=atributi[indexPolja];
    indexPolja++;   
    if (indexPolja <= atributi.length){
        x.addEventListener('click',function(){
            sortirajKolonu(x.id);
        });
    }
});

function sortirajKolonu(p){
    if(p =='id'){
        // alert(p);
        db.sort( function(a, b){
            return smjer * (a.id - b.id);
        });        
    } else {
        db.sort(function(a,b){
            let x = a[p].toLowerCase();
            let y = b[p].toLowerCase();
            if(x>y) return smjer * 1;
            if(y>x) return smjer * -1;
            return 0;
        });
       
    }  
    pretrazi();  
    promjeniSmjer();
}

let smjer = 1;

function promjeniSmjer(){
    smjer = smjer * -1
}
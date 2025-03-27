function h_Header(){
    let headd = document.createElement('div');
    headd.className = "header";
   
    let tittu = document.createElement('h1');
    tittu.className = "TituloH";
    tittu.innerText = "Marca ✔ si asistio o ✘ si estubo ausente";

    headd.appendChild(tittu);
    return headd;
}

export {h_Header};
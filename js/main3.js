let chamber = document.querySelector(`#senate`) ? "senate" : "house"

let URLAPI = `https://api.propublica.org/congress/v1/113/${chamber}/members.json`
let init = {
    method: "GET",
    headers: {
        "X-api-Key" : "h7G2U7dEViNcFaRSIM0cXHuejUI84IVJeCYR5S6R"
    }
}
fetch(URLAPI,init)
    .then(Response => Response.json())
        .then(json =>{
            const data = json



var dataresults = data.results[0].members

let miembrosDemocratas = 0
let miembrosRepublicanos = 0
let miembrosIndependentistas = 0
let sumaDePorcentajesDemocratas = 0
let sumaDePorcentajesRepublicanos = 0
let sumaDePorcentajesIndependentistas = 0
var sumaDePorcentajes = 0

dataresults.forEach(miembro =>{
    if(miembro.party === "D"){
        miembrosDemocratas ++
        sumaDePorcentajesDemocratas = sumaDePorcentajesDemocratas + miembro.votes_with_party_pct
    }else if (miembro.party === "R"){
        miembrosRepublicanos ++
        sumaDePorcentajesRepublicanos = sumaDePorcentajesRepublicanos + miembro.votes_with_party_pct
    }else if(miembro.party === "ID"){
        miembrosIndependentistas ++
        sumaDePorcentajesIndependentistas = sumaDePorcentajesIndependentistas + miembro.votes_with_party_pct
    }
    sumaDePorcentajes = sumaDePorcentajes + miembro.votes_with_party_pct
});

let total = miembrosDemocratas + miembrosRepublicanos + miembrosIndependentistas

console.log((sumaDePorcentajes/total).toFixed(2))
const imprimirTabla = () => {
    let percentByPartyD = (sumaDePorcentajesDemocratas/miembrosDemocratas)
    let percentByPartyR = (sumaDePorcentajesRepublicanos/miembrosRepublicanos)
    let percentByPartyID = (sumaDePorcentajesIndependentistas/miembrosIndependentistas)
    
    if(isNaN(percentByPartyID)){
        percentByPartyID = 0
    }
    let tableLoyal = document.querySelector ("#tbody_partyloyalty")

    tableLoyal.innerHTML = `
    <tr>
    <td>Democrats</td>
    <td>${miembrosDemocratas}</td>
    <td>${percentByPartyD.toFixed(2)}&#37</td>
    </tr>
    <tr>
    <td>Republicans</td>
    <td>${miembrosRepublicanos}</td>
    <td>${percentByPartyR.toFixed(2)}&#37</td>
    </tr>
    <tr>
    <td>Independents</td>
    <td>${miembrosIndependentistas}</td>
    <td>${percentByPartyID.toFixed(2)}&#37</td>
    </tr>
    <tr>
    <td>Total</td>
    <td>${total}</td>
    <td>${(sumaDePorcentajes/total).toFixed(2)}&#37</td>
    </tr>
    `
}
imprimirTabla()

let auxPercent = []

let ordenandoPorcentaje = dataresults.forEach(member =>{
    if (!auxPercent.includes(member.votes_with_party_pct)){
        auxPercent.push(member)
    }
    auxPercent.sort (function (a, b){return a.votes_with_party_pct - b.votes_with_party_pct})
})
console.log (auxPercent.length)
let reglaDeTres = Math.floor(total*0.10)

console.log (reglaDeTres)

let ordenandoFinalMost = auxPercent.slice(0, reglaDeTres)
let ordenandoFinalLeast = auxPercent.reverse().slice(0, reglaDeTres)


const tablaLoyal = (array, idTabla) => {
    let tablaLoyal = document.querySelector(`#${idTabla}`)
    array.forEach(member => {
        let creandoMiembro = document.createElement("tr")
        creandoMiembro.innerHTML = `
        <td>
        <a href="${member.url} style= "text-decoration: 2px blue underline"">
        ${member.first_name}
        ${member.middle_name ? member.middle_name : ""}
        ${member.last_name}
        </a>
        </td>
        <td>${Math.round((auxPercent.length / 100) * member.votes_with_party_pct)}</td>
        <td>${member.votes_with_party_pct.toFixed(2)}&#37</td>
        `

        tablaLoyal.appendChild(creandoMiembro)

    })
}









tablaLoyal(ordenandoFinalMost, "tableLoyal_2")
tablaLoyal(ordenandoFinalLeast, "tableLoyal")

})

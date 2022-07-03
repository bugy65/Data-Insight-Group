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

const members =(param1) =>{
    let firtsname = param1.results[0].members.forEach(element => {
        console.log(element.first_name)
    });
}

members(data)

console.log("____________________________")

const states =(param2) =>{
    let arraystate = []
    let showstate = param2.results[0].members.forEach(element => {
        if (!arraystate.includes(element.state)) {
            arraystate.push(element.state)
        }
    });
    

    return arraystate.sort()
}

states(data)
console.table(states(data))

console.log("____________________________")


const party = (param3,partyname) =>{
    let arrayvoid = []
    param3.results[0].members.forEach(elementparty =>{
        if (elementparty.party.includes(partyname)){
            arrayvoid.push(elementparty.first_name + " " + elementparty.last_name)
        }

    })
    console.table(arrayvoid)
}
party(data,"D")


console.log("____________________________")

const state = (param3,statename) =>{
    let arrayvoid = []
    param3.results[0].members.forEach(elementstate =>{
        if (elementstate.state.includes(statename)){
            arrayvoid.push(elementstate.first_name + " " + elementstate.last_name)
        }

    })
    console.table(arrayvoid)
}
state(data,"TN")

// 1- capturar el elemento donde se van a inyectar los hijos
const rendername = array => {
    
    const tablasenate = document.querySelector("#table_senate")
    
    //2- recorrer el array de datos
    tablasenate.innerHTML = ""
    array.forEach(data =>{
        //3- crear el elemento HTML donde se inyectara la info
    
        let TrItem = document.createElement("tr")
    
    
        // 4- inyectar la info en el elemento creado
    
        TrItem.innerHTML = `<td> ${data.last_name} ${data.first_name} ${data.middle_name ? data.middle_name:""}  </td> 
        <td> ${data.party} </td>
        <td> ${data.state} </td>
        <td> ${data.seniority} </td>
        <td> ${data.votes_with_party_pct} </td>`
    
        // 5- inyectar (o anexar) el elemento nuevo con la info padre
        
        tablasenate.appendChild(TrItem)
    })
}


let form = document.querySelector("form")
let selectForm = form.querySelector("select")


form.addEventListener("change", () => {
    let checkBoxes = form.querySelectorAll("input[type='checkbox']")
    let arrayCheckBoxes = Array.from(checkBoxes)
    let checkBoxesSeleccionados = arrayCheckBoxes.filter(checkbox => checkbox.checked)
    let allChecks = checkBoxesSeleccionados.map(checkbox => checkbox.value)
    
    let seleccionElegida = selectForm.value
    console.log(seleccionElegida)

let aux = [];
const filtrarPartidos = () => {
    if (allChecks.length == 0) {
        aux = data.results[0].members
    }else {
        data.results[0].members.forEach(miembro => 
            allChecks.forEach(check => miembro.party == check ? aux.push(miembro) : null))
        }
    rendername(aux)
}

        
        
    filtrarPartidos();

const filtraEstados = () => {
    let auxStates =  [];
    aux.forEach(miembros =>{
        if (seleccionElegida == 'all') {
            auxStates.push(miembros)
        }else if(seleccionElegida == miembros.state)
        {auxStates.push(miembros)}
        })
        rendername(auxStates)
    
    }
        
      filtraEstados()

}
    
    
    
    )
    
    
    rendername(data.results[0].members)
    


    
    function stateselect(array) {
        array.forEach(state => {
            let opciones = document.createElement('option')
            opciones.innerHTML = `${state}`
            opciones.value = `${state}`
            selectForm.appendChild(opciones)
        })

        
    }
    stateselect(states(data))

})
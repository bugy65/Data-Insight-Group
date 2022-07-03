Vue.createApp({
    data() {
        return {
            message: 'lol',

            init: {
                method: "GET",
                headers: {
                    "X-api-Key": "h7G2U7dEViNcFaRSIM0cXHuejUI84IVJeCYR5S6R"
                }
            },
            senators: [],
            partidos: [],
            states: [],
            statesSelected: "all",
            auxiliar: [],
            auxStates: [],

            miembrosDemocratas: 0,
            miembrosRepublicanos: 0,
            miembrosIndependentistas: 0,
            sumaDePorcentajesDemocratas: 0,
            sumaDePorcentajesRepublicanos: 0,
            sumaDePorcentajesIndependentistas: 0,
            sumaDePorcentajes: 0,
            sumaDePorcentajesTotal: 0,
            total: this.miembrosDemocratas + this.miembrosRepublicanos + this.miembrosIndependentistas,

            auxPorcentaje: [],
            reglaDeTres:0,
            ordenandoFinalMost: 0,
            ordenandoFinalLeast: 0,
            auxlength: 0,
            totalMath: 0

            // miembrosDemocratas: 0,
            // miembrosRepublicanos: 0,
            // miembrosIndependentistas: 0,
            // sumaDePorcentajesDemocratas: 0,
            // sumaDePorcentajesRepublicanos: 0,
            // sumaDePorcentajesIndependentistas: 0,
            // sumaDePorcentajes: 0,
            // total: miembrosDemocratas + miembrosRepublicanos + miembrosIndependentistas,
        }
    },
    created() {
        let chamber = document.querySelector(`#senate`) ? "senate" : "house"

        this.URLAPI = `https://api.propublica.org/congress/v1/113/${chamber}/members.json`

        fetch(this.URLAPI, this.init)
            .then(response => response.json())
            .then(datos => {
                const data = datos
                this.senators = data.results[0].members

                this.senators.map(stateX => {
                    if (!this.states.includes(stateX.state)) {
                        this.states.push(stateX.state)
                    }
                    return this.states.sort()
                })
                console.log()
                console.log(data)


            })
    },
    method: {
        // statesSelected(value)
    },
    computed: {

        ecuacion() {
            this.miembrosDemocratas = 0,
                this.miembrosRepublicanos = 0,
                this.miembrosIndependentistas = 0,
                this.sumaDePorcentajesDemocratas = 0,
                this.sumaDePorcentajesRepublicanos = 0,
                this.sumaDePorcentajesIndependentistas = 0,
                this.sumaDePorcentajes = 0,
                this.sumaDePorcentajesTotal = 0,

                this.senators.forEach(miembro => {
                    if (miembro.party === "D") {
                        this.miembrosDemocratas++
                        this.sumaDePorcentajesDemocratas = this.sumaDePorcentajesDemocratas + miembro.votes_with_party_pct
                    } else if (miembro.party === "R") {
                        this.miembrosRepublicanos++
                        this.sumaDePorcentajesRepublicanos = this.sumaDePorcentajesRepublicanos + miembro.votes_with_party_pct
                    } else if (miembro.party === "ID") {
                        this.miembrosIndependentistas++
                        this.sumaDePorcentajesIndependentistas = this.sumaDePorcentajesIndependentistas + miembro.votes_with_party_pct
                    }
                    this.sumaDePorcentajes = this.sumaDePorcentajes + miembro.votes_with_party_pct
                });
            this.total = this.miembrosDemocratas + this.miembrosRepublicanos + this.miembrosIndependentistas
        
            
            this.percentByPartyD = Math.round(this.sumaDePorcentajesDemocratas/this.miembrosDemocratas)
            this.percentByPartyR = Math.round(this.sumaDePorcentajesRepublicanos/this.miembrosRepublicanos)
            this.percentByPartyID = Math.round(this.sumaDePorcentajesIndependentistas/this.miembrosIndependentistas)
            this.sumaDePorcentajesTotal = (this.sumaDePorcentajes/this.total)
            if (isNaN(this.percentByPartyID)) {
                    this.percentByPartyID = 0}






            

        },

    leastEngaged(){
        this.auxPorcentaje =[],
        
    this.senators.forEach(miembro =>{
        if (!this.auxPorcentaje.includes(miembro.votes_with_party_pct)){
            this.auxPorcentaje.push(miembro)
        }
        this.auxPorcentaje.sort (function (a, b){return a.votes_with_party_pct - b.votes_with_party_pct})
    })
    this.reglaDeTres = Math.floor(this.total*0.10)
    this.totalMath = (this.auxPorcentaje.length / 100)
    
    // this.auxlength = ((this.auxPorcentaje.length / 100) * miembro.votes_with_party_pct)
    this.ordenandoFinalMost = this.auxPorcentaje.slice(0, this.reglaDeTres)
    this.ordenandoFinalLeast = this.auxPorcentaje.reverse().slice(0, this.reglaDeTres)
        
    },
},


    
}).mount('#app')
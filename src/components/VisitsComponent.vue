<template>
    <div>
        <v-row class="d-flex" align="center" justify="center">
            <v-col cols="12" md="8">
                <v-data-table
                :headers="headers"
                :items="visitas"
                :items-per-page="5"
                class="elevation-1">
                    
                </v-data-table>
            </v-col>
        </v-row>

    </div>
</template>

<script>
import axios from 'axios'
    export default {
        name: 'VisitsComponent',
        data() {
            return {
                headers:[
                    {
                    text: "Nombre paciente",
                    align: "center",
                    sortable: false,
                    value: "nombre_completo",
                    },
                    {
                    text: "Doctor del paciente",
                    align: "center",
                    sortable: false,
                    value: "nombre_profesional",
                    },
                    {
                    text: "Nombre Medicamento",
                    align: "center",
                    sortable: false,
                    value: "nombre_medicamento",
                    },
                    {
                    text: "Temperatura",
                    align: "center",
                    sortable: false,
                    value: "temperatura",
                    },
                    {
                    text: "Peso",
                    value: "peso",
                    sortable: false,
                    },
                    {
                        text: "Presión",
                        value: "presion",
                        sortable: false,
                    },
                    {
                        text: "Dosis",
                        value: "dosis",
                        sortable: false,
                    },
                    {
                        text: "Observación",
                        value: "observacion"
                    }
                ],
                visitas:[],
                medicamentos: ["Mixamorranilo300", "Choclometanol400", "Chichanosol800"],
                visita:{
                    id_doctor: "",
                    nombre_profesional: "",
                    id_paciente: "",
                    nombre_completo: "",
                    id_medicamento: "",
                    nombre_medicamento: "",
                    temperatura: "",
                    peso: "",
                    presion: "",
                    dosis: "",
                    observacion: ""
                },
            }
        },
        created() {
            axios.get('visitas/',{headers:{Authorization: 'Token '+this.$store.getters.retrieveUser.token}})
            .then((response)=>{
                let i=0;
                for(let nueva_visita of response.data){                
                    const user = {
                    id_doctor : nueva_visita.id_doctor,
                    nombre_profesional: "",
                    id_paciente : nueva_visita.id_paciente,
                    nombre_paciente : "",
                    id_medicamento : nueva_visita.id_medicamento,
                    nombre_medicamento : "",
                    temperatura : nueva_visita.temperatura,
                    peso :  nueva_visita.peso,
                    presion : nueva_visita.presion,
                    dosis : nueva_visita.dosis,
                    observacion : nueva_visita.observacion
                    }
                    this.visitas.push(user)
                    this.changeData(nueva_visita.id_doctor,nueva_visita.id_paciente, nueva_visita.id_medicamento,i)
                    i+=1;
                }
            })
        },
        methods: {
            changeData(id_doctor, id_paciente, id_medicamento,i){
                    axios.get('profesional/'+id_doctor,{headers:{Authorization: 'Token '+this.$store.getters.retrieveUser.token}})
                    .then(res=>{
                        this.visitas[i].nombre_profesional=res.data[0].nombre_profesional;
                        })
                    axios.get('paciente/'+id_paciente,{headers:{Authorization: 'Token '+this.$store.getters.retrieveUser.token}})
                    .then(res=>{
                        this.visitas[i].nombre_completo=res.data[0].nombre_completo
                        })
                    axios.get('gastomedicamento/'+id_medicamento,{headers:{Authorization: 'Token '+this.$store.getters.retrieveUser.token}})
                    .then(res=>{
                        this.visitas[i].nombre_medicamento=this.medicamentos[res.data[0].id_med]
                        })
            }
        },
/*                id_paciente: "",
                id_medicamento: "",
                temperatura: "",
                peso: "",
                presion: "",
                dosis: "",
                observacion: "",*/
    }
</script>

<style lang="sass" scoped>

</style>
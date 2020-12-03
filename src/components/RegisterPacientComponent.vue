<template>
    <div>
        <v-form v-model="valid">
            <v-row class="d-flex" align="center" justify="center">
                <v-col cols="12" sm="8" md="6">
                    <v-card class="elevation-12 __b-20 pa-4">
                        <v-card-text>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field 
                                    label="Nombre Completo"
                                    v-model="nombre_completo"
                                    :rules="[rules.required]"></v-text-field>
                                </v-col>
                                <v-col>
                                    <v-text-field 
                                    label="Edad"
                                    v-model="edad"
                                    :rules="[rules.required]"
                                    @keypress="isNumber($event)"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-select
                                    label="Tipo de Documento"
                                    :items="docType"
                                    v-model="tipo_id"></v-select>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field 
                                    label="Documento"
                                    v-model="num_id"
                                    :rules="[rules.required, rules.documentRules]"
                                    @keypress="isNumber($event)"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="6">
                                    <v-text-field 
                                    label="Dirección"
                                    v-model="direccion"
                                    :rules="[rules.required]"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field 
                                    label="Ciudad"
                                    v-model="ciudad"
                                    :rules="[rules.required]"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>                            
                                <v-col cols="12" md="6">
                                    <v-text-field 
                                    label="Barrio"
                                    v-model="barrio"
                                    :rules="[rules.required]"></v-text-field>
                                </v-col>
                                <v-col cols="12" md="6">
                                    <v-text-field
                                    label="Ubicación"
                                    v-model="geolocalizacion"
                                    :disabled="true"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="12" md="4">
                                    <v-select
                                    label="ID"
                                    :items="ids_doctores"
                                    v-model="id_doctor"
                                    @change="seleccionarDoctor"></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-select
                                    label="Doctores"
                                    :items="doctores"
                                    v-model="nombre_doctor"
                                    @change="seleccionarId"></v-select>
                                </v-col>
                                <v-col cols="12" md="4">
                                    <v-text-field 
                                    label="# Personas convivencia"
                                    v-model="num_personas_convivencia"
                                    :rules="[rules.required]"
                                    @keypress="isNumber($event)"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col  cols="12" md="12">
                                    <v-text-field 
                                    label="Hipótesis"
                                    v-model="hipotesis"
                                    :rules="[rules.required]"></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col>
                                    <v-btn :disabled="!valid" depressed class="text-none px-5" color="primary" elevation="10" @click="saveUser">
                                        Registrar Paciente
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-card-text>
                    </v-card>
                    <v-dialog v-model="dialog" width="300">
                        <v-alert
                            style="margin-bottom: 0"
                            type="error"
                            transition="scale-transition"
                        >
                            Por favor, revise los datos ingresados e inténtelo nuevamente.
                        </v-alert>
                        </v-dialog>
                        <v-overlay :value="load">
                        <v-progress-circular
                            :width="5"
                            indeterminate
                            color="white"
                            size="64"
                        ></v-progress-circular>
                        </v-overlay>
                </v-col>
            </v-row>
        </v-form>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: 'RegisterPacientComponent',
        data() {
            return {
                dialog: false,
                load: false,
                valid: false,
                num_id: "",
                docType: [
                    "Cédula de ciudadanía",
                    "Cédula de extranjería",
                    "Pasaporte",
                    "NIT",
                ],
                tipo_id: "",
                nombre_completo: "",
                edad: "",
                direccion: "",
                ciudad: "",
                barrio: "",
                doctores: [],
                ids_doctores: [],
                nombre_doctor: "",
                id_doctor: "",
                geolocalizacion: "",
                num_personas_convivencia: "",
                hipotesis: "",
                rules: {
                    required: (value) => !!value || "Este campo no puede estar vacio",
                    documentRules: (value) =>
                    value.length == 10 || "El documento debe contener 10 dígitos",
                    emailRules: (value) =>
                    /.+@.+/.test(value) || "Ingresa un correo valido",
                    passwordRules: (value) =>
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&*])(?=.{8,})/.test(
                        value
                    ) ||
                    "*Mínimo 8 caracteres. *Mínimo una letra minúscula. *Mínimo una letra mayúscula. *Mínimo un número. *Mínimo un caracter especial[!@#%&*].",
                },
            }
        },
          watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.load = false;
        }, 3000);
    },
  },
        created() {
                this.$getLocation({})
                    .then(coordinates => {
                        this.geolocalizacion = coordinates.lat + " "+coordinates.lng
                    })
                    .catch(error => alert(error));
            this.initialDoctors();
        },
        methods: {
            saveUser(){
                axios.post('registrarpaciente/',{
                    num_id: this.num_id, 
                    tipo_id: this.docType.indexOf(this.tipo_id), 
                    nombre_completo: this.nombre_completo, 
                    edad: this.edad, 
                    direccion: this.direccion, 
                    ciudad: this.ciudad, 
                    barrio: this.barrio, 
                    id_doctor: parseInt(this.id_doctor), 
                    geolocalizacion: this.geolocalizacion, 
                    num_personas_convivencia: parseInt(this.num_personas_convivencia), 
                    hipotesis: this.hipotesis
                },{
                    headers: {
                        Authorization: 'Token '+this.$store.getters.retrieveUser.token
                    }
                })
                .then((response) => {
                this.load = !this.load;
                setTimeout(() => {
                    this.$store.commit("setModuleTitle", "Pacientes");
                }, 1500);
                })
                .catch((error) => {
                console.log(error);
                this.dialog = true;
                });
            },
            seleccionarDoctor(){
                let pos = this.ids_doctores.indexOf(this.id_doctor)
                this.nombre_doctor = this.doctores[pos]
            },
            seleccionarId(){
                let pos = this.doctores.indexOf(this.nombre_doctor)
                this.id_doctor = this.ids_doctores[pos]
            },
            initialDoctors(){
                axios.get('profesional/',{
                    headers:{
                        Authorization: 'Token '+this.$store.getters.retrieveUser.token
                    }
                })
                .then(response=>{
                    for(let doctor of response.data){
                        this.doctores.push(doctor.nombre_profesional)
                        this.ids_doctores.push(doctor.num_id)
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
            },
            isNumber: function (evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (
                charCode > 31 &&
                (charCode < 48 || charCode > 57) &&
                charCode !== 46
            ) {
                evt.preventDefault();
            } else {
                return true;
            }
            },
        },
        computed:{

        }
    }
</script>

<style lang="sass" scoped>

</style>
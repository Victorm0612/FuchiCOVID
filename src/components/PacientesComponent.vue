<template>
    <div>
        <v-container>
            <v-row class="d-flex" align="center" justify="center">
                <v-col cols="12" md="8">
                    <v-data-table 
                    :headers="headers"
                    :items="pacientes"
                    :items-per-page="5"
                    class="elevation-1">

                    <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">
                        fas fa-edit
                    </v-icon>
                    <v-icon :disabled="retrieveType == 2" small @click="deleteItem(item)"> fas fa-trash-alt </v-icon>
                    </template>

                    </v-data-table>
                    <v-dialog  v-model="dialog" fullscreen>
                        <v-form v-model="valid">
                            <v-row class="d-flex" align="center" justify="center">
                                <v-col cols="12" sm="8" md="6">
                                    <v-card class="elevation-12 __b-20 pa-4">
                                        <v-card-text>
                                            <v-row>
                                                <v-col cols="12" md="6">
                                                    <v-text-field 
                                                    label="Nombre Completo"
                                                    v-model="editedItem.nombre_completo"
                                                    :rules="[rules.required]"></v-text-field>
                                                </v-col>
                                                <v-col>
                                                    <v-text-field 
                                                    label="Edad"
                                                    v-model="editedItem.edad"
                                                    :rules="[rules.required]"
                                                    @keypress="isNumber($event)"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" md="6">
                                                    <v-select
                                                    label="Tipo de Documento"
                                                    :items="docType"
                                                    v-model="editedItem.tipo_id"></v-select>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-text-field 
                                                    label="Documento"
                                                    v-model="editedItem.num_id"
                                                    :rules="[rules.required, rules.documentRules]"
                                                    @keypress="isNumber($event)"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" md="6">
                                                    <v-text-field 
                                                    label="Dirección"
                                                    v-model="editedItem.direccion"
                                                    :rules="[rules.required]"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-text-field 
                                                    label="Ciudad"
                                                    v-model="editedItem.ciudad"
                                                    :rules="[rules.required]"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>                            
                                                <v-col cols="12" md="6">
                                                    <v-text-field 
                                                    label="Barrio"
                                                    v-model="editedItem.barrio"
                                                    :rules="[rules.required]"></v-text-field>
                                                </v-col>
                                                <v-col cols="12" md="6">
                                                    <v-text-field
                                                    label="Ubicación"
                                                    v-model="editedItem.geolocalizacion"
                                                    :disabled="true"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col cols="12" md="4">
                                                    <v-select
                                                    label="ID"
                                                    :items="ids_doctores"
                                                    v-model="editedItem.id_doctor"
                                                    @change="seleccionarDoctor"></v-select>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-select
                                                    label="Doctores"
                                                    :items="doctores"
                                                    v-model="editedItem.nombre_doctor"
                                                    @change="seleccionarId"></v-select>
                                                </v-col>
                                                <v-col cols="12" md="4">
                                                    <v-text-field 
                                                    label="# Personas convivencia"
                                                    v-model="editedItem.num_personas_convivencia"
                                                    :rules="[rules.required]"
                                                    @keypress="isNumber($event)"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col  cols="12" md="12">
                                                    <v-text-field 
                                                    label="Hipótesis"
                                                    v-model="editedItem.hipotesis"
                                                    :rules="[rules.required]"></v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col>
                                                    <v-btn :disabled="!valid" depressed class="text-none px-5" color="primary" elevation="10" @click="save">
                                                        Actualizar Paciente
                                                    </v-btn>
                                                </v-col>
                                                <v-col>
                                                    <v-btn depressed class="text-none px-5" color="primary" elevation="10" @click="close"
                                                        >Cancelar
                                                    </v-btn>
                                                </v-col>
                                            </v-row>
                                        </v-card-text>
                                    </v-card>
                                    <v-dialog v-model="dialog_Error" width="300">
                                        <v-alert
                                            style="margin-bottom: 0"
                                            type="error"
                                            transition="scale-transition"
                                        >
                                            Por favor, revise los datos ingresados e inténtelo nuevamente.
                                        </v-alert>
                                        </v-dialog>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-dialog>
                        <v-dialog v-model="dialogDelete" max-width="500px">
                            <v-card>
                                <v-card-title class="headline"
                                >Está seguro que desea eliminarlo?</v-card-title
                                >
                                <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue darken-1" text @click="closeDelete"
                                    >Cancelar</v-btn
                                >
                                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                                    >OK</v-btn
                                >
                                <v-spacer></v-spacer>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: 'PacientesComponent',
        data(){
            return{
                valid: false,
                dialog: false,
                dialog_Error: false,
                dialogDelete: false,
                headers:[
                    {
                    text: "#",
                    align: "center",
                    sortable: false,
                    value: "num_id",
                    },
                    {
                    text: "Nombre",
                    align: "center",
                    sortable: false,
                    value: "nombre_completo",
                    },
                    {
                    text: "Hipótesis",
                    align: "center",
                    sortable: false,
                    value: "hipotesis",
                    },
                    {
                    text: "Opciones",
                    value: "actions",
                    sortable: false,
                    },
                ],
                pacientes:[],
                editedIndex: -1,
                docType: [
                    "Cédula de ciudadanía",
                    "Cédula de extranjería",
                    "Pasaporte",
                    "NIT",
                ],
                doctores: [],
                ids_doctores: [],
                editedItem:{
                    num_id: "",
                    tipo_id: "",
                    nombre_completo: "",
                    edad: "",
                    direccion: "",
                    ciudad: "",
                    barrio: "",
                    nombre_doctor: "",
                    id_doctor: "",
                    geolocalizacion: "",
                    num_personas_convivencia: "",
                    hipotesis: "",
                },
                defaultItem:{
                    num_id: "",
                    tipo_id: "",
                    nombre_completo: "",
                    edad: "",
                    direccion: "",
                    ciudad: "",
                    barrio: "",
                    nombre_doctor: "",
                    id_doctor: "",
                    geolocalizacion: "",
                    num_personas_convivencia: "",
                    hipotesis: "",
                },
                rules: {
                    required: (value) => !!value || "Este campo no puede estar vacio",
                    mobileRules: (value) =>
                    value.length == 10 || "El número de celular debe contener 10 dígitos",
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
        created() {
            this.initialData()
        },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
        computed:{
            retrieveType(){
                return this.$store.getters.retrieveUser.type_user
            }
        },
        methods: {
            seleccionarDoctor(){
                let pos = this.ids_doctores.indexOf(this.editedItem.id_doctor)
                this.editedItem.nombre_doctor = this.doctores[pos]
            },
            seleccionarId(){
                let pos = this.doctores.indexOf(this.editedItem.nombre_doctor)
                this.editedItem.id_doctor = this.ids_doctores[pos]
            },
            initialData(){
                axios.get('paciente/',{
                    headers:{
                        Authorization: 'Token '+ this.$store.getters.retrieveUser.token
                    }
                })
                .then(response=>{
                    for(let paciente of response.data){
                        this.pacientes.push(paciente);
                    }
                })
                .catch(error=>{
                    console.log(error)
                })
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
            editItem(item){
                this.editedIndex = this.pacientes.indexOf(item);
                this.editedItem = {
                    num_id: item.num_id,
                    tipo_id: this.docType[this.pacientes[this.editedIndex].tipo_id],
                    nombre_completo: item.nombre_completo,
                    edad: item.edad,
                    direccion: item.direccion,
                    ciudad: item.ciudad,
                    barrio: item.barrio,
                    nombre_doctor: this.doctores[this.ids_doctores.indexOf(item.id_doctor)],
                    id_doctor: item.id_doctor,
                    geolocalizacion: item.geolocalizacion,
                    num_personas_convivencia: item.num_personas_convivencia,
                    hipotesis: item.hipotesis
                };
                this.dialog = true;
            },
            deleteItemConfirm(){
                axios
                    .delete(
                    "borrarpaciente/" + this.pacientes[this.editedIndex].num_id,
                    {
                        headers: {
                        Authorization: "Token " + this.$store.getters.retrieveUser.token,
                        },
                    }
                    )
                    .then(() => {
                    this.pacientes.splice(this.editedIndex, 1);
                    this.closeDelete();
                    })
                    .catch((error) => {
                    console.log(error);
                    });
            },
            deleteItem(item){
                this.editedIndex = this.pacientes.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialogDelete = true;
            },
            close(){
                this.dialog = false;
                this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
            },
            closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
            },
            save(){
                axios
                .put(
                "actualizarpaciente/",
                {
                    num_id: parseInt(this.editedItem.num_id),
                    tipo_id: this.docType.indexOf(this.editedItem.tipo_id),
                    nombre_completo: this.editedItem.nombre_completo,
                    edad: this.editedItem.edad,
                    direccion: this.editedItem.direccion,
                    ciudad: this.editedItem.ciudad,
                    barrio: this.editedItem.barrio,
                    id_doctor: parseInt(this.editedItem.id_doctor),
                    geolocalizacion: this.editedItem.geolocalizacion,
                    num_personas_convivencia: this.editedItem.num_personas_convivencia,
                    hipotesis: this.editedItem.hipotesis
                },
                {
                    headers: {
                    Authorization: "Token " + this.$store.getters.retrieveUser.token,
                    },
                }
                )
                .then(() => {
                if (this.editedIndex > -1) {
                    Object.assign(this.pacientes[this.editedIndex], this.editedItem);
                } else {
                    this.pacientes.push(this.editedItem);
                }
                this.close();
                })
                .catch((error) => {
                console.log(error);
                });
            },

        },
    }
</script>

<style lang="sass" scoped>

</style>
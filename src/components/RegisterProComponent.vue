<template>
  <div>
    <v-row class="d-flex" align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="elevation-12 __b-20 pa-4">
          <v-card-text>
              <v-form  v-model="valid">
            <v-row>
              <v-col>
                <v-text-field
                  label="Nombre"
                  v-model="nombre_profesional"
                  :rules="[rules.required]"
                  
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-select
                  label="Tipo de documento"
                  v-model="tipo_id"
                  :items="docType"
                >
                </v-select>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="num_id"
                  :rules="[rules.required]"
                  label="Número de documento"
                  @keypress="isNumber($event)"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Dirección"
                  v-model="direccion"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Barrio"
                  v-model="barrio"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  label="Universidad"
                  :items="listU"
                  v-model="universidad"
                ></v-select>
              </v-col>
              <v-col>
                <v-select
                  label="Entidad de Salud"
                  :items="listE"
                  v-model="entidadSalud"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Correo Electrónico"
                  v-model="email"
                  :rules="[rules.required, rules.emailRules]"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-text-field
                  label="Contraseña"
                  v-model="password"
                  :rules="[
                    rules.required,
                    rules.passwordRules,
                    passwordConfirmationRule,
                  ]"
                  :append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  required
                ></v-text-field>
              </v-col>
              <v-col>
                <v-text-field
                  label="Confirmar contraseña"
                  v-model="confirmPassword"
                  :rules="[
                    rules.required,
                    rules.passwordRules,
                    passwordConfirmationRule,
                  ]"
                  :append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn
                  :disabled="!valid"
                  depressed
                  class="text-none px-5"
                  color="primary"
                  elevation="10"
                  @click="saveUser"
                  >Registrar Profesional
                </v-btn></v-col
              >
            </v-row>
            </v-form>
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
        <v-dialog v-model="formUniversidad" persistent max-width="600px">
            <v-card class="elevation-12 __b-20 pa-4">
                <v-card-title><span class="headline">Registro de Universidad</span></v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col>
                                <v-text-field label="Nombre universidad" v-model="formU" required>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-btn depressed class="text-none px-5" color="primary" @click="saveU">Confirmar</v-btn>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
        <v-dialog v-model="formEntidad" persistent max-width="600px">
            <v-card class="elevation-12 __b-20 pa-4">
                <v-card-title><span class="headline">Registro de Entidad de Salud</span></v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col>
                                <v-text-field label="Nombre de la entidad" v-model="formE" required>
                                </v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-btn depressed class="text-none px-5" color="primary" @click="saveE">Confirmar</v-btn>
                        </v-row>
                    </v-container>
                </v-card-text>
            </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "RegisterProComponent",
  data() {
    return {
      formU: false,
      formE: false,  
      valid: false,
      show: false,
      dialog: false,
      load: false,
      num_id: "",
      tipo_id: "Cédula de ciudadanía",
      nombre_profesional: "",
      direccion: "",
      barrio: "",
      registrado_por: "",
      formU: "",
      formE: "",
      universidad: "",
      entidadSalud: "",
      email: "",
      password: "",
      confirmPassword: "",
      listU: ["Otra universidad..."],
      listE: ["Otra entidad de salud..."],
      docType: [
        "Cédula de ciudadanía",
        "Cédula de extranjería",
        "Pasaporte",
        "NIT",
      ],
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
    };
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
      axios.get('universidad/')
      .then(response=>{
          for( let universidades of response.data){
              this.listU.unshift(universidades.nombre_universidad);
          }
      })
      axios.get('entidad/')
      .then(response=>{
          for( let entidades of response.data){
              this.listE.unshift(entidades.nombre_entidad);
          }
      })
  },
  computed: {
    formUniversidad(){
        return (this.universidad === "Otra universidad..." ? true : false)
    },
    formEntidad(){
        return (this.entidadSalud === "Otra entidad de salud..." ? true : false)
    },
    passwordConfirmationRule() {
      return (
        this.password === this.confirmPassword ||
        "Las contraseñas deben coincidir"
      );
    },
  },
  methods: {
    saveU(){
        this.listU.unshift(this.formU);
        this.universidad = this.formU;
    },
    saveE(){
        this.listE.unshift(this.formE);
        this.entidadSalud = this.formE;
    },
    saveUser(evt) {
        evt.preventDefault();
        axios.post('registrarprofesional/',{
            num_id: parseInt(this.num_id),
            tipo_id: this.docType.indexOf(this.tipo_id),
            nombre: this.nombre_profesional,
            direccion: this.direccion,
            barrio: this.barrio,
            universidad: this.universidad,
            entidadSalud: this.entidadSalud,
            email: this.email,
            contrasenia: this.password
        })
        .then(response=>{
            this.load = !this.load;
            setTimeout(() => {this.$store.commit('setModuleTitle', "Profesionales");}, 1500);
        })
        .catch((error)=>{
            console.log(error)
            this.dialog = true;
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
    isLetter: function (evt) {
      evt = evt ? evt : window.event;
      var charCode = evt.which ? evt.which : evt.keyCode;
      if (
        (charCode < 97 || charCode > 122) &&
        (charCode < 65 || charCode > 90)
      ) {
        evt.preventDefault();
      } else {
        return true;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
</style>
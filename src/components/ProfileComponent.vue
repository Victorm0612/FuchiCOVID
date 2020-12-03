<template>
  <div>
    <v-form v-model="valid">
      <v-container fluid>
        <v-row class="justify-center">
            <v-col cols="8" md="6">
          <v-card>
            <v-card-title class="justify-center">{{
              form.firstName + " " + form.lastName
            }}</v-card-title>
            <v-card-text>
              <v-row class="justify-center">
                <v-col cols="12" md="4">
                  <v-text-field
                    :disabled="!editProfile"
                    :rules="[rules.required]"
                    v-model="form.firstName"
                    label="Nombre"
                    @keypress="isLetter($event)"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    :disabled="!editProfile"
                    v-model="form.lastName"
                    :rules="[rules.required]"
                    label="Apellido"
                    @keypress="isLetter($event)"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="justify-center">
                <v-col cols="12" md="8">
                  <v-text-field
                    :disabled="!editProfile"
                    v-model="form.email"
                    :rules="[rules.required, rules.emailRules]"
                    label="Correo electrónico"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row class="justify-center">
                <v-col cols="12" md="4">
                  <v-text-field
                    :disabled="!editProfile"
                    v-model="form.password"
                    :rules="[
                      rules.required,
                      rules.passwordRules,
                      passwordConfirmationRule
                    ]"
                    :append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    label="Contraseña"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    :disabled="!editProfile"
                    v-model="form.confirmPassword"
                    :rules="[
                      rules.required,
                      rules.passwordRules,
                      passwordConfirmationRule
                    ]"
                    :append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
                    :type="show ? 'text' : 'password'"
                    @click:append="show = !show"
                    label="Confirmar contraseña"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-card-text>
            <v-card-actions class="justify-center">
              <v-container v-if="!editProfile">
                <v-row class="justify-center">
                  <v-col cols="12" md="4">
                    <v-btn
                      color="primary"
                      :loading="loading"
                      @click="editProfile = true"
                    >
                      Editar Perfil
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
              <v-row class="justify-center">
                <v-col cols="4" md="12" sm="12" xs="12">
                  <v-btn
                    v-if="editProfile"
                    color="primary"
                    @click="saveChange"
                    :disabled="!valid"
                  >
                    Guardar Cambios
                  </v-btn>
                </v-col>
                <v-col cols="4" md="12" sm="12" xs="12" @click="cancelChanges">
                  <v-btn v-if="editProfile" color="primary">
                    Cancelar
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-actions>
          </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "ProfileComponent",
  data() {
    return {
      show: false,
      loading: false,
      valid: true,
      docType: [
        "Cédula de ciudadanía",
        "Cédula de extranjería",
        "Pasaporte",
        "NIT"
        ],
      form: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      formBeforeEdit: {},
      editProfile: false,
      rules: {
        required: value => !!value || "Este campo no puede estar vacio",
        emailRules: value => /.+@.+/.test(value) || "Ingresa un correo valido",
        passwordRules: value =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&*])(?=.{8,})/.test(
            value
          ) ||
          "*Mínimo 8 caracteres. *Mínimo una letra minúscula. *Mínimo una letra mayúscula. *Mínimo un número. *Mínimo un caracter especial[!@#%&*]."
      }
    };
  },
  created() {
    this.formBeforeEdit = Object.assign({}, this.form);
  },
  mounted(){
    this.initialData()
  },
  computed: {
    passwordConfirmationRule() {
      return (
        this.form.password === this.form.confirmPassword ||
        "Las contraseñas deben coincidir"
      );
    }
  },
  methods: {
    initialData: function(){
        if(this.$store.getters.retrieveUser.type_user == 1){
            axios.get('funcionario/'+this.$store.getters.retrieveUser.id_user)
            .then(res=>{
            this.form.firstName = res.data[0].nombre_funcionario;
            this.form.lastName = res.data[0].apellido_funcionario;
            this.form.email = res.data[0].email;
            this.form.password = res.data[0].contrasenia;
            this.form.confirmPassword = res.data[0].contrasenia;
      })
        }else{
            axios.get('profesional/'+this.$store.getters.retrieveUser.id_user)
        }
    },
    cancelChanges: function() {
      this.initialData()
      this.editProfile = false;
    },
    saveChange(evt){
      evt.preventDefault();
        if(this.$store.getters.retrieveUser.type_user = 1){
            axios.put('actualizarfuncionario/',{
                id_funcionario: this.$store.getters.retrieveUser.id_user,
                nombre_funcionario:this.form.firstName,
                apellido_funcionario:this.form.lastName,
                email:this.form.email,
                contrasenia:this.form.password
            })
            .then(response=>{
            this.$store.commit('assignDataUser',{
                id_user: this.$store.getters.retrieveUser.id_user,
                name: this.form.firstName,
                email: this.form.email,
                refreshToken: this.$store.getters.retrieveUser.refreshToken,
                type_user: this.$store.getters.retrieveUser.type_user
            })
                this.editProfile = false;
            })
            .catch(error=>{
                console.log(error)
            })
        }else {
            axios.put('actualizarprofesional/'+this.$store.getters.retrieveUser.id_user,{

            })
        }
    }
    
  }
};
</script>
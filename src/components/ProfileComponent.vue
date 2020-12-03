<template>
  <div id="profile">
    <v-form v-if="retrieveType == 2">
      <v-container>
        <v-row class="d-flex" align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card class="elevation-12 __b-20 pa-4">
              <v-card-text>
                <v-row>
                  <v-col>
                    <v-text-field
                      :disabled="!editProfile"
                      label="Nombre"
                      v-model="nombre_profesional"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-select
                      :disabled="true"
                      label="Tipo de documento"
                      v-model="tipo_id"
                      :items="docType"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      :disabled="true"
                      v-model="num_id"
                      :rules="[rules.required, rules.documentRules]"
                      label="Número de documento"
                      @keypress="isNumber($event)"
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      :disabled="!editProfile"
                      label="Dirección"
                      v-model="direccion"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      :disabled="!editProfile"
                      label="Barrio"
                      v-model="barrio"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-select
                      :disabled="!editProfile"
                      label="Universidad"
                      :items="listU"
                      v-model="universidad"
                    ></v-select>
                  </v-col>
                  <v-col>
                    <v-select
                      :disabled="!editProfile"
                      label="Entidad de Salud"
                      :items="listE"
                      v-model="entidadSalud"
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col>
                    <v-text-field
                      :disabled="!editProfile"
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
                      :disabled="!editProfile"
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
                      :disabled="!editProfile"
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
                </v-row>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-btn
                      v-if="!editProfile"
                      color="primary"
                      :loading="loading"
                      @click="editProfile = true"
                    >
                      Editar Perfil
                    </v-btn>
                  </v-col>
                  <v-col>
                    <v-btn
                      v-if="editProfile"
                      color="primary"
                      @click="saveChange"
                    >
                      Guardar Cambios
                    </v-btn>
                  </v-col>
                  <v-col @click="cancelChanges">
                    <v-btn v-if="editProfile" color="primary"> Cancelar </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-dialog v-model="formUniversidad" max-width="600px">
      <v-card class="elevation-12 __b-20 pa-4">
        <v-card-title
          ><span class="headline">Registro de Universidad</span></v-card-title
        >
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  label="Nombre universidad"
                  v-model="formU"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-btn
                depressed
                class="text-none px-5"
                color="primary"
                @click="saveU"
                >Confirmar</v-btn
              >
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="formEntidad" max-width="600px">
      <v-card class="elevation-12 __b-20 pa-4">
        <v-card-title
          ><span class="headline"
            >Registro de Entidad de Salud</span
          ></v-card-title
        >
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  label="Nombre de la entidad"
                  v-model="formE"
                  required
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-btn
                depressed
                class="text-none px-5"
                color="primary"
                @click="saveE"
                >Confirmar</v-btn
              >
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-form v-if="retrieveType == 1">
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
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      :disabled="!editProfile"
                      v-model="form.lastName"
                      :rules="[rules.required]"
                      label="Apellido"
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
                        passwordConfirmationRule,
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
                        passwordConfirmationRule,
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
                  <v-col
                    cols="4"
                    md="12"
                    sm="12"
                    xs="12"
                    @click="cancelChanges"
                  >
                    <v-btn v-if="editProfile" color="primary"> Cancelar </v-btn>
                  </v-col>
                </v-row>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-dialog v-model="dialog" width="300">
      <v-alert
        style="margin-bottom: 0"
        type="error"
        transition="scale-transition"
      >
        Por favor, revise los datos ingresados e inténtelo nuevamente.
      </v-alert>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ProfileComponent",
  data() {
    return {
      load: false,
      dialog: false,
      show: false,
      loading: false,
      valid: true,
      num_id: "",
      tipo_id: "",
      nombre_profesional: "",
      direccion: "",
      barrio: "",
      email: "",
      password: "",
      confirmPassword: "",
      registrado_por: "",
      universidad: "",
      entidadSalud: "",
      formU: "",
      formE: "",
      listU: [],
      listE: [],
      docType: [
        "Cédula de ciudadanía",
        "Cédula de extranjería",
        "Pasaporte",
        "NIT",
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
        documentRules: (value) =>
          value.length == 10|| "El número de documento debe 10 o menos dígitos",
        required: (value) => !!value || "Este campo no puede estar vacio",
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
  created() {
    console.log(this.num_id);
    this.formBeforeEdit = Object.assign({}, this.form);
  },
  mounted() {
    this.initialData();
  },
  computed: {
    formUniversidad: {
      get() {
        return this.universidad === "Otra universidad..." ? true : false;
      },
      set(value) {
        this.universidad = value;
      },
    },
    formEntidad: {
      get() {
        return this.entidadSalud === "Otra entidad de salud..." ? true : false;
      },
      set(value) {
        this.entidadSalud = value;
      },
    },
    retrieveType() {
      return this.$store.getters.retrieveUser.type_user;
    },
    passwordConfirmationRule() {
      return (
        this.form.password === this.form.confirmPassword ||
        "Las contraseñas deben coincidir"
      );
    },
  },
  methods: {
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
    saveU() {
      this.listU.push(this.formU);
      this.universidad = this.formU;
    },
    saveE() {
      this.listE.push(this.formE);
      this.entidadSalud = this.formE;
    },
    initialData: function () {
      if (this.$store.getters.retrieveUser.type_user == 1) {
        axios
          .get("funcionario/" + this.$store.getters.retrieveUser.id_user, {
            headers: {
              Authorization: "Token " + this.$store.getters.retrieveUser.token,
            },
          })
          .then((res) => {
            this.form.firstName = res.data[0].nombre_funcionario;
            this.form.lastName = res.data[0].apellido_funcionario;
            this.form.email = res.data[0].email;
            this.form.password = res.data[0].contrasenia;
            this.form.confirmPassword = res.data[0].contrasenia;
          });
      } else {
        axios
          .get("universidad/", {
            headers: {
              Authorization: "Token " + this.$store.getters.retrieveUser.token,
            },
          })
          .then((response) => {
            for (let universidades of response.data) {
              this.listU.push(universidades.nombre_universidad);
            }
            this.listU.push("Otra universidad...");
          });
        axios
          .get("entidad/", {
            headers: {
              Authorization: "Token " + this.$store.getters.retrieveUser.token,
            },
          })
          .then((response) => {
            for (let entidades of response.data) {
              this.listE.push(entidades.nombre_entidad);
            }
            this.listE.push("Otra entidad de salud...");
          });
        axios
          .get("profesional/" + this.$store.getters.retrieveUser.id_user, {
            headers: {
              Authorization: "Token " + this.$store.getters.retrieveUser.token,
            },
          })
          .then((res) => {
            this.num_id = res.data[0].num_id;
            this.tipo_id = this.docType[res.data[0].tipo_id];
            this.nombre_profesional = res.data[0].nombre_profesional;
            this.direccion = res.data[0].direccion;
            this.barrio = res.data[0].barrio;
            this.registrado_por = res.data[0].registrado_por;
            this.universidad = this.listU[res.data[0].id_universidad - 1];
            this.entidadSalud = this.listE[res.data[0].id_entidadsalud - 1];
            this.email = res.data[0].email;
            this.password = res.data[0].contrasenia;
            this.confirmPassword = res.data[0].contrasenia;
          });
      }
    },
    cancelChanges: function () {
      this.initialData();
      this.editProfile = false;
    },
    saveChange(evt) {
      evt.preventDefault();
      if ((this.$store.getters.retrieveUser.type_user == 1)) {
        axios
          .put(
            "actualizarfuncionario/",
            {
              id_funcionario: this.$store.getters.retrieveUser.id_user,
              nombre_funcionario: this.form.firstName,
              apellido_funcionario: this.form.lastName,
              email: this.form.email,
              contrasenia: this.form.password,
            },
            {
              headers: {
                Authorization:
                  "Token " + this.$store.getters.retrieveUser.token,
              },
            }
          )
          .then((response) => {
            this.$store.commit("assignDataUser", {
              id_user: this.$store.getters.retrieveUser.id_user,
              name: this.form.firstName,
              email: this.form.email,
              token: this.$store.getters.retrieveUser.token,
              refreshToken: this.$store.getters.retrieveUser.refreshToken,
              type_user: this.$store.getters.retrieveUser.type_user,
            });
            this.editProfile = false;
          })
          .catch((error) => {
            console.log(error);
          });
      } else if(this.$store.getters.retrieveUser.type_user == 2){
        axios.put(
          "actualizarprofesional/",
          {
            num_id: parseInt(this.num_id),
            tipo_id: this.docType.indexOf(this.tipo_id),
            nombre: this.nombre_profesional,
            direccion: this.direccion,
            barrio: this.barrio,
            universidad: this.universidad,
            entidadSalud: this.entidadSalud,
            email: this.email,
            contrasenia: this.password,
          },
          {
            headers: {
              Authorization: "Token " + this.$store.getters.retrieveUser.token,
            },
          }
        )
        .then(response=>{
            this.$store.commit("assignDataUser", {
              id_user: this.$store.getters.retrieveUser.id_user,
              name: this.nombre_profesional,
              email: this.email,
              token: this.$store.getters.retrieveUser.token,
              refreshToken: this.$store.getters.retrieveUser.refreshToken,
              type_user: this.$store.getters.retrieveUser.type_user,
            });
            this.editProfile = false;
        })
        .catch(error=>{
          console.log(error)
        })
      }
    },
  },
};
</script>

<template>
  <v-row class="d-flex" align="center" justify="center">
    <v-col cols="12" md="8">
      <v-data-table
        :headers="headers"
        :items="profesionals"
        :items-per-page="5"
        class="elevation-1"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            fas fa-edit
          </v-icon>
          <v-icon small @click="deleteItem(item)"> fas fa-trash-alt </v-icon>
        </template>
      </v-data-table>
      <v-dialog v-model="dialog" fullscreen persistent>
        <v-row class="d-flex" align="center" justify="center">
          <v-col cols="12" sm="8" md="6">
            <v-card class="elevation-12 __b-20 pa-4">
              <v-card-text>
                <v-form>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="Nombre"
                        v-model="editedItem.nombre_profesional"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6">
                      <v-select
                        label="Tipo de documento"
                        v-model="editedItem.tipo_id"
                        :items="docType"
                      >
                      </v-select>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="editedItem.num_id"
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
                        v-model="editedItem.direccion"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        label="Barrio"
                        v-model="editedItem.barrio"
                        :rules="[rules.required]"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-select
                        label="Universidad"
                        :items="listU"
                        v-model="editedItem.universidad"
                      ></v-select>
                    </v-col>
                    <v-col>
                      <v-select
                        label="Entidad de Salud"
                        :items="listE"
                        v-model="editedItem.entidadSalud"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="Correo Electrónico"
                        v-model="editedItem.email"
                        :rules="[rules.required, rules.emailRules]"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        label="Contraseña"
                        v-model="editedItem.password"
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
                        v-model="editedItem.confirmPassword"
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
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                          Cancel
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="save">
                          Save
                        </v-btn>
                      </v-card-actions>
                    </v-col>
                  </v-row>
                </v-form>
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
            <v-dialog v-model="formUniversidad" max-width="600px">
              <v-card class="elevation-12 __b-20 pa-4">
                <v-card-title
                  ><span class="headline"
                    >Registro de Universidad</span
                  ></v-card-title
                >
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col>
                        <v-text-field
                          label="Nombre universidad"
                          v-model="editedItem.universidad"
                          required
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-btn
                          depressed
                          class="text-none px-5"
                          color="primary"
                          @click="saveU"
                          >Confirmar</v-btn
                        >
                      </v-col>
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
                          v-model="editedItem.entidadSalud"
                          required
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col>
                        <v-btn
                          depressed
                          class="text-none px-5"
                          color="primary"
                          @click="saveE"
                          >Confirmar</v-btn
                        >
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-dialog>
    </v-col>
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
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "ProfesionalesComponent",
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      dialog_Error: false,
      num_id: "",
      formU: "",
      formE: "",
      listU: [],
      listE: [],
      valid: false,
      show: false,
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
      editedIndex: -1,
      editedItem: {
        num_id: "",
        tipo_id: "",
        nombre_profesional: "",
        direccion: "",
        barrio: "",
        registrado_por: "",
        universidad: "",
        entidadSalud: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      headers: [
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
          value: "nombre_profesional",
        },
        {
          text: "Email",
          align: "center",
          sortable: false,
          value: "email",
        },
        {
          text: "Opciones",
          value: "actions",
          sortable: false,
        },
      ],
      profesionals: [],
    };
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  created() {
    this.initialData();
  },
  computed: {
    formUniversidad: {
      get() {
        return this.editedItem.universidad === "Otra universidad..."
          ? true
          : false;
      },
      set(value) {
        this.editedItem.universidad = value;
      },
    },
    formEntidad: {
      get() {
        return this.editedItem.entidadSalud === "Otra entidad de salud..."
          ? true
          : false;
      },
      set(value) {
        this.editedItem.entidadSalud = value;
      },
    },
    passwordConfirmationRule() {
      return (
        this.editedItem.password === this.editedItem.confirmPassword ||
        "Las contraseñas deben coincidir"
      );
    },
  },
  methods: {
    initialData() {
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
        .get("profesional/", {
          headers: {
            Authorization: "Token " + this.$store.getters.retrieveUser.token,
          },
        })
        .then((response) => {
          console.log(response.data);
          for (let profesional of response.data) {
            this.profesionals.push(profesional);
          }
        });
    },
    saveU() {
      this.listU.push(this.formU);
      this.universidad = this.formU;
    },
    saveE() {
      this.listE.push(this.formE);
      this.entidadSalud = this.formE;
    },
    editItem(item) {
      this.editedIndex = this.profesionals.indexOf(item);
      this.editedItem = {
        num_id: item.num_id,
        tipo_id: this.docType[item.tipo_id],
        nombre_profesional: item.nombre_profesional,
        direccion: item.direccion,
        barrio: item.barrio,
        registrado_por: item.registrado_por,
        universidad: this.listU[item.id_universidad - 1],
        entidadSalud: this.listE[item.id_entidadsalud - 1],
        email: item.email,
        password: item.contrasenia,
        confirmPassword: item.contrasenia,
      };
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.profesionals.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios
        .delete(
          "borrarprofesional/" + this.profesionals[this.editedIndex].num_id,
          {
            headers: {
              Authorization: "Token " + this.$store.getters.retrieveUser.token,
            },
          }
        )
        .then(() => {
          this.profesionals.splice(this.editedIndex, 1);
          this.closeDelete();
        })
        .catch((error) => {
          console.log(error);
        });
    },

    close() {
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
    save() {
      axios
        .put(
          "actualizarprofesional/",
          {
            num_id: parseInt(this.editedItem.num_id),
            tipo_id: this.docType.indexOf(this.editedItem.tipo_id),
            nombre: this.editedItem.nombre_profesional,
            direccion: this.editedItem.direccion,
            barrio: this.editedItem.barrio,
            universidad: this.editedItem.universidad,
            entidadSalud: this.editedItem.entidadSalud,
            email: this.editedItem.email,
            contrasenia: this.editedItem.password,
          },
          {
            headers: {
              Authorization: "Token " + this.$store.getters.retrieveUser.token,
            },
          }
        )
        .then(() => {
          if (this.editedIndex > -1) {
            Object.assign(this.profesionals[this.editedIndex], this.editedItem);
          } else {
            this.profesionals.push(this.editedItem);
          }
          this.close();
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="sass" scoped>
</style>
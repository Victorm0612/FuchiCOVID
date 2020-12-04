<template>
  <v-row class="d-flex" align="center" justify="center">
    <v-col cols="12" md="8">
      <v-data-table
        :headers="headers"
        :items="medicamentos"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Medicamentos</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Nuevo Medicamento
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          :disabled="true"
                          v-model="editedItem.id_gasto"
                          label="ID"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          :items="nombres"
                          v-model="editedItem.nombre_medicamento"
                          label="Medicamento"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-select
                          :items="laboratorios"
                          v-model="editedItem.nombre_laboratorio"
                          label="Laboratorio"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.reserva"
                          label="Reserva"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancelar
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save">
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="headline"
                  >Está seguro que desea eliminarlo?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            fas fa-edit
          </v-icon>
          <v-icon small @click="deleteItem(item)"> fas fa-trash-alt </v-icon>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import axios from "axios";
export default {
  name: "MedicamentosComponent",
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "#",
        align: "center",
        sortable: true,
        value: "id_gasto",
      },
      { text: "Medicamento", align: "center", value: "nombre_medicamento" },
      { text: "Laboratorio", align: "center", value: "nombre_laboratorio" },
      { text: "Reserva", align: "center", value: "reserva" },
      { text: "Actions", align: "center", value: "actions", sortable: false },
    ],
    laboratorios: ["Pharma", "LabCoxi", "LabMen", "Rebaja"],
    nombres: ["Mixamorranilo300", "Choclometanol400", "Chichanosol800"],
    medicamentos: [],
    editedIndex: -1,
    editedItem: {
      id_gasto: "",
      nombre_medicamento: "",
      nombre_laboratorio: "",
      reserva: 0,
    },
    defaultItem: {
      id_gasto: "",
      nombre_medicamento: "",
      nombre_laboratorio: "",
      reserva: 0,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Nuevo Medicamento"
        : "Editar Medicamento";
    },
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
    this.initialize();
  },

  methods: {
    initialize() {
      axios
        .get("gastomedicamentos/", {
          headers: {
            Authorization: "Token " + this.$store.getters.retrieveUser.token,
          },
        })
        .then((response) => {
          for (let med of response.data) {
            this.medicamentos.push({
              id_gasto: med.id_gasto,
              nombre_medicamento: this.nombres[med.id_med - 1],
              nombre_laboratorio: this.laboratorios[med.id_lab - 1],
              reserva: med.reserva,
            });
          }
        });
    },

    editItem(item) {
      this.editedIndex = this.medicamentos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.medicamentos.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios
        .delete("borrargastomedicamento/" + this.editedItem.id_gasto, {
          headers: {
            Authorization: "Token " + this.$store.getters.retrieveUser.token,
          },
        })
        .then(() => {
          this.medicamentos.splice(this.editedIndex, 1);
          this.closeDelete();
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
      if (this.editedIndex === -1) {
        //id_gasto, id_med, id_lab, reserva
        axios
          .post(
            "registrargastomedicamento/",
            {
              id_med:
                this.nombres.indexOf(this.editedItem.nombre_medicamento) + 1,
              id_lab:
                this.laboratorios.indexOf(this.editedItem.nombre_laboratorio) +
                1,
              reserva: parseInt(this.editedItem.reserva),
            },
            {
              headers: {
                Authorization:
                  "Token " + this.$store.gettters.retrieveUser.token,
              },
            }
          )
          .then(() => {
            if (this.editedIndex > -1) {
              Object.assign(
                this.medicamentos[this.editedIndex],
                this.editedItem
              );
            } else {
              this.medicamentos.push(this.editedItem);
            }
            this.close();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        axios
          .put(
            "actualizargastomedicamento/",
            {
              id_gasto: this.editedItem.id_gasto,
              id_med:
                this.nombres.indexOf(this.editedItem.nombre_medicamento) + 1,
              id_lab:
                this.laboratorios.indexOf(this.editedItem.nombre_laboratorio) +
                1,
              reserva: parseInt(this.editedItem.reserva),
            },
            {
              headers: {
                Authorization:
                  "Token " + this.$store.getters.retrieveUser.token,
              },
            }
          )
          .then(() => {
            if (this.editedIndex > -1) {
              Object.assign(
                this.medicamentos[this.editedIndex],
                this.editedItem
              );
            } else {
              this.medicamentos.push(this.editedItem);
            }
            this.close();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  },
};
</script>
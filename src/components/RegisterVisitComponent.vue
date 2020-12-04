<template>
  <div>
    <v-form v-model="valid">
      <v-row class="d-flex" align="center" justify="center">
        <v-col cols="12" sm="8" md="6">
          <v-card class="elevation-12 __b-20 pa-4">
            <v-card-text>
              <v-row>
                <v-col cols="12" md="12">
                  <v-select
                    label="Paciente"
                    :items="pacientes"
                    v-model="id_paciente"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="4">
                  <v-select
                    label="Medicamento"
                    :items="medicamentos"
                    v-model="med"
                    @change="isStock"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="4">
                  <v-select
                    label="Laboratorio"
                    :items="laboratorios"
                    v-model="lab"
                    @change="isStock"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    label="Reserva"
                    readonly
                    v-model="reserva"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    label="# solicitar"
                    v-model="cantidad_pedir"
                    :rules="[rules.required]"
                    @keypress="isNumber()"
                  ></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="3">
                  <v-text-field
                    label="Temperatura"
                    v-model="temperatura"
                    :rules="[rules.required]"
                    @keypress="isNumber()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="2">
                  <v-text-field
                    label="Peso"
                    v-model="peso"
                    :rules="[rules.required]"
                    @keypress="isNumber()"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                  <v-text-field
                    label="Presión del paciente"
                    v-model="presion"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" md="3">
                  <v-text-field
                    label="Dosis suministrada"
                    v-model="dosis"
                    :rules="[rules.required]"
                  ></v-text-field>
                </v-col>
                <v-row>
                  <v-col cols="12" md="12">
                    <v-text-field
                      label="Observaciones"
                      v-model="observacion"
                      :rules="[rules.required]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-row>
              <v-row>
                <v-col cols="12" md="12">
                  <v-btn
                    :disabled="!valid"
                    depressed
                    class="text-none px-5"
                    color="primary"
                    elevation="10"
                    @click="saveUser"
                    >Registrar Visita
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
    <v-overlay :value="load">
      <v-progress-circular
        :width="5"
        indeterminate
        color="white"
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-dialog v-model="dialogStock" max-width="700px">
      <v-card>
        <v-card-title primary-title class="justify-center text--accent-2 headline">Desea pedir {{med}} del laboratorio {{lab}}?</v-card-title>
        <v-card-text>
        </v-card-text>
        <v-card-actions>
                    <v-row>
            <v-col>
              <v-btn  color="primary" @click="reveal = true">Aceptar</v-btn>
            </v-col>
            <v-col>
              <v-btn  color="primary" @click="dialogStock = false">Cancelar</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
        <v-expand-transition>
          <v-card
          v-if="reveal"
                  class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%;">
            <v-card-text class="pb-0">
              <v-text-field label="Cantidad" v-model="solicitud"></v-text-field>
              <v-btn color="primary" @click="sendStock">Pedir</v-btn>
            </v-card-text>
          </v-card>
        </v-expand-transition>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "RegisterVisitComponent",
  data() {
    return {
      solicitud: "",
      reveal: false,
      dialogStock: false,
      load: false,
      dialog: false,
      valid: false,
      id_medicamento: "",
      id_paciente: "",
      temperatura: "",
      peso: "",
      presion: "",
      dosis: "",
      observacion: "",
      med: "",
      lab: "",
      reserva: "",
      cantidad_pedir: "",
      laboratorios: ["Pharma", "LabCoxi", "LabMen", "Rebaja"],
      reservas: [],
      pacientes: [],
      ids_pacientes: [],
      medicamentos: ["Mixamorranilo300", "Choclometanol400", "Chichanosol800"],
      rules: {
        required: (value) => !!value || "Este campo no puede estar vacio",
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
    axios
      .get("paciente/", {
        headers: {
          Authorization: "Token " + this.$store.getters.retrieveUser.token,
        },
      })
      .then((response) => {
        for (let paciente of response.data) {
          this.pacientes.push(paciente.nombre_completo);
          this.ids_pacientes.push(paciente.num_id);
        }
      });
  },
  methods: {
    sendStock(){
      axios.post('registrargastomedicamento/',{
        id_med: this.medicamentos.indexOf(this.med)+1,
        id_lab: this.laboratorios.indexOf(this.lab)+1,
        reserva: parseInt(this.solicitud)
      },{headers:{Authorization: 'Token '+this.$store.getters.retrieveUser.token}})
      .then(response=>{
        this.reserva =this.solicitud;
        this.dialogStock = false;
        this.reveal = false;
      })
    },
    isStock() {
      if (this.med !== "" && this.lab !== "") {
        axios
          .post(
            "existencia/",
            {
              medicamento: this.med,
              laboratorio: this.lab,
            },
            {
              headers: {
                Authorization:
                  "Token " + this.$store.getters.retrieveUser.token,
              },
            }
          )
          .then((response) => {
            if (response.data.length == 0) {
              this.reserva = 0;
              this.dialogStock = true;
            } else {
              this.id_medicamento = response.data[0].id_gast;
              this.reserva = response.data[0].existence;
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
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
    saveUser() {
      axios
        .put(
          "actualizargastomedicamento/",
          {
            id_gasto: this.id_medicamento,
            id_med: this.medicamentos.indexOf(this.med)+1,
            id_lab: this.laboratorios.indexOf(this.lab)+1,
            reserva: parseInt(this.reserva) - parseInt(this.cantidad_pedir),
          },
          {
            headers: {
              Authorization: "Token " + this.$store.getters.retrieveUser.token,
            },
          }
        )
        .then(response=>{
            console.log(response)
        })
        .catch(error=>{
            console.log('error')
        });
                 axios
            .post(
              "registrarvisita/",
              {
                id_paciente: parseInt(
                  this.ids_pacientes[this.pacientes.indexOf(this.id_paciente)]
                ),
                id_medicamento: parseInt(this.id_medicamento),
                temperatura: this.temperatura,
                peso: this.peso,
                presion: this.presion,
                dosis: this.dosis,
                observacion: this.observacion,
              },
              {
                headers: {
                  Authorization:
                    "Token " + this.$store.getters.retrieveUser.token,
                },
              }
            )
            .then(() => {
              this.load = !this.load;
              setTimeout(() => {
                this.$store.commit("setModuleTitle", "Visitas");
              }, 1500);
            })
            .catch((error) => {
              console.log(error);
              this.dialog = true;
            });
    },
  },
};
</script>

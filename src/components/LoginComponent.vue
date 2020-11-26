<template>
  <v-container id="login" class="fill-height" fluid>
    <v-row  class="d-flex" align="center" justify="center">
      <v-col cols="12" sm="8" md="3">
        <v-card  class="elevation-12 __b-20">
          <v-card-text>
            <v-container fluid>
              <v-row>
                <v-col cols="12" class="text-center">
                  <h3 class="headline">
                    Iniciar Sesión
                  </h3>
                  <h4 class="subtitle-1 mb-3">
                    ¡Bienvenido!
                  </h4>
                </v-col>
              </v-row>
              <v-row align="center">
                <v-col cols="12" class="aling-center">
                  <v-form>
                    <v-text-field
                      label="Correo electrónico"
                      type="email"
                      outlined
                      dense
                      :rules="[rules.required, rules.email]"
                      v-model="email"
                    >
                    </v-text-field>
                    <v-text-field
                      label="Contraseña"
                      outlined
                      dense
                      :rules="[rules.required, rules.password]"
                      :append-icon="show ? 'fas fa-eye' : 'fas fa-eye-slash'"
                      v-model="password"
                      :type="show ? 'text' : 'password'"
                      @click:append="show = !show"
                      @keyup.enter="login"
                    >
                    </v-text-field>
                    <div class="d-flex">
                      <v-spacer />
                      <v-btn
                        color="primary"
                        class="text-none px-2"
                        @click="login"
                      >
                        Iniciar Sesión
                      </v-btn>
                    </div>
                  </v-form>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        <v-dialog v-model="dialog" width="350">
          <v-alert
            style="margin-bottom: 0; text-align: start;"
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
  </v-container>
</template>

<script>
    export default {
        name: 'LoginComponent',
  data() {
    return {
      step: 1,
      email: "",
      password: "",
      show: false,
      dialog: false,
      load: false,
      rules: {
        required: value => !!value || "Complete el campo.",
        password: value =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[*!@#%&])(?=.{8,})/.test(
            value
          ) ||
          "*Recuerda que tu clave tiene: Mínimo 8 caracteres. *Mínimo una letra minúscula. *Mínimo una letra mayúscula. *Mínimo un número. *Mínimo un caracter especial[!@#%&*].",
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "e-mail inválido.";
        }
      }
    };
  },
  watch: {
    overlay(val) {
      val &&
        setTimeout(() => {
          this.load = false;
        }, 3000);
    }
  },
  methods: {   
    login(){

        this.dialog=true;
    },
    moveToPage: function(route) {
      this.load = !this.load;
      setTimeout(() => {this.$router.push({ name: route });}, 3000);
    }
  }
};
</script>

<style lang="scss">
#login{
    height: 100vh;
    background-image: linear-gradient(to bottom, rgba(2, 5, 22, 0.52), rgba(0, 0, 0, 0.3)), url('../assets/medicos.png');
    background-size: cover;
}
</style>
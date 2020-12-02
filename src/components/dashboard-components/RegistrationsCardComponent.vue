<template>
  <v-card class="mt-4 mx-auto" max-width="400" elevation="10">
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="orange"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :labels="labels"
        :value="value"
        color="white"
        line-width="2"
        padding="16"
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">
        Registros de usuarios
      </div>
      <div class="subheading font-weight-light grey--text">
        <v-icon color="green" small> fas fa-arrow-up </v-icon>
        &nbsp;<span class="green--text">55%</span>&nbsp;
        incremento de registros diarios
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>
        fas fa-history
      </v-icon>
      <span class="caption black--text font-weight-light"
        >último registro hace 26 minutos</span
      >
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "RegistrationsCardComponent",
  data: () => ({
    labels: ["L", "M", "MI", "J", "V", "S", "D", "9pm"],
    value: [200, 675, 410, 390, 310, 460, 250]
  })
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
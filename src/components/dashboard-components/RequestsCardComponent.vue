<template>
  <v-card class="mt-4 mx-auto" max-width="400" elevation="10">
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="red"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline
        :labels="labels"
        :value="value"
        color="white"
        line-width="2"
        padding="16"
        type='bars'
      ></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">
        Solicitudes de cotización
      </div>
      <div class="subheading font-weight-light grey--text">
        Rendimiento de la última campaña
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>
        fas fa-history
      </v-icon>
      <span class="caption black--text font-weight-light"
        >última solicitud de cotización hace 12 minutos</span
      >
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "RequestsCardComponent",
  data: () => ({
    labels: ["12am", "3am", "6am", "9am", "12pm", "3pm", "6pm", "9pm"],
    value: [200, 675, 410, 390, 310, 460, 250, 240]
  })
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
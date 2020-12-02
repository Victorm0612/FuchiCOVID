<template>
  <v-card class="mt-4 mx-auto" max-width="400" elevation="10">
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="#0D47A1"
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
        Cotizaciones Realizadas
      </div>
      <div class="subheading font-weight-light grey--text">
        Índice de cotizaciones realizadas
      </div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>
        fas fa-history
      </v-icon>
      <span class="caption black--text font-weight-light"
        >última cotización realizada hace 3 horas</span
      >
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "QuotationCardComponent",
  data: () => ({
    labels: ["EN", "FE", "MR", "AB", "MY", "JN", "JL", "AG", "SE", "OC", "NV", "DC"],
    value: [200, 500, 410, 390, 310, 460, 250, 300, 245, 399, 233, 645]
  })
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
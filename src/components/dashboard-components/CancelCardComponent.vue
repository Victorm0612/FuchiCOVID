<template>
  <v-card class="mt-4 mx-auto" max-width="250" elevation="10">
    <v-sheet
      class="v-sheet--offset mx-auto"
      color="error"
      elevation="12"
      height="80"
      width="80"
    >
      <v-icon class="icon-card">
        fas fa-times
      </v-icon>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">
        Citas canceladas
      </div>
      <div class="title font-weight-light mb-2">
        5
      </div>
      <v-divider color="grey" class="my-2"></v-divider>
      <v-icon class="mr-2" small>
        fas fa-history
      </v-icon>
      <span class="caption black--text font-weight-light"
        >último mes</span
      >
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CancelCardComponent",
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
.icon-card {
  font-size: 38px !important;
  padding-top: 25%;
}
</style>
<template>
  <div class="carousel">
    <v-carousel
      cycle
      height="757"
      hide-delimiter-background
      show-arrows-on-hover
    >
      <v-carousel-item
        v-for="(slide, i) in slides"
        :key="i"
        :src="require('@/assets/' + slide.src + '.jpg')"
      >
        <v-row class="fill-height title" align="center" justify="center">
          <div class="display-3">
            <h1 style="font-size:1em;">{{ slide.title }}</h1>
            </div>
        </v-row>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      slides: [
        {
          src: "Slider1",
          title: "¡Protege a los tuyos!",
        },
        {
          src: "Slider2",
          title: "Usa tapabocas y lávate las manos.",
        },
        {
          src: "Slider3",
          title: "No salgas de tu casa si no es necesario.",
        },
      ],
    };
  },
};
</script>
<style lang="scss">
.carousel {
  position: relative;



  .v-image__image {
    &:before {
      content: "";
      background: rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
  }
}
.display-3 {
  text-shadow: 1px 4px 2px black;
  
  margin-left: 2rem;
  margin-right: 2rem;
}
</style>
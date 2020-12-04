<template>
    <div>
        <GmapMap
            :center="myCoordinates"
            :zoom="zoom"
            style="width:860px; height:480px; margin: 32px auto;"
            ref="mapRef"
            @dragend="handleDrag"
        >
          <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :label="m.label"
    :clickable="true"
    :draggable="false"
    @click="center=m.position"
  />
        </GmapMap>
    </div>
</template>
<script>
import axios from 'axios';
    export default {
        name:'Map',
        data() {
            return {
                markers: [],
                map: null,
                myCoordinates: {
                    lat: 0,
                    lng: 0
                },
                zoom: 50
            }
        },
        created() {
            axios.get('paciente/',{
                headers:{
                    Authorization: 'Token '+this.$store.getters.retrieveUser.token 
                }
            })
            .then(response=>{
                for(let paciente of response.data){
                    let arrayGeoL = paciente.geolocalizacion.split(" ");
                    this.markers.push(
                        {
                            label: paciente.nombre_completo,
                            position: {lat: parseInt(arrayGeoL[0]), lng: parseInt(arrayGeoL[1])}
                        }
                        )
                }
            })
            // does the user have a saved center? use it instead of the default
            if(localStorage.center) {
                this.myCoordinates = JSON.parse(localStorage.center);
            } else {
                // get user's coordinates from browser request
                this.$getLocation({})
                    .then(coordinates => {
                        this.myCoordinates = coordinates;
                        this.markers.push({label: 'Yo', position: {lat: this.myCoordinates.lat, lng: this.myCoordinates.lng}})
                    })
                    .catch(error => alert(error));
            }
            // does the user have a saved zoom? use it instead of the default
            if(localStorage.zoom) {
                this.zoom = parseInt(localStorage.zoom);
            }
        },
        mounted() {
            // add the map to a data object
            this.$refs.mapRef.$mapPromise.then(map => this.map = map);
        },
        methods: {
            handleDrag() {
                // get center and zoom level, store in localstorage
                let center = {
                    lat: this.map.getCenter().lat(),
                    lng: this.map.getCenter().lng()
                };
                let zoom = this.map.getZoom();
                localStorage.center = JSON.stringify(center);
                localStorage.zoom = zoom;
            }
        },
        computed: {
            mapCoordinates() {
                if(!this.map) {
                    return {
                        lat: 0,
                        lng: 0
                    };
                }
                return {
                    lat: this.map.getCenter().lat().toFixed(4),
                    lng: this.map.getCenter().lng().toFixed(4)
                }
            }
        }
    }
</script>
<template>
    <div id="info">
        <div id="video">
            <LazyYoutubeVideo src="https://www.youtube.com/embed/GPOQjzZGoeQ" />
        </div>
    </div>
</template>

<script>
    export default {
        name: 'CovidInfoComponent',
        data(){
            return{

            }
        }
    }
</script>

<style lang="scss">
#info{
    height: 100vh;
    background-image: linear-gradient(to bottom, rgba(2, 5, 22, 0.52), rgba(0, 0, 0, 0.3)), url('../assets/covid.jpg');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}
#video{
    width: 1000px;
}
</style>
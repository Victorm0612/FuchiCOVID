<template>
    <div>

    </div>
</template>

<script>
    export default {
        created(){
            this.$store.dispatch('destroyToken')
            this.$router.push({name: 'Home'})
        }
    }
</script>

<style lang="sass" scoped>

</style>
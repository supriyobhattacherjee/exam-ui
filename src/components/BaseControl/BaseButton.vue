<template>
    <button class="btn btn-info btn-font" :class="mode">
        <slot></slot>
    </button>
</template>
<script>
export default {
    props:['mode'],
    data() {
        return {
           
        }
    },
    watch:{
    },
    methods: {
        
    },
}
</script>
<style scoped>
    .flat
    {
        background-color: orangered;
    }
    .createLink
    {
        background-color: palegreen;
    }
    .btn-font {
        font-family: 'Orbitron', sans-serif ;
    }

</style>y
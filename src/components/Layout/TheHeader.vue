<template>
    <div class="">
    <!-- <div class="p-5 mb-4 rounded-3 bg-warning"> -->
        <div class="row">
            <!-- <div class="col-6">
                <h1 class="display-5 fw-bold">Examination Portal|</h1>       
            </div> -->
            <div class="col-md-12 d-lg-block" style="height: 12em">
                <img :src="getImageUrl()" class="img-fluid"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        getImageUrl()
        {
            return require('../../assets/images/studentexam.jpg')
        }
    },
    computed: {
        
    },
}
</script>
<style scoped>
    .img-fix-height{
        max-height: 1em;
    }
</style>
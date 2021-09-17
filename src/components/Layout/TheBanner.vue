<template>
    <div class="row">
        
            <img class="positon-relative " src="../../assets/images/studentexam.jpg" alt="">
            <div class="position-absolute row ">
                <div class="my-5 rounded-3 col-sm-7 offset-5 bg-transparent">
                    <TrialRegistration></TrialRegistration>
                </div>
            </div>
            
    </div>
</template>
<script>
import TrialRegistration from '../User/TrialRegistration.vue'
export default {
    components: {
        TrialRegistration
    }
}
</script>
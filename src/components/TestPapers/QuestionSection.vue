<template>
    <h5>Section Configuration</h5>
    <strong class="text-success">{{message}}</strong>

    <div class="row">
        <div class="col-md-12">
            <Dropdown v-model="selectedSubjectId" :options="subjects" optionValue="testSubjectId" optionLabel="subjectName" 
            @change= "LoadSections" placeholder="Select a Course" />
        </div>
    </div>
    <div class="row my-2">
        <div class="col-md-5">
            <input type="text" class="form-control" name="" v-model="subjectSection.sectionName">
        </div>
        <div class=" col-md-5">
            <base-button class="float-left" @click="SaveSubjectSection">Add Section</base-button>
        </div>
    </div>

    <div v-for="section in subjectSections" :key="section.sectionId">
        {{section.sectionName}}
    </div>
</template>
<script>
import Dropdown from 'primevue/dropdown';
export default {
    components: {
        Dropdown
    },
    data() {
        return {
            subjectName: "",
            subjectSection: {subjectId: 0, sectionName: ""},
            subjectSections: [],
            selectedSubjectSection: {},
            subjects: [],
            selectedSubjectId: 0,
            message: ""

        }
    },
    methods: {
        LoadSections()
        {
            
            const headers = { "Content-Type": "application/json" };
            this.$axios.get(this.$appconfiguration.API_BASE_URL_PATH + "question/GetSubjectSections?subjectId="+ this.selectedSubjectId, { headers })
            .then(respose => this.subjectSections = respose.data.responseObject)
        },
        LoadSubjects()
        {
            const headers = { "Content-Type": "application/json" };
            this.$axios.get(this.$appconfiguration.API_BASE_URL_PATH + "test/GetSubjects", { headers })
            .then(response => this.subjects = response.data)
        },
        SaveSubjectSection()
        {
            this.subjectSection.subjectId = this.selectedSubjectId;
            this.$axios
                .post(this.$appconfiguration.API_BASE_URL_PATH + "question/SaveSubjectSection", this.subjectSection)
                .then(response => this.message = response.data.message)
                .then(this.LoadSections())
        }
    },

    mounted(){
        this.LoadSubjects();
    },
}
</script>
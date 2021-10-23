<template>
<div class="container">
    <br /><br />
    <div class="row">
        <div>
            <h2>Edit Student</h2>
            <br />
        </div>
    </div>
    <div class="container">

        <div class="form-group row">
            <div class="col">
                <div class="form-group">
                    <label for="title">studentId:</label>
                    <input type="text" v-model="student.studetId" class="form-control" id="studentId" placeholder="Enter StudentId" name="studentId">
                </div>
            </div>
            <div class="col">
                <div class="form-group">
                    <label for="author">studentName:</label>
                    <input type="text" v-model="student.studentName" class="form-control" id="atudentName" placeholder="Enter StudentName" name="studentName">
                </div>
            </div>
        </div>

        <button class="btn btn-primary" v-on:click="SaveStudent()">Save</button>&nbsp;
        <button class="btn btn-danger" v-on:click="Cancel()">Cancel</button>

    </div>
    <br /><br />
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "StudentEdit",
    data() {
        return {
            student: {}
        }
    },
    methods: {
        async SaveStudent() {

            if (confirm("Do you want to save?")) {

                await axios.put(this.$apiUrl + "student/" + this.$route.body.studentName , this.student);
                await this.$router.push('/student'); 
            }

        },
        Cancel() {
            if (confirm("Do you want to cancel editing this student?")) {
                this.$router.push('/student');
            }

        }
    },
    async mounted() {

        //Code for get book detail from API
        const response = await axios.get(this.$apiUrl + "/student" + this.$route.body.studentId);
        this.student = await response.data.data[0];

    },
}
</script>

<style scoped>
.book-item {
    background: #f4f4f4;
    padding: 10px;
    border-bottom: 1px #ccc dotted;
}

label {
    /* Other styling... */
    text-align: right;
    clear: both;
    float: left;
    margin-right: 15px;
}
</style>
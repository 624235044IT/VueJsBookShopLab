<template>
<div class="student-item">
    <br />

    <div class="container ">
        <div class="row">
            <div class="col-lg-4">
                <img v-bind:src="student.thumbnailUrl" width="200px" /><br />
            </div>
            <div class="col-lg-8">
                <div class="row">
                    <div class="col-2 d-flex justify-content-start"><b>studentId:</b></div>
                    <div><br/>{{student.studentId}}</div>
                </div>
                <div class="row">
                    <div class="col-2 d-flex justify-content-start"><b>studentName:</b></div>
                    <div><br/>{{student.studentName}}</div>
                </div>
             
                
                <button class="btn btn-primary btn-sm" v-on:click="EditStudent(Student.studentId)" >Edit Student</button>&nbsp;
                <br/><br/>
                <button class="btn btn-danger btn-sm" v-on:click="DeleteStudent(Student.studentId)"> Delete student</button>
                <br />
            </div>
        </div>
    </div>
    <br />
</div>
</template>

<script>
export default {
    name: "StudentItem",
    props: ["student"],
    methods: {
        EditStudent(studentId) {
            
            
            this.$router.push('/editstudent/' + studentId)
        },
        DeleteStudent(studentId) {

            if (confirm("Do you want to delete this student?")) {

                this.$emit('delete:student',studentId);


            }

        },
    }
}
</script>

<style scoped>
.book-item {

    padding: 10px;
    border-bottom: 1px #ccc dotted;
}
</style>

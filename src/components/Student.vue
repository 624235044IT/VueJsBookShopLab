<template>
<div>
    <HeaderStudent v-on:search:studentId="SearchStudent" />
    <br /><br />
    <div class="container">
        <div class="row">
            <div v-bind:key="student.studentId" v-for="student in StudentInSearch">
                <StudentItem v-bind:student="student" v-on:delete:student="DeleteStudent" />
            </div>

        </div>
    </div>
    <br /><br />
</div>
</template>

<script>
import StudentItem from './StudentItem';
import HeaderStudent from './HeaderStudent';
import axios from "axios";

export default {

    name: "Student",
    components: {
        StudentItem,
        HeaderStudent
    },
    data() {
        return {
            search: "",
            student: [],
            //studentsearch: []
        }
    },
    async created() {

    },
    async mounted() {
        //Code for GET students from API
        const response = await axios.get(this.$apiUrl + "student");
        this.student = await response.data.data;
        
    },
    methods: {
        SearchStudents: function (searchvalue) {
            this.search = searchvalue;
        },
        async DeleteStudent(studentId) {
             await axios.delete(this.$apiUrl + "student/" + studentId);
             var studentIndex=this.student.findIndex(x => x.studentId === studentId);
             this.student.splice(studentIndex, 1);
             this.studentsearch = this.student;
        },

    },
    computed: {

        StudentInSearch: function () {
            if (this.search != "") {
                return this.student.filter((student) => {
                    return student.studentId(this.search)
                });

            } else {
                return this.student;
            }
        }

    },
    filters: {

    }
}
</script>

<style>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
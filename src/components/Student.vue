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
            studentsearch: [],
        };
    },
    async created() {

    },
    async mounted() {
        let accessToken = await localStorage.getItem("accessToken");

    if (await accessToken) {
      try {
        //Code for GET students from API
        const response = await axios.get(this.$apiUrl + "student",{ headers: {"Authorization" : `bearer ${accessToken}`} });
        this.student = await response.data.data;
        //this.booksearch = this.books
      } catch {
        this.$router.push("/login");
      }
    } else {
      this.$router.push("/login");
    }
        
    },
    methods: {
        SearchStudents: function (searchvalue) {
            this.search = searchvalue;
        },
        async DeleteStudent(studentId) {

        let accessToken = await localStorage.getItem("accessToken");

           if (await accessToken) {
               try{

             await axios.delete(this.$apiUrl + "student/" + studentId);
             var studentIndex=this.student.findIndex(x => x.studentId === studentId);
             this.student.splice(studentIndex, 1);
             this.studentsearch = this.student;
        }catch{
            this.$router.push("/login");
        }
           }else{
              this.$router.push("/login"); 
           }
        },

    },
    computed: {

        StudentInSearch: function () {
            if (this.search != "") {
                return this.student.filter((student) => {
                    return student.studentId.toString().includes(this.search.toString())
                });

            } else {
                return this.student;
            }
        },

    },
    filters: {},
};
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
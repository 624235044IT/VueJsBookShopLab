<template>
<div>
    <Header v-on:search:booktitle="SearchBook" />
    <br /><br />
    <div>
        <div class="row">
            <div class="w-100" v-bind:key="book.bookid" v-for="book in BookInSearch">
                <BookItem v-bind:book="book" v-on:delete:book="DeleteBook" />
            </div>

        </div>
    </div>
    <br /><br />
</div>
</template>

<script>
import BookItem from './BookItem';
import Header from './Header';

import axios from "axios";


export default {

    name: "Books",
    components: {
        BookItem,
        Header
    },
    data() {
        return {
            search: "",
            categoryid: 0,
            books: []
        }
    },
    async created() {

    },
    async mounted() {
        const response = await axios.get(this.$apiUrl + "books");

        this.books = await response.data.data;
        this.booksearch = await this.books;

    },
    methods: {
        SearchBook: function (searchvalue, categoryid) {
            this.search = searchvalue;
            this.categoryid = categoryid;
        },
        async DeleteBook(bookid) {
            await axios.delete(this.$apiUrl + "book/" + bookid);
            var bookIndex = this.books.findIndex(x => x.bookid === bookid);
            this.books.splice(bookIndex, 1);
            this.booksearch=this.books;
        },

    },
    computed: {

        BookInSearch: function () {
            let categoryid = this.categoryid;
            var bookfilter = []
            if (this.search != "") {
                bookfilter = this.books.filter((book) => {
                    if (this.search != "") {
                        return book.title.toLowerCase().includes(this.search.toLowerCase())
                    }
                });
            } else {
                bookfilter = this.books
            }
            if (categoryid > 0) {
                return bookfilter.filter((book) => {

                    if (categoryid == 1) {
                        return book.category.includes("Web Development")
                    } else if (categoryid == 2) {
                        return book.category.includes("Internet")
                    } else if (categoryid == 3) {
                        return book.category.includes("Java")
                    } else if (categoryid == 4) {
                        return book.category.includes("Microsoft .NET")
                    } else if (categoryid == 5) {
                        return book.category.includes("Mobile Technology")
                    } else if (categoryid == 6) {
                        return book.category.includes("Programming")
                    } else if (categoryid == 7) {
                        return book.category.includes("Software Engineering")
                    } else if (categoryid == 8) {
                        return book.category.includes("Data Science")
                    }

                });

            } else {
                return bookfilter
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

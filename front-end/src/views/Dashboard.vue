<template>
<div class="admin">
  <h1>Dashboard</h1>
  <div class="dashboard">
    <div class="heading">
      <h2>Add a Task</h2>
    </div>
    <div class="add">
      <div class="form">
        <label for="title" v-on:keyup.enter="upload()">Task Name:</label>
        <input v-model="title" placeholder="Task">
        <br>
        <label for="category">Category:  </label>
        <select v-model="category" name="category" class="category">
          <option v-for="category in categories" :key="category.id">{{category.category}}</option>
        </select>
        <br>
        <label for="date">Due:</label>
        <input v-model="date" type="date" id="birthday" name="birthday"> 
        <br>
        <button @click="upload()">Add Task</button>
      </div>
    </div>
      <div class="heading">
        <h2>Delete Tasks</h2>
      </div>
      <div class="edit">
        <div class="form">
          <div class="suggestions" v-if="suggestions.length > 0">
            <ul>
              <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">
              <li>
                <div class="title">
                  <button @click="deleteItem(s);">-</button>
                  {{s.title}}
                </div>
                <div class="category">
                  {{s.category}}
                </div>
                <div class="date">
                  {{s.date}}
                </div>
              </li>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div class="heading">
      <h2>Modify Categories</h2>
    </div>
    <div class="addCategory">
      <div class="form">
        <div class="categoryUpload">
          <button v-on:click="uploadCategory()">+</button>
          <label for="category">Category Name:</label>
          <input v-model="category" placeholder="Category Names" v-on:keyup.enter="uploadCategory()" >
        </div>
        <ul>
          <div class="categories" v-for="category in categories" :key="category.id">
            <li><button @click="deleteCategory(category); getCategories()">-</button>{{category.category}}</li>
          </div>
        </ul>
      </div>
    </div>
    <br>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Dashboard',
    data() {
    return {
      title: "",
      category: "",
      date: null, 
      addCategory: null, 
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
      findCategory: null,
      categories: [],
    }
  },
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    },
    
  },
  created() {
    this.getItems();
    this.getCategories();
  },
  methods: {
    async upload() {
      try {
        let r = await axios.post('/api/items', {
          title: this.title,
          category: this.category, 
          date: this.date,
        });
        this.addItem = r.data;
        this.getItems(); 
      } catch (error) {
        console.log(error);
      }
    },    
    async uploadCategory() {
      try {
        let r = await axios.post('/api/categories', {
          category: this.category, 
        });
        this.addCategory = r.data;
        this.getCategories();
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getCategories() {
      try {
        let response = await axios.get("/api/categories");
        this.categories = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },  
    selectCategory(category) {
      this.findCategory = category;
    },    
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },    
    async deleteCategory(category) {
      try {
        await axios.delete("/api/categories/" + category._id);
        this.findCategory = null;
        this.getCategories();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.admin{
  min-height: 70vh !important; 
  margin: 15%; 
  border: 4px solid #06174e;
  background-color: #b59dbf; 
}

.add{
  align:center;
}

.dashboard{
  margin: 0px; 
  margin-left: 10%; 
  margin-right: 10%; 
}
.dashboard h2{
  color: white;
  font-style: italic; 
  margin: 0;
  margin-top: 5px; 
}

h1{
  margin: auto;
  margin-top: 10px;
  width: 50%;
  padding: 10px;
  text-align: center; 
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
  border: bold; 
}

.form {
  margin-left: 20px;
  background-color: #b59dbf;
  padding: 10px; 
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

ul{
  list-style-type:none;
  padding: 10px; 
  margin:0px;
}
li{
  padding: 5px; 
}
button{
  background-color: #06174e;
  color: #f7f9fd;
  border: 2px solid #f7f9fd;
}
.input{
  max-width: 30%; 
}
.add input{
  max-width: 50%; 
  margin: 1em;
}
li .title {
  font-weight: bold; 
}
li .category, li .date{
  padding: 4px 30px 0;
}
.categoryUpload{
  margin-left: 0 !important;
}
</style>
```
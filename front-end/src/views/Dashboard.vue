<template>
<div class="admin">
  <h1>The Admin Page!</h1>
  <div class="heading">
    <div class="circle">1</div>
    <h2>Add a Task</h2>
  </div>
  <div class="add">
    <div class="form">
      <button @click="upload">+</button>
      <input v-model="taskName" placeholder="Task">
      <!-- Add on Enter -->
    </div>
    <div class="upload" v-if="addItem">
      <h2>{{addItem.taskName}}</h2>
    </div>
  </div>
</div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'Admin',  
  data() {
    return {
      taskName: "",
      completed: false,
      addItem: null,
    }
  }, 
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },    
    async upload() {
      try {
        const formData = new FormData();
        let r = await axios.post('/api/items', {
          title: this.taskName,
        });
        this.addItem = r.data;
      } catch (error) {
        console.log(error);
      }
    },
  }
  
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
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
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
</style>
```
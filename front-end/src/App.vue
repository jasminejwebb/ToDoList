<template>
<div id="app">
  <app-header>
  <div id="menu">
    <div id="brand">
      <router-link to="/">
      <h1>MUCH TO DO</h1>
      <h2>A To-Do List For All Your Needs</h2>
      </router-link>
    </div>
  </div>
  <div id = "navBar">
    <div id="side">
      <router-link to="/">
        <div class="menu-item browse">
          <p>Home</p>
        </div>
      </router-link>
      <router-link to="/dashboard">
        <div class="menu-item browse">
          <p>Dashboard</p>
        </div>
      </router-link>
      <router-link to="/recipes">
        <div class="menu-item">
          <p>Recipes</p>
        </div>
      </router-link>
    </div>
  </div>
  </app-header>
  <router-view></router-view>
  <app-footer>
    
    <footer class = "footer">
        <div>Created By: Jasmine Webb</div>
        <div>
          <a class="source-link" href="https://github.com/jasminejwebb/MockBlogWithVue">GitHub Repository</a>
        </div>
    </footer>
  </app-footer>
</div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    numberOfItems() {
      let numItems = 0; 
      for(let item of this.$root.$data.cart)
      {
        numItems += item.quantity;  
      }
      return numItems;
    }
  }
}
</script>

<style>
html{
  box-sizing: border-box;
}

#menu {
  display: flex;
  align-items: left;
  padding-left: 5em; 
  background-color: #06174e;
}

#menu a {
  color: #f7f9fd;
  text-decoration: none;
}
#navBar {
  display: flex;
  align-items: left;
  padding: 0.3em;
  padding-left: 5em; 
  padding-bottom: 0em;
  background-color: #b59dbf;
}

#navBar a {
  color: #f7f9fd;
  text-decoration: none;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: left;
  font-size: 1.25em;
  text-transform: capitalize;
  font-weight: bolder;  
}
.menu h1{
  margin-bottom: 10px; 
}
.menu h2{
  font-size: 1em; 
  font-style: italic; 
  margin-bottom: 30px; 
}
#side {
  grid-area: side;
  display: flex;
  justify-content: flex-front;
}
.router-view{
  min-height: 100vh !important; 
}

.menu-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu-item p {
  margin: 0px;
}

.browse {
  margin-right: 50px;
  padding-bottom: 1em;
}

.footer {
  background-color: #b59dbf;
  border-top: 1px black;
  margin: 0px 0px;
  margin-bottom: 0;
  display: flex; 
  justify-content: space-between;
  color: #f7f9fd;

}
.footer > div {
  margin: .5em; 
  padding: auto; 
}
.footer a {
  color: #f7f9fd;
  text-decoration: none;
}

body {
    color: #06174e;
    background-color: #ffffff;
    font-size: 18px;
    font-family: "Segoe UI", "Arial Regular", sans-serif;
}

.bg-dark {
    background-color: #3f3f3f !important;
}

.bg-light {
    background-color: #89b0ae !important;
}

</style>

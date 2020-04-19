<template>
  <div id="app">
    <h1 v-barLoading="barConfig">welcome to bar loading</h1>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      loading: true
    };
  },
  computed: {
    barConfig() {
      return {
        show: this.loading,
        progressContainer: ["lovelove"]
      };
    }
  },
  mounted() {
    // this.$barLoading.start();
    setTimeout(() => {
      // this.$barLoading.done();
      // this.loading = false;s
    }, 3000);
  }
};
</script>

<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>

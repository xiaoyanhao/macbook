<template>
  <div id="hello">
    <img class="logo" src="../assets/logo.png" alt="logo">
    <div class="progressWrapper">
      <progress :value="progressValue" max="100">{{progressValue}}</progress>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data() {
    return {
      progressValue: 0
    };
  },
  methods: {
    increaseProgressValue() {
      if (this.progressValue < 100) {
        this.progressValue += 4;
        setTimeout(this.increaseProgressValue, 100);
      } else {
        this.$router.push('desktop');
      }
    }
  },
  mounted() {
    this.increaseProgressValue();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
#hello {
  background-color: black;
  text-align: center;

  .logo {
    margin-top: 100px;
    margin-bottom: 200px;
  }
}
</style>

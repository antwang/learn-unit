<template>
  <div id="app">
    <img src="./assets/logo.png">
    <ul class="country-list">
      <li class="ico ico-l1"></li>
      <li class="ico ico-l2"></li>
      <li class="ico ico-l3"></li>
      <li class="ico ico-l4"></li>
    </ul>
    <router-view/>
  </div>
</template>
<script>
export default {
  async created() {}
};
</script>
<style lang="scss">
@import "~sprite2.scss";
$black: black;
$yellow: yellow;

h2 {
  font-size: 20px;
  color: $black;
  background: $yellow;
  text-align: center;
}

.country-list {
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>


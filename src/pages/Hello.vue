<template>
  <div>
    <h2>欢迎使用项目模板！</h2>
    <p>{{msg}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "hello"
    };
  },
  created() {
    this.msg = "world";
  }
};
</script>
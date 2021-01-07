<template>
  <main>你好中国</main>
</template>

<script>
export default {};
</script>

<style lang="less">
@import url("./style/index.less");

@m-auto: {
  margin: 10px auto;
};

@w-50: {
  width: 50%;
};

#app {
  @m-auto();
  @w-50();
}
</style>
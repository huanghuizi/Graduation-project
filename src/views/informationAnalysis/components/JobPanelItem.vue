<!--  -->
<template>
  <div class="item-container">
    <div class="item-logo">
      <img :src="logoUrl" width="100%" height="100%" alt="" />
    </div>
    <div class="item-name">
      {{ name }}
    </div>
    <div class="item-data">
      {{ data }}
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    name: {
      type: String,
      default: ''
    },
    data: {
      type: String,
      default: ''
    },
    logoUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.item-container {
  height: 170px;
  min-width: 190px;
  width: 15%;
  background: white;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 4px 4px 4px #d2d2d2;
  .item-logo {
    width: 50px;
    height: 50px;
  }
  .item-data {
    font-size: 30px;
    font-weight: 600;
  }
  .item-name {
    font-weight: 600;
    font-family: MicrosoftYaHei;
    padding: 8px;
  }
}
</style>

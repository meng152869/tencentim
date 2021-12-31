<template>
  <div class="side-bar-wraper">
    <div class="content">
      <div class="header-bar">
        <button title="刷新列表" @click="handleRefresh">
          <i class="tim-icon-refresh"></i>
        </button>
        <button title="创建会话" @click="handleAddButtonClick">
          <i class="tim-icon-add"></i>
        </button>
      </div>
      <div class="scroll-container">

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "side-bar",
  data() {
      return{
          
      }
  },
  methods:{
      handleAddButtonClick(){

      },
      handleRefresh(){
          
      }
  }
};
</script>
<style scoped>
</style>

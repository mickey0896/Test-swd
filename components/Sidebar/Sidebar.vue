<template>
  <vs-sidebar 
      v-model="active"
      class="gradient mr_top"
      open
      square
    >
  <vs-sidebar-group>
  <template #header>
      <vs-sidebar-item arrow to="/management">              
      Manage Work
      </vs-sidebar-item>
  </template>
      <vs-sidebar-item id="management" to="/management">
      <template #icon>
      <i class='material-icons'>work</i>
  </template>
      Work Management
      </vs-sidebar-item>
      <vs-sidebar-item id="status" to="/status">
  <template #icon>
      <i class='material-icons'>assignment</i>
  </template>
      Work Status (Chart)
       </vs-sidebar-item>
  </vs-sidebar-group> 
  </vs-sidebar>
</template>


<script>
export default {
    data:() => ({
      active: 'management',
    })
  }
</script>

<style lang="scss" scoped>

.mr_top {
  padding-top: 54px;
  z-index: 100;
}
</style>
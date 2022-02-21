<template>
  <vs-navbar
    text-white  shadow square center-collapsed v-model="active"
    target-scroll="#mainContainer"
    class="navbar"  
  >
  
<template #left>
    <img
    src="@/assets/images/logo/sentenance_logo_WH.png"
    alt=""
    height="30"
      />
    <b-input-group  size="sm" style="margin-left:15px; "  >
    <b-form-input style="height:26px;width:133px;"  placeholder=" search..." class="text-right"></b-form-input>
    <span  class="input-group-text" style="height:26px;" ><i class="material-icons" >search</i></span>
    </b-input-group>
       
    <v-btn dark icon style="margin-left:15px;"><i class="material-icons" >list</i></v-btn>
    <v-btn dark icon style="margin-left:5px;"><i class="material-icons" >dashboard</i></v-btn>
    <v-btn dark icon style="margin-left:5px;"><i class="material-icons" >map</i></v-btn>
</template>

<template #right>
      <v-btn dark icon style="margin-left:15px;"><i class="material-icons">notifications</i></v-btn>
      <div>&nbsp;&nbsp;&nbsp;</div>
      <v-btn dark icon ><i class="material-icons" >mode_comment</i></v-btn>
      <a class="username" style="margin-right:15px;">Hi, admin</a>

      <div class="right_navbar">
          <vs-avatar circle size="30">
          <img src="data:image/jpeg;base64,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" alt="">      
          </vs-avatar>
      </div>
      
    </template>
  </vs-navbar>
</template>

<script>


</script>
<style lang="scss" scoped>
.navbar {
  padding: 1px;
  position: fixed;
  background-color: #666666;
}
.right_navbar {
  display: flex;
  gap: 20px;
  #dropdown_user {
    display: block;
  }
}

.btn_user {
  padding: 0;
}
.button {
  padding: 0;
}
.con-vs-dropdown--menu {
  width: 200px;
}
.username{
  color: #fff;
  text-decoration: none;
  margin-left:15px;
}
</style>
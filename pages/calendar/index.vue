<template>

<div >
  <v-card class="databox" style="border-radius:0px;float:left;margin-left:10px;">
    <v-card class="headbox" style="background-color:#32c040;color:#ffff;">
    <i class="material-icons" style="margin-left:5px; margin-top:8px;">error_outline</i>
    <span class="assignment" > Upcoming Tasks </span>
    </v-card>
  </v-card >

  <v-card class="databox" style="border-radius:0px;float: left;margin-left:30px;">
    <v-card class="headbox" style="background-color:#32c040;color:#ffff;">
     <i class="material-icons" style="margin-left:5px; margin-top:8px;">snooze</i>
    <span class="assignment" > Upcoming Tasks </span>
    </v-card>
  </v-card >

  <v-card class="databox" style="border-radius:0px;float: left;margin-left:30px;">
    <v-card class="headbox" style="background-color:#32c040;color:#ffff;">
    <i class="material-icons" style="margin-left:5px; margin-top:8px;">sync_alt</i>
    <span class="assignment" > Upcoming Tasks </span>
    </v-card>
  </v-card >

  <v-card class="databox" style="border-radius:0px;float: left;margin-left:30px;">
    <v-card class="headbox" style="background-color:#32c040;color:#ffff;">
    <i class="material-icons" style="margin-left:5px; margin-top:8px;">check</i>
    <span class="assignment" > Upcoming Tasks </span>
    </v-card>
  </v-card >

  <v-card class="databox" style="border-radius:0px;float: left;margin-left:30px;">
    <v-card class="headbox" style="background-color:#32c040;color:#ffff;">
    <i class="material-icons" style="margin-left:5px; margin-top:8px;">access_alarms</i>
    <span class="assignment" > Upcoming Tasks </span>
    </v-card>
  </v-card >

  <v-card class="databox" style="border-radius:0px;;margin-left:1060px;">
    <v-card class="headbox" style="background-color:#32c040;color:#ffff;">
    <i class="material-icons" style="margin-left:5px; margin-top:8px;">access_time</i>
    <span class="assignment" > Upcoming Tasks </span>
    </v-card>
  </v-card >
<br>
<v-card >
  <div style="border-radius:0px;height:40px;
  background:#32c040; color:#ffff;">
  <i class="material-icons" style="margin-left:5px; margin-top:8px;" >list_alt</i>
  <span class="assignment" style="margin-right:15px;"> Assignment of Open Work Orders </span>
  </div>

  <vs-button
        circle
        success
        style="background-color:#c7f1cb;color:#000000;float:left"
        :active="active == 3"
        @click="active = 3"
        to="management"
      >
        <i class="material-icons" >&nbsp;list</i>&nbsp;List&nbsp;
  </vs-button>
  <vs-button
        circle
        success
        style="background-color:#c7f1cb;color:#000000;float:left"
        :active="active == 3"
        @click="active = 3"
      >
         <i class="material-icons" >&nbsp;event_note</i>&nbsp;Calendar&nbsp;
  </vs-button>
  <vs-button
        circle
        success
        style="background-color:#c7f1cb;color:#000000;"
        :active="active == 3"
        @click="active = 3"
        
      >
        <i class="material-icons" >&nbsp;group</i>&nbsp;User&nbsp;
  </vs-button>
        <p style="color:#0C090A;font-size:20px;">Calendar Table</p>

<v-card>
<vs-table striped>
    <template #thead>
      <vs-tr>
      
       <vs-th style="padding-right:200px;">
          Timestamp
        </vs-th>
        
      </vs-tr>
    </template>
    <template #tbody>
      <vs-tr v-for="(tr, index) in users" :key="index" >
       
        
        <vs-td>{{tr.timestamp}}</vs-td>
       
      </vs-tr>
    </template>
    </vs-table>
    </v-card>
</v-card>
</div>
</template>

<script>
import axios  from "axios"
   export default {
     layout: 'coreLayout',
     auth: false,
      data()  {
        return{
        users: []
      }
    },
    mounted(){
      const URL = "https://swdapi.ddns.net:8090/data/ttntest"
      axios
      .get(URL)
      .then( res => {
        console.log(res.data)
        this.users=res.data.slice(0,100)
      })
      },  
    }
</script>
<style>
.assignment{
  color: #fff;
  text-decoration: none;
  margin-left:5px;
  position: absolute;
  top: 8px;
}
.databox{
  
  height:115px;
  width:180px;  
}
.headbox{
  
  height:40px;
  width:180px; 
}
</style>


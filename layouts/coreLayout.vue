<template>
  <div>
    <Navbar>
      <template #btn_sidebar>
        <vs-button
          @click="activeSidebar = !activeSidebar"
          flat
          icon
          success
          id="btn_sidebar"
        >
          <i class="material-icons-outlined">menu</i>
        </vs-button>
      </template>
    </Navbar>
    <Sidebar :isOpen.sync="activeSidebar" />
    <div class="mainContainer" id="mainContainer">
      <Nuxt />
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar/Navbar.vue";
import Sidebar from "../components/Sidebar/Sidebar.vue";
export default {
  components: { Navbar, Sidebar },
  data() {
    return {
      activeSidebar: true,
      interval: null,
    };
  },
  methods: {
    reToken() {
      this.$jwt.getNewAccessToken();
      console.log('reToken');
    },
  },
  async beforeMount() {
    if (sessionStorage.getItem("accessToken") == undefined) {
      await this.$auth.logout();
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.reToken();
    }, 1000 * 60 * 30);
  },
  async beforeDestroy() {
    console.log("destroyed");
    clearInterval(this.interval)
    await this.$auth.logout();
    localStorage.clear();
  },
};
</script>

<style lang="scss">
#btn_sidebar {
  display: none;
}
.mainContainer {
  margin-top: 54px;
  margin-left: 255px;
  padding: 1rem;
  // height: 500px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 16px;
  }

  &::-webkit-scrollbar-track {
    background-color: #e4e4e4;
    border-radius: 100px;
  }

  &::-webkit-scrollbar-thumb {
    background-image: linear-gradient(
      180deg,
      #095ba0 0%,
      #095ba0 66%,
      #4c903e 100%
    );
    border-radius: 100px;
  }
}

@media only screen and (max-width: 900px) {
  .mainContainer {
    margin-left: 0px;
  }
  #btn_sidebar {
    display: block;
  }
}
body {

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
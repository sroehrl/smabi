<template>
  <div class="f-1 h-100p d-flex" style="flex-direction: column; overflow: hidden">
    <header class="bg-primary p-3 text-white d-flex raise-1-gray" ref="header">
      <router-link to="/" class="logo d-flex font-lg text-decoration-none">
        <img :src="smabiIcon" alt="logo" style="max-width: 50px"/>
        <span class="place-y-center text-white">SMABIware</span>
      </router-link>
      <div class="f-1"/>
      <div v-if="$store.getters.isLoggedIn" class="place-y-center">
        <button class="btn-accent">{{ $store.state.Auth.user.email.replace(/@[^$]+/,'') }}</button>
      </div>
    </header>
    <div class="d-flex bg-gray-lighter f-1">
      <div class="bg-primary-50  b-r-1 b-primary d-flex" style="flex-direction: column">

        <div :class="{'f-1':item.flex,' b-b-1 b-primary':item.to}" v-for="item in menuItems">
          <router-link v-if="item.to" :to="item.to" active-class="raise-2-primary bg-primary-light grow "
                       class="grid grid-2-10 text-decoration-none font-md text-white p-x-3 p-t-2 hover:raise-1-primary">

            <div class="place-y-center">
              <unicon :name="item.icon" fill="#517f83"></unicon>
            </div>
            <div class="p-l-3 p-b-2 d-hidden md:d-block">{{ item.label }}</div>
          </router-link>
        </div>
      </div>
      <div class="md:m-5 bg-white f-1 h-100p" style="overflow-y: auto" :style="contentHeight">
        <router-view v-if="$store.getters.isLoggedIn"/>
        <Login v-else/>
      </div>

    </div>
    <div class="position-absolute bg-white b-rounded b-1 b-primary p-x-5 p-y-2 grid raise-3-accent-light" style="width: 200px; top: 40%; left: calc(50% - 100px); z-index: 9; display: none" id="notification">
      <div class="place-x-center m-b-3 notification-text"></div>
      <div class="grid-6-6 type-confirm">
        <button class="btn-warning m-r-1" id="cancel-button">cancel</button>
        <button class="btn-primary m-l-1" id="confirm-button">yes</button>
      </div>

    </div>
  </div>

</template>

<script>
import Login from "@/components/Login";
import smabiIcon from "@/assets/smabi-icon.png"

export default {
  name: 'App',
  components: {Login},
  data: () => ({
    isActive: '/',
    smabiIcon: smabiIcon,
    menuItems: [
      {to: '/', label: 'Dashboard', icon: 'dashboard'},
      {to: '/calendar', label: 'Calendar', icon: 'calender'},
      {to: '/clients', label: 'Clients', icon: 'users-alt'},
      {to: '/contracts', label: 'Contracts', icon: 'file-contract'},
      {to: '/expenses', label: 'Expenses', icon: 'bill'},
      {to: '/invoices', label: 'Invoices', icon: 'invoice'},
      {to: '/products', label: 'Products', icon: 'clipboard-alt'},
      {flex: true},
      {to: '/settings', label: 'Settings', icon: 'setting'},
    ]
  }),
  computed:{
    contentHeight(){
      return {height: 'calc(100vh - ' + (this.$refs.header ? this.$refs.header.clientHeight : 120) + 'px)'}
    }
  }

}
</script>
<style>
</style>



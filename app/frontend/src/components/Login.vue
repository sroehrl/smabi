<template>
  <div class="grid m-t-5">
    <h2 class="place-x-center">Login</h2>
    <form @submit.prevent="process" class="grid place-x-center w-75p md:w-30p">
      <div class="input">
        <input id="email" required type="email" placeholder="Email" v-model="credentials.email" />
        <label for="email">Email</label>
        <div class="input-error">Please use a valid email address</div>
      </div>
      <div class="input">
        <input id="password" minlength="6" required type="password" placeholder="Password" v-model="credentials.password" />
        <label for="password">Password</label>
        <div class="input-error">At least 6 characters!</div>
      </div>
      <div class="place-x-end">
        <button class="btn-primary" type="submit">Login</button>
      </div>
      <div class="m-t-5 b-1 b-rounded b-warning text-warning p-3 " v-if="!success">
        Unable to log in with these credentials
      </div>
    </form>

  </div>

</template>

<script>
export default {
  name: "Login",
  data:()=>({
    success: true,
    credentials:{
      email:'',
      password:''
    }
  }),
  methods:{
    async process(){
      this.success = await this.$store.dispatch('login', this.credentials);
    }
  }
}
</script>

<style scoped>

</style>
<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row justify-center">
      <q-btn color="primary" @click="goToLogin">Login</q-btn>
      <q-btn color="primary" @click="goToCadastro">Cadastro</q-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToLogin(){
      this.$router.push('/login');
    },

    goToCadastro(){
      this.$router.push('/cadastro');
    }
  }
}
</script>

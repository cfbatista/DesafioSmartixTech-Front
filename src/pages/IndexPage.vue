<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row justify-center">
      <q-btn color="dark"
        style="border-radius: 8px;"
        rounded
        size="md"
        class="q-mt-md q-mr-sm"
        no-caps @click="goToLogin">Login</q-btn>
      <q-btn 
        color="dark"
        style="border-radius: 8px;"
        rounded
        size="md"
        class="q-mt-md q-mr-sm"
        no-caps
       @click="goToCadastro">Cadastro</q-btn>
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

<template>
  <div class="q-pa-md">
    <q-card-section class="text-center">
        <div class="text-grey-9 text-h5 text-weight-bold">Bem vindo!</div>
      </q-card-section>
    <div class="q-gutter-md row justify-center">
      <q-btn color="dark"
        style="border-radius: 8px;"
        rounded
        size="md"
        class="q-mt-md q-mr-sm"
        no-caps
        @click="logout">Logout</q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'HomePage',
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  }
})
</script>

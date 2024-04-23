<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md shadow-2 my_card" bordered>
      <q-card-section class="text-center">
        <div class="text-grey-9 text-h5 text-weight-bold">Valide o token</div>
        <div class="text-grey-8">Insira o token recebido no email.</div>
      </q-card-section>
      <q-card-section class="text-center">
        <q-form @submit.prevent="submitToken">
          <q-input
            outlined
            class="q-mt-md"
            clearable
            v-model="formModal.token"
            label="Insira token"
          />
          <q-btn
            type="submit"
            label="Valide tolken"
            color="dark"
            class="q-mt-md full-width"
            rounded
            size="md"
            style="border-radius: 8px"
            no-caps
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';

export default defineComponent({
  name: 'LoginPage',
  router: useRouter(),
  data() {
    return {
      formModal: ref({
        token: '',
      }),
    };
  },
  methods: {
    async submitToken() {
      try {
        
        const postData = {
          token: this.formModal.token,
        };
        console.log(postData);

        const response = await axios.post(
          'http://localhost:3000/login/token',
          postData
        );
        console.log(response);

        if (response.status === 200) {
          Notify.create({
            message: 'Token validado com sucesso.',
            type: 'positive',
          });
          const authToken = response.data.acessToken;
          console.log(authToken);
          localStorage.setItem('token', authToken);
          this.$router.push('/home');
        }
      } catch (error) {
        Notify.create({
          message: 'Token inválido.',
          type: 'negative',
        });
        console.log(error);
      }
    },
  },
});
</script>

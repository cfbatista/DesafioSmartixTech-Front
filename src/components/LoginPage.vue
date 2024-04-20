<template>
  <div>Login</div>

  <q-card-section>
    <q-form @submit="submitForm">
      <q-input v-model="formData.email" label="Email" />
      <q-input v-model="formData.senha" label="Senha" type="password" />
      <q-btn type="submit" label="Login" color="primary" class="q-mt-md" />
    </q-form>
  </q-card-section>

  <!-- TOKEN MODAL -->
  <q-dialog v-model="showModal">
    <q-card>
      <q-card-section>
        <q-form @submit.prevent="submitToken">
          <q-input v-model="formModal.token" label="Insira token" />
          <q-btn
            type="submit"
            label="Valide tolken"
            color="primary"
            class="q-mt-md"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

export default defineComponent({

  name: 'LoginPage',
  router: useRouter(),
  data() {
    return {
      showModal: false,
      formData: ref({
        email: '',
        senha: '',
      }),
      formModal: ref({
        token: '',
      }),
    };
  },
  methods: {
    async submitForm() {
      try {
        const postData = {
          email: this.formData.email,
          senha: this.formData.senha,
        };

        const response = await axios.post(
          'http://localhost:3000/login',
          postData
        );

        if (response.status === 200) {
          this.showModal = true;
        }

        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
    async submitToken() {
      try {
        // const response = await axios.post('http://localhost:3000/login/valida-token',
        //   this.formModal.token
        // );
        // console.log(response);
        const authToken = 'teste'; // change to response.data.token
        localStorage.setItem('token', authToken);
        
        this.$router.replace('/home');


      } catch (error) {
        console.log(error);
      }
    },
  },
});
</script>

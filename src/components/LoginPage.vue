<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card-section class="q-pa-md shadow-2" bordered>
      <q-card-section class="text-center">
        <div class="text-grey-9 text-h5 text-weight-bold">Login</div>
        <div class="text-grey-8">Realize o login para acessar sua conta.</div>
      </q-card-section>
      <q-form @submit="submitForm">
        <q-input
          outlined
          clear-icon="close"
          clearable
          v-model="formData.email"
          label="Email"
          :rules="[
            (val) => !!val || '* Obrigatório',
            (val) =>
              /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
              'Por favor digite o email válido',
          ]"
        />
        <q-input
          outlined
          clearable
          class="q-mt-md"
          v-model="formData.senha"
          clear-icon="close"
          label="Senha"
          type="password"
          :rules="[(val) => !!val || '* Obrigatório']"
        />
        <q-btn
          type="submit"
          label="Login"
          style="border-radius: 8px"
          no-caps
          class="full-width q-mt-md"
          color="dark"
          rounded
          size="md"
        />
      </q-form>
      <q-card-section class="q-mt-md text-center q-pt-none">
        <div class="text-grey-8">
          Não tem uma conta ainda? Faça o
          <a
            href="#/cadastro"
            class="text-dark text-weight-bold"
            style="text-decoration: none"
            >Cadastro.</a
          >
        </div>
      </q-card-section>
    </q-card-section>
  </q-page>

  <!-- TOKEN MODAL
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
  </q-dialog> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { Notify, Loading } from 'quasar';

export default defineComponent({
  name: 'LoginPage',
  router: useRouter(),
  data() {
    return {
      formData: ref({
        email: '',
        senha: '',
      })
    };
  },
  methods: {
    async submitForm() {
      try {
        Loading.show({
          message: 'Realizando login'
        });
        const postData = {
          email: this.formData.email,
          senha: this.formData.senha,
        };

        const response = await axios.post(
          'http://localhost:3000/login',
          postData
        );

        Loading.hide();
        if (response.status === 200) {
          this.$router.replace('/login/token');

          Notify.create({
            message: 'Login feito com sucesso.',
            type: 'positive'
          });
        }

        console.log(response);
      } catch (error) {
        console.log(error);
        Notify.create({
            message: 'Usuário ou senha inválidos.',
            type: 'negative'
          });
      }
    },
  },
});
</script>

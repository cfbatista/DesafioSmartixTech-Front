<template>
  <q-page class="row items-center justify-evenly">
    <q-card class="q-pa-md">
      <q-card-section>
        <q-form @submit="submitForm">
          <q-input
            v-model="formData.nome"
            label="Nome completo"
            outlined
            clearable
          />
          <q-input
            v-model="formData.telefone"
            label="telefone"
            outlined
            clearable
          />
          <q-input v-model="formData.email" label="Email" outlined clearable />
          <q-input
            v-model="formData.senha"
            label="Senha"
            type="password"
            outlined
            clearable
          />
          <q-btn
            type="submit"
            label="Cadastrar"
            color="primary"
            class="q-mt-md"
            :disable="isDisabled"
          />
          <q-alert color="negative" v-if="error">{{ error }}</q-alert>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
  
  <script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

defineOptions({
  name: 'CadastroPage',
});

const router = useRouter();

const formData = ref({
  nome: '',
  telefone: '',
  email: '',
  senha: '',
});

const errors = ref({
  nome: '',
  telefone: '',
  email: '',
  senha: '',
});

const isDisabled = computed(() => {
  return (
    !formData.value.nome ||
    !formData.value.email ||
    !formData.value.senha ||
    !formData.value.telefone ||
    !!errors.value.nome ||
    !!errors.value.email ||
    !!errors.value.senha ||
    !!errors.value.telefone
  );
});

const error = ref<string | null>(null);

async function submitForm() {
  //   clearErrors();
  //   let isValid = true;

  //   if (!formData.value.nome) {
  //     errors.value.nome = 'Nome completo é um campo obrigatório';
  //     isValid = false;
  //   } else if (!/^.{5,}\s/.test(formData.value.nome)) {
  //     errors.value.nome = 'O campo nome deve conter pelo menos 5 caracteres';
  //     isValid = false;
  //   }

  //   if (!formData.value.email) {
  //     errors.value.email = 'Email é obrigatório';
  //     isValid = false;
  //   } else if (!isValidEmail(formData.value.email)) {
  //     errors.value.email = 'Por favor insira um email válido';
  //     isValid = false;
  //   }

  //   if (!formData.value.senha) {
  //     errors.value.senha = 'Senha é um campo obrigatório';
  //     isValid = false;
  //   }

  //   if (!formData.value.telefone) {
  //     errors.value.telefone = 'Telefone é um campo obrigatório';
  //     isValid = false;
  //   } else if (!isValidTelefone(formData.value.telefone)) {
  //     errors.value.telefone =
  //       'Por favor insira um telefone válido no formato (XX) XXXXX-XXXX';
  //     isValid = false;
  //   }

  //   if (!isValid) {
  //     return;
  //   }
  try {
    const postData = {
      nome: formData.value.nome,
      telefone: formData.value.telefone,
      email: formData.value.email,
      senha: formData.value.senha,
    };
    const response = await axios.post(
      'http://localhost:3000/usuarios',
      postData
    );
    console.log(response);

    if (response.status == 200) {
      router.push('/login');
    }
  } catch (err) {
    console.log(err);
  }
}

//   function clearError() {
//     error.value = '';
//   }

// function clearErrors() {
//   errors.value = {
//     nome: '',
//     telefone: '',
//     email: '',
//     senha: '',
//   };
// }

// function isValidEmail(email: string): boolean {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }

// function isValidTelefone(telefone: string): boolean {
//   // formato (XX) XXXXX-XXXX
//   return /^\(\d{2}\) \d{5}-\d{4}$/.test(telefone);
// }
</script>
  
<template>
  <q-page class="flex flex-center bg-grey-2">
    <q-card class="q-pa-md shadow-2 my_card" bordered>
      <q-card-section class="text-center">
        <div class="text-grey-9 text-h5 text-weight-bold">Cadastro</div>
        <div class="text-grey-8">
          Por favor, faça o cadastro para acessar o site.
        </div>
      </q-card-section>
      <q-card-section>
        <q-form @submit="submitForm">
          <q-input
            v-model="formData.nome"
            label="Nome completo"
            outlined
            clear-icon="close"
            class="q-mt-md"
            clearable
            :rules="[
              val => !!val || '* Obrigatório',
              val => val.length > 5 || 'Por favor digite o nome completo',
            ]"
          />
          <q-input
            v-model="formData.telefone"
            label="telefone"
            mask="(##) ##### - ####"
            hint="Mask: (##) ##### - ####"
            outlined
            clear-icon="close"
            class="q-mt-md"
            clearable
            :rules="[
              val => !!val || '* Obrigatório',
              val => /^\(\d{2}\) \d{5}-\d{4}$/.test(val) || 'Por favor digite um telefone válido'
            ]"
          />
          <q-input
            v-model="formData.email"
            clear-icon="close"
            label="Email"
            outlined
            clearable
            class="q-mt-md"
            :rules="[
              val => !!val || '* Obrigatório',
              val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || 'Por favor digite o email válido',
            ]"
          />
          <q-input
            v-model="formData.senha"
            label="Senha"
            type="password"
            clear-icon="close"
            class="q-mt-md"
            outlined
            clearable
            :rules="[
              val => !!val || '* Obrigatório',
              val => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/.test(val) || 'Senha deve possuir ao menos 8 caracteres, 1 letra maiuscula, 1 número e 1 caracter especial',
            ]"
          />
          <q-btn
            type="submit"
            label="Cadastrar"
            color="dark"
            class="q-mt-md full-width"
            rounded
            size="md"
            style="border-radius: 8px"
            no-caps
            :disable="isDisabled"
          />
          <q-alert color="negative" v-if="error">{{ error }}</q-alert>
        </q-form>
        <q-card-section class="q-mt-md text-center q-pt-none">
        <div class="text-grey-8">
          Já possui uma conta ainda? Faça o 
          <a
            href="#/login"
            class="text-dark text-weight-bold"
            style="text-decoration: none"
            >Login.</a
          >
        </div>
      </q-card-section>
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
  
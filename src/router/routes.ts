import { RouteRecordRaw } from 'vue-router';
import MainLayout from 'layouts/MainLayout.vue';
import IndexPage from 'pages/IndexPage.vue';
import CadastroPage from 'components/CadastroPage.vue';
import LoginPage from 'components/LoginPage.vue';
import TokenPage from 'components/TokenPage.vue';
import HomePage from 'components/HomePage.vue';
import ErrorNotFound from 'pages/ErrorNotFound.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/', component: MainLayout,
    children: [
      { path: '', component: IndexPage },
      { path: '/cadastro', component: CadastroPage },
      { path: '/login', component: LoginPage },
      { path: '/login/token', component: TokenPage },
      { path: '/home', component: HomePage, meta: { requiredAuth: true } }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: ErrorNotFound,
  },
];

export default routes;

export default ({
                  authGuard,
                  guestGuard
                }) => [
  // {
  //   path: '/',
  //   name: 'welcome',
  //   component: require('~/pages/welcome.vue').default
  // },

  // Authenticated routes.
  ...authGuard([
    {
      path: '/',
      name: 'home',
      component: require('~/pages/welcome.vue').default
    },
  ]),

  // Guest routes.
  ...guestGuard([
    {
      path: '/login',
      name: 'login',
      component: require('~/pages/auth/login.vue').default
    },
    {
      path: '/password/reset',
      name: 'password.request',
      component: require('~/pages/auth/password/email.vue').default
    },
    {
      path: '/password/reset/:token',
      name: 'password.reset',
      component: require('~/pages/auth/password/reset.vue').default
    }
  ]),
  {
    path: '*',
    component: require('~/pages/errors/404.vue').default
  }
]

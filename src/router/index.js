import Vue from 'vue'
import Router from 'vue-router'
import App from '@/preview/App';
Vue.use(Router)


export default new Router({
  routes: [
    {
      path: '/quickStart',
      name: 'quickStart',
      component: quickStart
    },
    {
      path: '/customTheme',
      name: 'customTheme',
      component: customTheme
    },
    {
      path: '/demo',
      name: 'demo',
      component: r => require.ensure([], () => r(require('../../docs/demo.md')))
    },
    {
      path: '/Button',
      name: 'Button',
      component: Button
    },
    {
      path: '/Input',
      name: 'Input',
      component: Input
    },
  ]
})

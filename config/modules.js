/**
 * @type {import('../types/modules').Modules}
 */
export default {
  vue: '../public/js/vue.js',
  axios: '../public/js/axios.js',
  vant: {
    scripts: [
      '../public/vant/index.js',
      {
        type: 'content',
        value: 'Vue.use(VantUI)'
      }
    ],
    links:'../public/vant/index.css'
  },
  testText: [
    {
      type: 'content',
      value: '1',
      isLinke: true
    }
  ]
}

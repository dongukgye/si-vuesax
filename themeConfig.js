import Vue from 'vue'
import Vuesax from 'vuesax'
Vue.use(Vuesax, {
  theme: {
    colors: {
      primary: '#4C51BF',
      success: '#36bea6',
      danger: '#f62d51',
      warning: '#ffbc34',
      dark: '#212529'
    }
  }
})


// CONFIGS
const themeConfig = {
  theme: 'light',
  logotitle: "생산관리시스템",
  sidebarCollapsed: false,			// options: true (mini-sidebar), false(default)
  themeColor: "#4C51BF",
  topbarColor: "#4C51BF",
}

export default themeConfig
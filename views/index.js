import Header from './components/header.js'
import axios from "axios"

const App = {
  el: 'main',
  components: {
    'app-header': Header,
    'app-content': Content,
    'app-footer': Footer
  }
}
window.addEventListener('load', () => {
  new Vue(App)
});
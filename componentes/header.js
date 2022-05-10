Vue.component('header', {
  data: function () {
  },
  template: '<div><h1>componente</h1></div>'
  //template: '<nav class="navbar navbar-light bg-primary text-white"><span class="navbar-brand mb-0 h1 mx-5 text-white">Asistencia MAE</span></nav>'
});

new Vue({
  el: '#app',
  data: { message: 'Pasatiempos de Sofia' }
});

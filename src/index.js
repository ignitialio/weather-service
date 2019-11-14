import Weather from './components/Weather.vue'

// function to be called when service loaded into web app:
// naming rule: iios_<service_unique_name>
//
global.iios_weather = function(Vue) {
  // Warning: component name must be globally unique in your host app
  Vue.component('weather', Weather)

  // EXEAMPLE
  Vue.prototype.$services.emit('app:menu:add', [
    {
      path: '/myservicepath',
      title: 'weather Service view',
      icon: 'view_comfy',
      anonymousAccess: true,
      hideIfLogged: false,
      route: {
        path: '/myservicepath',
        component: Weather
      }
    }
  ])

  let onServiceDestroy = () => {
    Vue.prototype.$services.emit('app:menu:remove', [
      {
        path: '/myservicepath'
      }
    ])

    Vue.prototype.$services.emit('service:destroy:auth:done')
  }

  Vue.prototype.$services.once('service:destroy:iios', onServiceDestroy)
}

<template>
  <div :id="id" class="weather-layout">
    <div :id="'container_' + id" class="weather-forecast">
      <iframe :id="'frame_' + id" type="text/html" frameborder="0"
        class="weather-darksky" :src="req"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  /* specific */
  props: [ 'data' ],
  data: () => {
    return {
      id: Math.random().toString(36).slice(2),
      lat: 46.326049,
      lon: -0.464440,
      city: 'Niort',
      ready: false
    }
  },
  computed: {
    req() {
      // ex: http://forecast.io/embed/#lat=51.5073219&lon=-0.1276474&name=Londres&units=ca
      return 'https://forecast.io/embed/#lat=' + this.lat +
      '&lon=' + this.lon + '&name=' + this.city + '&units=ca';
    }
  },
  methods: {
    setLocation() {
      this.$services.weather.location({ city: this.city }).then( result => {
        console.log(this.city, result)
        this.lat = result.lat
        this.lon = result. lon

        let container = this.$el.getElementsById('container_' + this.id)
        let frame = this.$el.getElementsById('frame_' + this.id)

        frame = container.removeChild(frame)
        container.appendChild(frame)
      }).catch( err => {
        console.log(err);
      });
    }
  },
  mounted() {
    if (this.data && this.data.location) {
      this.$services.waitForService('weather').then(weather => {
        weather.reverse({
          lat: this.data.location[1],
          lon: this.data.location[0]
        }).then( result => {
          this.city = result.address.city
          this.lat = this.data.location[1]
          this.lon = this.data.location[0]
          this.ready = true
          console.log(this.city, this.lat, this.lon)
        }).catch(err => console.log(err))
      }).catch(err => console.log(err))
    } else {
      this.ready = true
    }
  }
}
</script>

<style>
.weather-layout {
  width: 100%;
  min-height: 280px;
  position: relative;
  margin: 8px;
}

.weather-forecast {
  width: 100%;
  height: calc(100% - 0px);
  display: flex;
  justify-content: center;
  align-items: center;
}

.weather-darksky {
  height: 280px!important;
  width: 600px;
}
</style>

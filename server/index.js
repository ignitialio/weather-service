const got = require('got')
const Service = require('@ignitial/iio-services').Service
const config = require('./config')

class Weather extends Service {
  constructor(options) {
    // set service name before calling super
    options.name = 'weather'
    super(options)
  }

  // provides location for a given address
  location(args) {
    return new Promise( (resolve, reject) => {
      let address = args.city
      var baseURL = 'http://nominatim.openstreetmap.org/search/'
      var params = 'format=jsonv2'
      var url = baseURL + address + '?' + params

      got(url, {
        method: 'post',
        json: true
      }).then(function(response) {
        if (response.code !== 200) {
          reject(response)
        } else {
          var result = response.body[0]
          var loc = {
            address: address
          }

          if (result) {
            console.log({
              lat: result.lat,
              lon: result.lon
            })
            resolve({
              lat: result.lat,
              lon: result.lon
            });
          } else {
            reject('not found')
          }
        }
    	});
    });
  }

  // provides address for a given location
  reverse(args) {
    return new Promise( (resolve, reject) => {
      var baseURL = 'http://nominatim.openstreetmap.org/reverse'
      var params = 'format=jsonv2&lat=' + args.lat + '&lon=' + args.lon
      var url = baseURL + '?' + params

      got(url, {
        method: 'post',
        json: true
      }).then( response => {
        if (response.code !== 200) {
          reject(response)
        } else {
          resolve({
            location: {
              lat: args.lat,
              lon: args.lon
            },
            address: response.body.address,
            name: response.body.name
          })
        }
    	})
    })
  }
}

// instantiate service with its configuration
const weather = new Weather(config)

weather._init().then(() => {
  console.log('service [' + weather.name + '] initialization done with options ',
    weather._options)
}).catch(err => {
  console.error('initialization failed', err)
  process.exit(1)
})

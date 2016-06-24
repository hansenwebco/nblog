var siege = require('siege');

siege('node app.js')
  .on(3000)
  .wait(3000)
  .for(50000).times
  .get('/')
  .concurrent(1000)
  .attack()

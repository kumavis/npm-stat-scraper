var npmStats = require('./index.js')

npmStats.userStats('kumavis',function(error,results){
  if (error) console.log('an error occurred: ' + error.message)
  console.log(results)
})

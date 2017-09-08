# npm stat scraper

[![Greenkeeper badge](https://badges.greenkeeper.io/kumavis/npm-stat-scraper.svg)](https://greenkeeper.io/)

scrape module download stats from npmjs.org

### example

```javascript
var npmStats = require('npm-stat-scraper')

// downloads per week/month for a module
npmStats.moduleStats('voxel-engine',function(error,results){
  if (error) console.log('an error occurred: ' + error.message)
  console.log(results)
})

// download stats for all modules of user
npmStats.userStats('substack',function(error,results){
  if (error) console.log('an error occurred: ' + error.message)
  console.log(results)
})
```
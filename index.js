var https = require('https')
var async = require('async')
var cheerio = require('cheerio')

module.exports.userStats = userStats
module.exports.moduleStats = moduleStats

function userStats(user,callback){
  var url = 'https://registry.npmjs.org/-/_view/browseAuthors?group_level=3&start_key=%5B%22'+user+'%22%5D&end_key=%5B%22'+user+'%22,%7B%7D%5D'
  curl(url,function(error,body){
    if (error) return callback(error)
    var modules = JSON.parse(body).rows.map(function(entry){ return entry.key[1] })
    var moduleRequests = {}
    modules.map(function(module){ moduleRequests[module] = moduleStats.bind(null,module) })
    async.parallel(moduleRequests,function(error,stats){
      callback(null,stats)
    })
  })
}

function moduleStats(module,callback){
  var url = 'https://npmjs.org/package/'+module
  curl(url,function(error,body){
    if (error) return callback(error)
    var $ = cheerio.load(body)
    var downloads = $('.downloads tr td')
    var stats = {}
    if (downloads.length === 4) {
      stats.week = Number(downloads.eq(0).text()) || 0
      stats.month = Number(downloads.eq(2).text()) || 0
    } else {
      stats.week = 0
      stats.month = Number(downloads.eq(0).text()) || 0
    }
    callback(null,stats)
  })
}

function curl(url,callback){
  var req = https.request(url, function(res) {
    var buffer = new String()
    res.setEncoding('utf8')
    res.on('data', function (chunk) {      
      buffer += chunk
    })
    res.on('end',function(){
      callback(null,buffer)
    })
  })
  req.on('error', function(error) {
    callback(error)
  })
  req.end()
}
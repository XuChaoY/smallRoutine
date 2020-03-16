function convertToStarsArray(stars){
  var num = stars.toString().substring(0, 1);
  var array=[];
  for(var i = 1; i <= 5; i++){
    if(i <= num){
      array.push(1);
    }else{
      array.push(0);
    }
  }
  return array;
}

function covertToCastString(casts){
  var castsJoin = "";
  for(var idx in casts){
    castsJoin = castsJoin + casts[idx].name+" / "
  }
  return castsJoin.substring(0, castsJoin.length-2);
}

function covertToCastsInfos(casts){
  var castsArray = [];
  for(var idx in casts){
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large:'',
      name: casts[idx].name
    }
    castsArray.push(cast)
  }
  return castsArray
}

function http(url, callback) {
  wx.request({
    url: url,
    method: 'GET',
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      callback(res.data);
    },
    fail: function () {
      console.log("fail")
    }
  })
}

module.exports = {
  convertToStarsArray: convertToStarsArray,
  http:http,
  covertToCastString: covertToCastString,
  covertToCastsInfos: covertToCastsInfos
}
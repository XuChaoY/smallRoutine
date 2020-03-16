// pages/movies/moive-detail/movie-detail.js
var util = require('../../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieId = options.id;
    var url = app.globalData.doubanBase + "/v2/movie/subject/" + movieId +"?apikey=0df993c66c0c636e29ecbb5344252a4a";
    util.http(url, this.processDouBanData);
  },
  processDouBanData:function(data){
    if(!data){
      return;
    }
    var director={
      avatar:"",
      name:"",
      id:"",
    };
    if(data.directors[0] !=null){
      if (data.directors[0].avatar != null){
        director.avatar = data.directors[0].avatar.large;
      }
      director.name = data.directors[0].name;
      director.id = data.directors[0].id
    }
    var movie = {
      movieImg:data.images ? data.images.large:"",
      country:data.countries[0],
      title:data.title,
      originalTitle:data.original_title,
      wishCount:data.wish_count,
      commentCount:data.comments_count,
      year:data.year,
      genres:data.genres.join('、'),
      stars: util.convertToStarsArray(data.rating.stars),
      score:data.rating.average,
      director: director,
      casts: util.covertToCastString(data.casts),
      castsInfo:util.covertToCastsInfos(data.casts),
      summary:data.summary
    }
    this.setData({
      movie
    })
  },
  viewMoviePostImg:function(event){
    var src = event.currentTarget.dataset.src;
    wx.previewImage({
      urls: [src],
      current:src,
    })
  }
})
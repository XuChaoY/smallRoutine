// pages/movies/more-moive/more-movie.js
var util = require('../../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    category:'',
    totalCount:0,
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var category = options.category;
    this.setData({
      category
    });
    var url = "";
    switch (category){
      case "正在热映":
        url = app.globalData.doubanBase + "/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a";
        break;
      case "即将上映":
        url = app.globalData.doubanBase + "/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a";
        break;
      case "豆瓣top250":
        url = app.globalData.doubanBase + "/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a";
        break;
    }
    this.setData({
      url
    });
    util.http(url, this.processDoubanData);
  },
  processDoubanData: function (moviesDouban) {
    var movies = [];
    for (var idx in moviesDouban.subjects) {
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if (title.length >= 6) {
        title = title.substring(0, 6) + "..."
      };
      var temp = {
        title: title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars),
      };
      movies.push(temp);
    }
    var tempCount = (this.data.totalCount+=movies.length);
    this.setData({
      totalCount:tempCount
    })
    var totalMovies = [];
    if(!this.data.isEmpty){
      totalMovies = [...this.data.movies,...movies];
    }else{
      totalMovies = movies;
      this.data.isEmpty = false;
    }
    this.setData({
      movies: totalMovies
    });
    wx.hideNavigationBarLoading();
    wx.stopPullDownRefresh();
  },
  onScrollLower:function(event){
    var nextUrl = this.data.url+"&start="+this.data.totalCount+"&count=20";
    util.http(nextUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  },
  onReady:function(){
    var _this = this;
    wx.setNavigationBarTitle({
      title:_this.data.category,
    })
  },
  onPullDownRefresh:function(event){
    this.setData({
      isEmpty:true,
      movies:[],
    })
    var refreshUrl = this.data.url+"&start=0&count=20";
    util.http(refreshUrl, this.processDoubanData);
    wx.showNavigationBarLoading();
  }
})
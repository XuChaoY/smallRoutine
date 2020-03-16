// pages/movies/movies.js
var util = require('../../utils/util.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inTheaters:[],
    comingSoon:[],
    top250:[],
    searchResult:[],
    containerShow:true,
    searchPanelShow:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheatersUrl = app.globalData.doubanBase+"/v2/movie/in_theaters?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=3";
    var comingSoonUrl = app.globalData.doubanBase +"/v2/movie/coming_soon?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=3";
    var top250 = app.globalData.doubanBase +"/v2/movie/top250?apikey=0df993c66c0c636e29ecbb5344252a4a&start=0&count=3";
    this.getMoviesListData(inTheatersUrl, "inTheaters", "正在热映");
    this.getMoviesListData(comingSoonUrl, "comingSoon", "即将上映");
    this.getMoviesListData(top250, "top250", "豆瓣top250");
  },
  getMoviesListData: function (url, key, categoryTitle){
    var _this = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        "Content-Type": "json"
      },
      success: function (res) {
        _this.processDoubanData(res.data, key, categoryTitle)
      },
      fail: function () {
        console.log("fail")
      }
    })
  },
  processDoubanData:function(moviesDouban, key, categoryTitle){
    var movies = [];
    for(var idx in moviesDouban.subjects){
      var subject = moviesDouban.subjects[idx];
      var title = subject.title;
      if(title.length >=6){
        title = title.substring(0, 6) +"..."
      };
      var temp={
        title:title,
        average: subject.rating.average,
        coverageUrl: subject.images.large,
        movieId: subject.id,
        stars: util.convertToStarsArray(subject.rating.stars),
      };
      movies.push(temp);
    }
    var readyData = {};
    readyData[key] = {
      movies:movies,
      categoryTitle: categoryTitle
    };
    this.setData(readyData);
  },
  onMoreTap: function (event) {   //点击跟多跳转
    var category = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more-movie/more-movie?category=' + category,
    })
  },
  onMovieTap(event) {
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: 'moive-detail/movie-detail?id='+id,
    })
  },
  onCancelImgTap:function(event){
    this.setData({
      containerShow: true,
      searchPanelShow: false,
    })
  },
  onBindFocus: function (event){
    this.setData({
      containerShow:false,
      searchPanelShow:true
    })
  },
  onBindChange:function(event){
    var text = event.detail.value;
    var searchUrl = app.globalData.doubanBase + "/v2/movie/search?apikey=0df993c66c0c636e29ecbb5344252a4a&q="+text;
    this.getMoviesListData(searchUrl, "searchResult", "")
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
// pages/posts/post-detail/post-detail.js
var postsData = require('../../../data/posts-data.js')
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected:false,
    currentPostId:'',
    isPlayingMusic:false,
  },
  onCollectionTap:function(event){
    //获取当前文章的收藏状态
    var postsCollected = wx.getStorageSync('postsCollected');
    var collected = postsCollected[this.data.currentPostId];
    collected = !collected;
    postsCollected[this.data.currentPostId] = collected;
    //更新缓存值
    wx.setStorageSync('postsCollected', postsCollected)
    //更新数据绑定
    this.setData({
      collected
    })
    wx.showToast({
      title: collected ? '收藏成功':'取消收藏',
      icon:'success',
      duration:1000
    })
  },
  onShareTap:function(event){
    var itemList = ["分享到朋友圈", "分享给微信好友", "分享到qq", "分享到微博"];
    wx.showActionSheet({
      itemList: itemList,
      itemColor:'#405f80',
    })
  },
  onMusicTap:function(event){
    var _this = this;
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic){
      wx.pauseBackgroundAudio();
      this.setData({
        isPlayingMusic:false
      })
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null;
    }else{
      wx.playBackgroundAudio({
        dataUrl: _this.data.postItem.music.url,
        title: _this.data.postItem.music.title,
        coverImgUrl: _this.data.postItem.music.coverImg
      });
      this.setData({
        isPlayingMusic: true
      })
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = this.data.currentPostId;
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var postid = options.id;
      var postItem = postsData.postsList[postid - 1];
      this.setData({
        postItem,
        currentPostId:postid
      });
    //获取当前文章收藏状态
    var postsCollected = wx.getStorageSync('postsCollected');
    if (postsCollected){
      var collected = postsCollected[postid];
      if (collected){
        this.setData({
          collected
        })
      }
    }else{
      var postsCollected = {};
      postsCollected[postid] = false;
      wx.setStorageSync('postsCollected', postsCollected)
    }
    var _this = this;
    wx.onBackgroundAudioPlay(function(){
      _this.setData({
        isPlayingMusic:true
      });
      app.globalData.g_isPlayingMusic = true;
      app.globalData.g_currentMusicPostId = _this.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function(){
      _this.setData({
        isPlayingMusic:false
      });
      app.globalData.g_isPlayingMusic = false;
      app.globalData.g_currentMusicPostId = null
    });
    if (app.globalData.g_isPlayingMusic && postid == app.globalData.g_currentMusicPostId){
      this.setData({
        isPlayingMusic:true
      })
    }
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
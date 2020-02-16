Page({
  onTap:function(){
    wx.redirectTo({
      url: '../posts/posts',
    })
  },

  onUnLoad:function(){
    console.log('welcome page is unload');
  },

  onHide:function(){
    console.log('welcome page is onhide');
  }
})
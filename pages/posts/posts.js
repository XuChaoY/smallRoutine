// pages/posts/posts.js
Page({
//产生事件   捕捉事件   回调函数    处理事件 
  /**
   * 页面的初始数据
   */
  data: {
    post_content:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      post_content: [
        {
          date: 'Sep 18 2019',
          title: '正是虾肥蟹壮时',
          avatar:'/images/avatar/1.png',
          image: '/images/post/crab.png',
          content: '雨漱窗前竹，涧流冰上泉，一缕清风动二弦。联，小山秋水篇。昭君怨，塞云黄暮天。玉手银筝柱，翠涛金屈卮，正是鱼肥蟹健时。诗，醉题秋扇儿。黄华字，乱风摇柳丝。出岫白云笑，入山明月愁，两字功名四十秋。羞，死封不义侯。村学究，且读书青海头。云雨山头暗，女牛大上期，宝鼎香寒玉漏迟。推，角门花影移。鸳鸯会，莫教明月知。'
        },
        {
          date: 'Nov 30 2019',
          title: '比利林恩的中场故事',
          avatar: '/images/avatar/2.png',
          image: '/images/post/bl.png',
          content: '《比利·林恩的中场战事》是由美国索尼电影娱乐公司发行，由李安执导，乔·阿尔文、克里斯汀·斯图尔特、克里斯·塔克、加内特·赫德兰联合主演剧情片。《比利·林恩的中场战事》根据本·芳汀同名小说改编，讲述了在伊拉克战争中的美国士兵比利·林恩与战友战胜归来并被誉为美国英雄，在一场橄榄球公开赛的中场表演过程中，揭露这群士兵在战场上真实经历的故事。'
        }
      ]});
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    console.log("onReady");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShow");
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
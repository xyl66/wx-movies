// pages/movie-detail/index.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getDetailInfo(options.id,'movie')
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
  
  },
  // 获取电
  getDetailInfo: function (id, setKey){
    wx.showLoading({
      title: '加载中',
    })
    var url = app.globalData.doubanBase + app.globalData.subject + id,
        self=this;
    wx.request({
      url: url, //仅为示例，并非真实的接口地址
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        self.processDetailData(res.data, setKey)
      },
      fail: function () {
       wx.showToast({
         title: '加载数据失败',
       })
      },
      complete: function () {
        wx.hideLoading();
      }
    })
  },
  //处理数据
  processDetailData:function(data,setKey){
    var readyData = {},
        directorsAndCasts = [],
        genres="",
        separate="/",
        countries="";
    for (let i in data.directors){
      var director = data.directors[i];
      director.name+="(导演)"
      directorsAndCasts.push(director)
    }
    for (let j in data.casts) {
      directorsAndCasts.push(data.casts[j]);
    }
    for (let k in data.genres) {
      genres += data.genres[k] + separate;
    }
    genres = genres.substring(0, genres.length - separate.length);
    for (let g in data.countries) {
      countries += data.countries[g] + separate;
    }
    countries = countries.substring(0, countries.length - separate.length);
    readyData[setKey] = {
      id: data.id,
      title: data.title,
      images: data.images,
      directorsAndCasts: directorsAndCasts,
      collectCount: data.collect_count,
      commentsCount: data.comments_count,
      wishCount: data.wish_count,
      reviewsCount: data.reviews_count,
      countries: countries,
      doCount: data.do_count,
      genres: genres,
      originalTitle: data.original_title,
      rating: data.rating,
      ratingsCount: data.ratings_count + "人",
      subtype: data.subtype,
      summary: data.summary,
      shareUrl: data.share_url,
      year: data.year,
    };
    // 设置导航条信息
    wx.setNavigationBarTitle({
      title: data.title
    })
    this.setData(readyData);
  },
  handleCelebrity:function(event){
    wx.showToast({
      title: '功能完善中',
    })
  }
})
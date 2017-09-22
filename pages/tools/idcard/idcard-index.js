'use strict';
let choose_year = null,
  choose_month = null;
const conf = {
  data: {
    hasEmptyGrid: false,
    showPicker: false,
    courseList:[]
  },
  onLoad() {
    const date = new Date();
    const cur_year = date.getFullYear();
    const cur_month = date.getMonth() + 1;
    const weeks_ch = ['日', '一', '二', '三', '四', '五', '六'];
    this.calculateEmptyGrids(cur_year, cur_month);
    this.calculateDays(cur_year, cur_month);
    this.setData({
      cur_year,
      cur_month,
      weeks_ch
    });
  },
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  calculateEmptyGrids(year, month) {
    const firstDayOfWeek = this.getFirstDayOfWeek(year, month);
    let empytGrids = [];
    if (firstDayOfWeek > 0) {
      for (let i = 0; i < firstDayOfWeek; i++) {
        empytGrids.push(i);
      }
      this.setData({
        hasEmptyGrid: true,
        empytGrids
      });
    } else {
      this.setData({
        hasEmptyGrid: false,
        empytGrids: []
      });
    }
  },
  calculateDays(year, month) {
    let days = [];

    const thisMonthDays = this.getThisMonthDays(year, month);
    console.log(year+'年'+month+'月')
    for (let i = 1; i <= thisMonthDays; i++) {
      let day=i>=10?i:('0'+i),
      mth=month>=10?month:('0'+month);
      days.push({
        day: i,
        date: year + '-' + mth + '-' + day,
        choosed: false
      });
    }

    this.setData({
      days
    });
  },
  handleCalendar(e) {
    const handle = e.currentTarget.dataset.handle;
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    if (handle === 'prev') {
      let newMonth = cur_month - 1;
      let newYear = cur_year;
      if (newMonth < 1) {
        newYear = cur_year - 1;
        newMonth = 12;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      });

    } else {
      let newMonth = cur_month + 1;
      let newYear = cur_year;
      if (newMonth > 12) {
        newYear = cur_year + 1;
        newMonth = 1;
      }

      this.calculateDays(newYear, newMonth);
      this.calculateEmptyGrids(newYear, newMonth);

      this.setData({
        cur_year: newYear,
        cur_month: newMonth
      });
    }
  },
  tapDayItem(e) {
    const idx = e.currentTarget.dataset.idx;
    const days = this.data.days;
    days[idx].choosed = !days[idx].choosed;
    this.setData({
      days,
    });
    //获取数据
    let time = Date.parse(new Date(days[idx].date))/1000,
    _this=this;
    wx.request({
      url: 'https://esn.foxconn.com/v2/getCourseList',
      data: {
        course_time: time
      },
      method: 'POST',
      header: { 
        "Content-Type":"application/x-www-form-urlencoded"
      },
      success: function (res) {
        var t = [{ "course_id": 86, "name": "IFRS 公報3－企業合併概述", "creat_time": 1505799172, "course_time_start": 1505815200, "course_time_end": 1505822400, "course_place": "虎躍 2F阿基米德", "course_speaker": "PWC  鍾子嶸", "course_sign_id": 86729, "sign_count": 402 }, { "course_id": 86, "name": "IFRS 公報3－企業合併概述", "creat_time": 1505799172, "course_time_start": 1505815200, "course_time_end": 1505822400, "course_place": "虎躍 2F阿基米德", "course_speaker": "PWC  鍾子嶸", "course_sign_id": 86729, "sign_count": 402 }, { "course_id": 86, "name": "IFRS 公報3－企業合併概述", "creat_time": 1505799172, "course_time_start": 1505815200, "course_time_end": 1505822400, "course_place": "虎躍 2F阿基米德", "course_speaker": "PWC  鍾子嶸", "course_sign_id": 86729, "sign_count": 402 }, { "course_id": 86, "name": "IFRS 公報3－企業合併概述", "creat_time": 1505799172, "course_time_start": 1505815200, "course_time_end": 1505822400, "course_place": "虎躍 2F阿基米德", "course_speaker": "PWC  鍾子嶸", "course_sign_id": 86729, "sign_count": 402 }, { "course_id": 86, "name": "IFRS 公報3－企業合併概述", "creat_time": 1505799172, "course_time_start": 1505815200, "course_time_end": 1505822400, "course_place": "虎躍 2F阿基米德", "course_speaker": "PWC  鍾子嶸", "course_sign_id": 86729, "sign_count": 402 }, { "course_id": 86, "name": "IFRS 公報3－企業合併概述", "creat_time": 1505799172, "course_time_start": 1505815200, "course_time_end": 1505822400, "course_place": "虎躍 2F阿基米德", "course_speaker": "PWC  鍾子嶸", "course_sign_id": 86729, "sign_count": 402 }]
        _this.setData({ courseList: t});
      },
      fail: function () {
        wx.showToast({
          title: '加载数据失败',
        })
      },
    })
  },
  chooseYearAndMonth() {
    const cur_year = this.data.cur_year;
    const cur_month = this.data.cur_month;
    let picker_year = [],
      picker_month = [];
    for (let i = 1900; i <= 2100; i++) {
      picker_year.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      picker_month.push(i);
    }
    const idx_year = picker_year.indexOf(cur_year);
    const idx_month = picker_month.indexOf(cur_month);
    this.setData({
      picker_value: [idx_year, idx_month],
      picker_year,
      picker_month,
      showPicker: true,
    });
  },
  pickerChange(e) {
    const val = e.detail.value;
    choose_year = this.data.picker_year[val[0]];
    choose_month = this.data.picker_month[val[1]];
  },
  tapPickerBtn(e) {
    const type = e.currentTarget.dataset.type;
    const o = {
      showPicker: false,
    };
    if (type === 'confirm') {
      o.cur_year = choose_year;
      o.cur_month = choose_month;
      this.calculateEmptyGrids(choose_year, choose_month);
      this.calculateDays(choose_year, choose_month);
    }

    this.setData(o);
  },
  onShareAppMessage() {
    return {
      title: '小程序日历',
      desc: '还是新鲜的日历哟',
      path: 'pages/index/index'
    };
  }
};

Page(conf);
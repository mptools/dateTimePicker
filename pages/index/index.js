// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    dateTimePickerConfig:{
      type:1,
      start:1970,
      end:2099
    },
  },
  dateTimeChange(e){
    console.log(e.detail.newIndex)
  },
})

// miniprogram/components/dragSort/index.js
Component({
    properties: {
      config:{
          type:Object,
          observer:function(newVal,oldVal,changedPath){
              this.readyGo()
          }
        }
    },
    data: {
      
    },
    methods: {
        readyGo (){
            let date=new Date()
            let monthArray=[1,2,3,4,5,6,7,8,9,10,11,12]
            let hourArray= ["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]
            let minSecArray=["00","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59"]
            this.setData({
                // nowYear:date.getFullYear(),
                dateTimeArray:this.data.config.type==0?[this.generateArray(this.data.config.start,this.data.config.end),monthArray,this.generateArray(1,new Date(date.getFullYear(),date.getMonth()+1,0).getDate())]:this.data.config.type==1?[this.generateArray(this.data.config.start,this.data.config.end),monthArray,this.generateArray(1,new Date(date.getFullYear(),date.getMonth()+1,0).getDate()),hourArray]:this.data.config.type==2?[this.generateArray(this.data.config.start,this.data.config.end),monthArray,this.generateArray(1,new Date(date.getFullYear(),date.getMonth()+1,0).getDate()),hourArray,minSecArray]:[this.generateArray(this.data.config.start,this.data.config.end),monthArray,this.generateArray(1,new Date(date.getFullYear(),date.getMonth()+1,0).getDate()),hourArray,minSecArray,minSecArray],
                dateTimeArr:[this.generateArray(this.data.config.start,this.data.config.end),monthArray,this.generateArray(1,new Date(date.getFullYear(),date.getMonth()+1,0).getDate()),hourArray,minSecArray,minSecArray],
                dateTimeIndex:this.data.config.type==1?[date.getFullYear()-this.data.config.start,date.getMonth(),date.getDate()-1,date.getHours()]:this.data.config.type==2?[date.getFullYear()-this.data.config.start,date.getMonth(),date.getDate()-1,date.getHours(),date.getMinutes()]:[date.getFullYear()-this.data.config.start,date.getMonth(),date.getDate()-1,date.getHours(),date.getMinutes(),date.getSeconds()]
            })
            this.triggerEvent('subTap',{newIndex:this.data.dateTimeIndex})
        },
        generateArray (start, end) {
            return Array.from(new Array(end + 1).keys()).slice(start)
        },
        bindDateTimePickerChange(e){
            console.log('picker选择改变，携带值为', e.detail.value)
        },
        bindDateTimePickerColumnChange(e){
            //console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
            let newIndex=this.data.dateTimeIndex
            switch(e.detail.column){
                case 0:
                case 1:
                    let dateArray=this.generateArray(1,new Date(this.data.dateTimeArray[0][e.detail.column?this.data.dateTimeIndex[0]:e.detail.value],this.data.dateTimeArray[1][e.detail.column?e.detail.value:this.data.dateTimeIndex[1]],0).getDate());
                    let newArray=this.data.dateTimeArray
                    newArray[2]=dateArray
                    this.setData({
                        dateTimeArray:newArray
                    })
                    if(this.data.dateTimeIndex[2]>dateArray.length-1)
                        newIndex[2]=dateArray.length-1
                    break;
                default:
                    break;
            }
            newIndex[e.detail.column]=e.detail.value
            this.setData({
                dateTimeIndex:newIndex
            })
            this.triggerEvent('subTap',{newIndex:this.data.dateTimeIndex})
        },
    },
    lifetimes: {
      ready: function () {
        this.readyGo()
      },
    },
  })

//学历需求图表交互功能函数
function ChartTwo_interactionS(myecharts, option) {
	let Lis = $(".Tool-Two-content").children()
    $(Lis[2]).tooltip({
        animation: true,
        trigger: "hover focus",
        placement: "auto right",
        container: "body",
        delay: {show: 350, hide: 100}
    })
    let falg, falgs = true

//	切换视图
    $(Lis[0]).on("click", function () {
        if (falgs) {
            option.series[0].radius = ['0%', '70%']
            option.series[0].label.emphasis.show = false
            falgs = false
        } else {
            option.series[0].radius = ['50%', '70%']
            option.series[0].label.emphasis.show = true
            falgs = true
        }
        myecharts.setOption(option)
    })

//	单选/多选
    $(Lis[1]).off("click").on("click", function () {
        if (falg) {
            $(".Tool-Two-content_radios").animate({
                'color': 'rgba(228,60,89,1)!important',
                'left': '9.3px'
            })
            option.series[0].selectedMode = "multiple"
            falg = false
        } else {
            $(".Tool-Two-content_radios").animate({
                'color': '#000',
                'left': '-1px'
            })
            option.series[0].selectedMode = "single"
            falg = true
        }
        myecharts.setOption(option)
    })

//	导出图表为图片下载到本地
    $(Lis[2]).on("click", function () {
        //首先创建图片，并将图片的src 设置为图表的DataURL
        var img = new Image()
        img.src = myecharts.getDataURL({
            type: "png",
            //导出的图片大小比例
            pixelRatio: 1,
            backgroundColor: 'rgb(255,255,255)'
        })

        //创建a标签,通过a 标签的download属性将其下载到本地
        let a = document.createElement('a')
        //内部自动启动click事件
        let event = new MouseEvent('click')
        //在下载图片时的图片名称
        a.download = '各职位学历分析图表'
        //将图片的base64编码转为 a 标签的链接
        a.href = img.src
        //为 a 标签 绑定点击事件
        a.dispatchEvent(event)
        /*	    原理:
            创建一个 aDOM元素[不显示在页面上],内部为其添加并绑定点击事件立即执行,
            将图表的base64编码路径转为 a DOM 的href链接,
            通过 aDOM 的download 属性将其base64路径的图片下载
        */
    })
}

//学历图表初始化函数
function Chart_Two_school(data_product, data_occurrences) {
    var myEchartsTwo_school = echarts.init(document.querySelector("#mainTwo-school"))
    var option = {
        title: Title("各职位对应的学历需求占比","根据收集的若干公司的招聘信息分析出职位对应的学历需求占比","top",setPostion("title-left")),
        tooltip: tooltip('item','{a} <br/>{b}: {c} (占比{d}%)'),
        legend: legend("plain",'vertical',setPostion("legend-top"),setPostion("legend-left"),data_product),
        series: [
            {
                name: '职位学历需求占比',
                type: 'pie',
                //饼形图的缩放大小,可更该数值切换为饼状图/圆环图
                radius: setSeries("series-radius"),
                center: setSeries("series-center"),
                //开启图例单选/多选
                selectedMode: false,
                //定义图形的图例角度
                startAngle: 180,
                minAngle: 5,
                //中心点的图例文本
                label: {
                    // 饼图图例不选中状态
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    // 饼图图例选中【高亮】状态
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: setFontsize("Two_series_emphasis"),
                            fontWeight: 'bold'
                        }
                    }
                },
                // 学历需求占比数据
                data: [
                    {value: data_occurrences[0], name: data_product[0]},
                    {value: data_occurrences[1], name: data_product[1]},
                    {value: data_occurrences[2], name: data_product[2]},
                    {value: data_occurrences[3], name: data_product[3]},
                    {value: data_occurrences[4], name: data_product[4]},
                    {value: data_occurrences[5], name: data_product[5]},
                    {value: data_occurrences[6], name: data_product[6]},
                    {value: data_occurrences[7], name: data_product[7]},
                    {value: data_occurrences[8], name: data_product[8]},
                ]
            }
        ]
    }

    myEchartsTwo_school.setOption(option)

    Chart_Loading(myEchartsTwo_school)
    
    //	图表交互功能函数
    ChartTwo_interactionS(myEchartsTwo_school, option)
}

//工作经验图表初始化函数
function Chart_Two_salary(data_product, data_occurrences) {
    let key = []
    let value = []
    for(var i =0;i<=data_product.length-1;i++){
        if(data_product[i]!="null"){
            key.push(data_product[i])
        }
    }
    for(var i =0;i<=data_occurrences.length-1;i++){
        if(data_occurrences[i]!=0){
            value.push(parseInt(data_occurrences[i]))
        }
    }

    var myEchartsTwo_salary = echarts.init(document.querySelector("#mainTwo-salary"))
    var option = {
        title: Title("各职位对应的工作经验需求占比",'',"top","left"),
        grid: {containLabel: true},
        toolbox: toolbox(25),
        xAxis: xAxis("出现次数","log",null),
        yAxis: yAxis("工作年限",'category',key),
        visualMap: {
            type: "continuous",
            orient: setvisualMap(),
            itemWidth: setvisualMapW_H("visualMapW"),
            itemHeight: setvisualMapW_H("visualMapH"),
            left: setvisualMaoPostion("visualMap_left"),
            bottom: setvisualMaoPostion("visualMap_bottom"),
            textGap: setFontsize("xAxis") - 1,
            formatter: "次数:{value}",
            min: 20,
            max: 20000,
            text: ['高', '低'],
            dimension: 0,
            inRange: {
                color: ['#D7DA8B', '#E15457']
            },
            textStyle: {
                fontSize: setFontsize("xAxis")
            },
            realtime: true,
            calculable: false
        },
        series: [
            {
                name: "需求出现次数",
                type: 'bar',
                data: value
            }
        ]
    };

    myEchartsTwo_salary.setOption(option)
    Chart_Loading(myEchartsTwo_salary)
}

// 格式化获取到的JSON数据
function jsonSave(json, Twokeys, Twovalues, falg) {
    $.map(json, function (value, name) {
        Twokeys = []
        Twovalues = []
        $(".mainTwo-TopJob").text(name)
        $.map(value, function (key, value) {
            // 学历名称
            Twovalues.push(key)
            // 出现次数
            Twokeys.push(value)
            if (falg == "School") {
            	Chart_Two_school(Twokeys, Twovalues)
            } else if (falg == "Salary") {
            	Chart_Two_salary(Twokeys, Twovalues)
            }
        })
        
    })
}


var Twokeys = []
var Twovalues = []

function Two_geijson() {
  //POST请求初始化图表"http://localhost:8080/queryJobEduExpData.action"
  $.ajax({
      type: "post",
      url: "http://localhost:8080/queryJobEduExpData.action",
      async: true,
      data: {id: "算法"},
      dataType: "json",
      error:function (json){
          jsonSave(json[0], Twokeys, Twovalues, "School")
          jsonSave(json[1], Twokeys, Twovalues, "Salary")
      },
      success: function (json) {
          jsonSave(json[0], Twokeys, Twovalues, "School")
          jsonSave(json[1], Twokeys, Twovalues, "Salary")
      }
  })
  
  //动态数据导入刷新图表"http://localhost:8080/queryJobEduExpData.action?time="
  $.each($(".data-two"), function (index, value) {
      $($(".data-two")[index]).on("click", function () {
          $(".activeTwo-data").removeClass("activeTwo-data")
          $(this).addClass("activeTwo-data")
          $(this).css("text-decoration", "none")
          $(".mainTwo-TopJob").text($(this).text())
          let id = encodeURI($(this).text(),"UTF-8")
          let date = new Date()
          $.post("http://localhost:8080/queryJobEduExpData.action?time="+date.getDate(), {id: id}, function (json) {
              var jsons = eval(json)
              jsonSave(jsons[0], Twokeys, Twovalues, "School")
              jsonSave(jsons[1], Twokeys, Twovalues, "Salary")
          })
      })
  })
}

$(function () {
	Two_geijson()
})

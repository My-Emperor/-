//滚动插件
function Fullpage() {
    let keys = []
    let values = []
    $('#fullpage').fullpage({
//		    	 字体随着屏幕缩放而缩放
        css3: true,
        resize: true,
        /*屏中的文本内容是否居中显示*/
        verticalCentered: false,
        /*页面结构生成后的回调函数，或者说页面初始化完成后的回调函数*/
        afterRender: function () {
          $("#First_chart").focus()
          $($(".data")[0]).addClass("active_data")
          //	初始化页面获取数据
	        $.ajax({
	            type: "post",
	            url: "http://localhost:8080/queryJobTopData.action",
	            async: true,
	            data: {id: "算法"},
	            dataType: "json",
	            error:function (e){},
	            success: function (json) {
	                $.map(json, function (key, value) {
	                    keys.push(value)
	                    values.push(key)
	                    Chart_First(["算法"], values, keys)
	                })
	            }
	        })
        }
    })
}

// 图表交互功能函数
function Tnteraction(myEcharts, option) {
    //图表工具栏切换样式函数
    function Canvas_Tool_toggle(classname, show_html, hide_html, data, target) {
    	let falg = true
        $(classname).on("click", function () {
            if (falg) {
                target == 0 ? option.series[0].markLine = null : target < 2 ? option.series[0].markPoint = null : false
                myEcharts.setOption(option)
                $(this).html(show_html)
                $(classname).children()[0].className = "glyphicon glyphicon-ok-circle close_Point"
                target > 2 ? $(classname).children()[0].className = "glyphicon glyphicon-remove-circle close_Point" : false
                falg = false
            } else {
                if (data != null) {
                    target == 0 ? option.series[0].markLine = {data: [data]} : option.series[0].markPoint = {data: [data[0], data[1]]}
                    myEcharts.setOption(option)
                }
                $(this).html(hide_html)
                $(classname).children()[0].className = "glyphicon glyphicon-remove-circle close_Point"
                target > 2 ? $(classname).children()[0].className = "glyphicon glyphicon-ok-circle close_Point" : false
                falg = true
            }
        })
    }

    let average_data = {type: "average", name: "平均值"}
    let max_min_data = [{type: 'max', name: '最大值'}, {type: 'min', name: '最小值'}]

//			隐藏/显示平均值
    Canvas_Tool_toggle(".average", "<i></i>显示平均值", "<i></i>隐藏平均值", average_data, 0)
//			隐藏最大/最小值
    Canvas_Tool_toggle(".max_min", "<i></i>显示最大/最小值", "<i></i>隐藏最大/最小值", max_min_data, 1)
//			显示/隐藏底部缩放条
    Canvas_Tool_toggle(".DataZoom", "<i></i>取消职位过滤", "<i></i>开启职位过滤", null, 3)
//			显示/隐藏右侧缩放条
    Canvas_Tool_toggle(".DataZoom_vertical", "<i></i>取消次数过滤", "<i></i>开启次数过滤", null, 4)

//			底部缩放条组件配置
    let dataZoom = {
        height: setDataZoomSize(),
        id: "dataZoomX", show: true, type: "slider",
        start: 0, end: 100, startValue: 0, endValue: 100,
        orient: "horizontal", zoomLock: false,
        left: "center", top: "bottom", filterMode: "filter", showDetail: true,
    }

//			右侧缩放条组件配置

    let DataZoom_vertical = {
        width: setDataZoomSize(),
        id: "dataZoomY", show: true, type: "slider",
        start: 0, end: 100, startValue: 0, endValue: 100,
        orient: "vertical", zoomLock: false,
        left: "right", top: "middle", filterMode: "filter", showDetail: true,
        bottom: 0
    }

    function DataZoom_toggle(classname, data_config, id_shape, myEcharts, option) {
    	let falgs = true
        $(classname).on("click", function () {
            // 显示
            if (falgs) {
                if (option.dataZoom.length <= 1) {
                    option.dataZoom = [data_config]
                    myEcharts.setOption(option)
                } else if (option.dataZoom.length > 1) {
                    option.dataZoom = [{id: id_shape, show: true}]
                } else {
                    option.dataZoom.push(data_config)
                    myEcharts.setOption(option)
                }
                falgs = false
            } else {
                // 隐藏
                option.dataZoom = [{id: id_shape, show: false}]
                myEcharts.setOption(option)
                falgs = true
            }
        })
    }

    //底部缩放条
    DataZoom_toggle(".DataZoom", dataZoom, "dataZoomX", myEcharts, option)
    //右侧缩放条
    DataZoom_toggle(".DataZoom_vertical", DataZoom_vertical, "dataZoomY", myEcharts, option)

}

// 获取后台数据
var keys = []
var values = []
var names = []
//动态获取数据
function getjson() {
    $.each($(".data"), function (index, value) {
        $($(".data")[index]).on("click", function () {
        	names  = []
            $("#Job_modal").stop().fadeToggle()
            names.push($($(".data")[index]).text())
            $(".active_data").removeClass("active_data")
            $(this).addClass("active_data")
            let id  = encodeURI($(this).text(),"UTF-8")//http://localhost:8080/queryJobTopData.action
            $.getJSON("http://localhost:8080/queryJobTopData.action", {id:id}, function (json) {
                $.map(json, function (key, value) {
                    if (keys.length >= 10 & values.length >= 10) {
                        keys.shift(value)
                        values.shift(key)
                    }
                    keys.push(value)
                    values.push(key)
                    //	柱状图表函数 将数据传回并重新加载图表
                    Chart_First(names, values, keys)
                })
            })
        })
    })
}

function Chart_First(names, keys, values) {
    var myEcharts = echarts.init(document.querySelector("#main"))
    var option = {
        title: Title("各职位技能点需求排名","","top",setPostion("title-left")),
        tooltip: tooltip('xAxis',''),
        legend: legend("plain",'horizontal',0,"center",names),
        toolbox: toolbox(30),
        xAxis: xAxis("技术词","category",values),
        yAxis: yAxis("出现次数",'value',null),
        dataZoom:[
        	{
        		id:"dataZoomS",
            	type:"inside"
        	}
        ],
		//刻度线组件：当鼠标触摸图例组件时显示X/Y轴的刻度值
        axisPointer: {
        	show:true,
            type: "shadow",
            // 旁边的小框
            label: {
                show: true,
                fontFamily: ['serif', 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei'],
                fontSize: setFontsize("axisPointer"),
                padding: setPadding("axisPointer")
            }
        },
        series: [{
            name: names,
            type: "bar",
            data: keys.length <= 0 ? [] : keys,
            //柱体的颜色样式
            itemStyle: {
                // 正常状态下的柱体样式
                normal: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            {offset: 0, color: '#FA3C37'},
                            {offset: 0.5, color: '#DC3C37'},
                            {offset: 1, color: '#E63531'}
                        ]
                    )
                }
            },
            //设置柱体的间距
            barGap: '-100%',
            barCategoryGap: '50%',
            //标记点
            markPoint: {
                symbol: "pin",
                symbolSize: setSymbolSize(),
                label: {
                    textBorderColor: "red",
                    fontSize: setFontsize("axisPointer")
                },
                data: [
                    {type: "max", name: "最大值"},
                    {type: "min", name: "最小值"}
                ]
            },
            //标记线
            markLine: {
                symbolSize: setSymbolSize() == 50 ? setSymbolSize() - 40 : setSymbolSize() == 45 ? setSymbolSize() - 38 : setSymbolSize() == 40 ? setSymbolSize() - 36 : setSymbolSize() == 25 ? setSymbolSize() - 23 : false,
                label: {
                    fontSize: setFontsize("yAxis")
                },
                data: [
                    {type: "average", name: "平均值", textBorderColor: "red"}
                ]
            }
        }]
    }
    myEcharts.setOption(option)
    //加载动画：使用加载动画提示用户图表正在产生中
    Chart_Loading(myEcharts)
    //	交互功能函数
    Tnteraction(myEcharts, option)
}

$(function () {

//获取数据加载图表函数
	getjson()
//全屏滚动函数
    Fullpage()
})
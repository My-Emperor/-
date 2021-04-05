function ChartFifth (data_value,data_name){
	var MyEcharts_fifth  = echarts.init(document.querySelector("#mainfifth"))
	
	var option = {
	    title: Title('公司性质占比',"根据收集的若干公司的招聘信息分析每个公司的性质占比","top",setPostion("title-left")),
	    tooltip: tooltip('item',"{a} <br/>{b}: {c} (占比{d}%)"),
	    legend: legend("plain",setvisualMap("Fifth-legend"),setPostion("Fifth-legend-top"),20,data_name),
	    toolbox: toolbox(30,20),
	    series: [{
	        name: '公司性质',
	        type: 'pie',
            center: setSeries("Fifth-center"),
	        selectedMode: 'single',
	        selectedOffset: 30,
	        clockwise :false,
	        label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: setFontsize("Two_series_emphasis"),
                        fontWeight: 'bold'
                    }
                }
	        },
	        labelLine: {},
	        data:[ 
	        	{value:data_value[0], name:data_name[0]},
	            {value:data_value[1], name:data_name[1]},
	            {value:data_value[2], name:data_name[2]},
	            {value:data_value[3], name:data_name[3]},
	            {value:data_value[4], name:data_name[4]},
	            {value:data_value[5], name:data_name[5]},
	            {value:data_value[6], name:data_name[6]},
	            {value:data_value[7], name:data_name[7]},
	            {value:data_value[8], name:data_name[8]},
	            {value:data_value[9], name:data_name[9]}
	        ]
	    }]
	}
	//重新调整视图工具的配置，将缩略图/视图类型切换控件隐藏
	option.toolbox.feature.dataZoom.show = false
	option.toolbox.feature.magicType.show = false
	MyEcharts_fifth.setOption(option)
}
var Fifth_keys = []
var Fifth_values = []
function Fifth_getJSON(){
	$.ajax({
        type: "post",
        url: "http://localhost:8080/queryJobCompanyData.action",
        async: true,
        dataType: "json",
        error:function (json){
        	$.map(json, function(name,data) {
        		Fifth_keys.push(name)
        		Fifth_values.push(data)
        		ChartFifth(Fifth_keys,Fifth_values)
        	})
        },
        success: function (json) {
        	$.map(json, function(name,data) {
        		Fifth_keys.push(name)
        		Fifth_values.push(data)
        		ChartFifth(Fifth_keys,Fifth_values)
        	})
        }
    })
}
$(function (){
	Fifth_getJSON()
})

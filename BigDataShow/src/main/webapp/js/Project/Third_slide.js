//图表交互功能函数
function ChartThird_interaction(){
	let Agent = navigator.userAgent
	if($(window).width() >= 1200 && $(window).width() <= 1700){
		if (Agent.indexOf("NET CLR") >= 0) {//IE
			document.querySelector("#mainThird-Salary").setAttribute('style', 'margin-top: 120px !important')
		}
	}
	
	for(let i =0;i<$(".JobThird-toggle-Classify").length-1;i++){
		$(".JobThird-toggle-Classify")[i].ins = i
		
		$($(".JobThird-toggle-Classify")[i]).off("mouseover").on("mouseover",function (){
			$($(".JobThird-toggle-Classify-content")[this.ins]).stop().slideToggle()
		})
		
		$($(".JobThird-toggle-Classify")[i]).off("mouseout").on("mouseout",function (){
			$($(".JobThird-toggle-Classify-content")[this.ins]).stop().slideToggle()
		})
	}
}


//工作经验>薪资图表初始化函数
function ChartThird_exp(data_jobname,data_high,data_low){
	var MyEcharts_third = echarts.init(document.querySelector("#mainThird-Salary"))
	var option = {
	    title: Title('各职位工作经验对应的薪资水平',null,"top",setPostion("Third-title-left")),
	    tooltip: tooltip('axis',null),
	    legend: legend("plain",setvisualMap(),setPostion("Third_legend_top"),"center",['最高薪资','最低薪资']),
	    toolbox: toolbox(setPostion("Third_toolbox")),
	    xAxis:  xAxis("工作年限",'category',data_jobname),
	    yAxis: yAxis("平均薪资水平",'value',null),
	    series: [
	        {
	            name:'最低薪资',
	            type:'line',
	            data:data_high,
	            markPoint: {
	            	symbolSize : setFontsize("Third_markP"),
	            	label: {
	                    fontSize: setFontsize("yAxis")
	                },
	                data: [
	                    {type: 'max', name: '最大值'},
	                    {type: 'min', name: '最小值'}
	                ]
	            },
	            markLine: {
	            	symbolSize : setFontsize("yAxis"),
	            	label: {
	                    fontSize: setFontsize("yAxis")
	                },
	                data: [
	                    {type: 'average', name: '平均值'}
	                ]
	            }
	        },
	        {
	            name:'最高薪资',
	            type:'line',
	            data:data_low,
	            markLine: {
	            	symbolSize : setFontsize("yAxis"),
	            	label: {
	                    fontSize: setFontsize("yAxis")
	                },
	                data: [
	                    {type: 'average', name: '平均值'},
	                    [{
	                        symbol: 'none',
	                        x: '90%',
	                        yAxis: 'max'
	                    }, {
	                        symbol: 'circle',
	                        label: {
	                            normal: {
	                            	color:"#293C59",
	                            	fontSize: setFontsize("Twoschool_subtitle"), 
	                                position: 'start',
	                                formatter: '最大值'
	                            }
	                        },
	                        type: 'max',
	                        name: '最高薪资'
	                    }]
	                ]
	            }
	        }
	    ]
	}
	
	//删除指定配置组件属性
	delete option.tooltip.Trigger
	delete option.legend.orient
	//更换指定配置组件属性
	option.tooltip.trigger = "axis"
	MyEcharts_third.setOption(option)
	Chart_Loading(MyEcharts_third)
}

//设置背景颜色
function setBackground(){
	if($(window).width() <= 768) {
		$(".JobThird-toggle-Classify-head:eq(0)").text("算法")
		$(".JobThird-toggle-Classify-head:eq(1)").text("大数据")
		$(".JobThird-toggle-Classify-head:eq(2)").text("人工智能")
    	return "rgb(247,247,247)"
    }else {
    	return "rgb(255,255,255)"
    }
}

//职位Top5图表
function ChartThird_rank(jobname,jobdata){
	var MyEcharts_third_rank = echarts.init(document.querySelector("#mainThird-rank_Salary"))
	var option = {
	    backgroundColor: setBackground(),
	    title: Title("职位薪资Top5","根据所选数据挑选出平均薪资水平最高/最低的职位进行展示","top","center"),
	    tooltip : tooltip('item',"{a} <br/>{b} : {c} (元)"),
	    toolbox: toolbox(12,17),
        visualMap: {
	        show: false,
	        min: 20000,
	        max: 200000,
	        inRange: {
	            colorLightness: [0, 1]
	        }
	    },
	    series : [
	        {
	            name:"薪资水平",
	            type:'pie',
	            radius : '55%',
	            center: ['50%', '50%'],
	            data:[
	                {value:jobdata[0], name:jobname[0]},
	                {value:jobdata[1], name:jobname[1]},
	                {value:jobdata[2], name:jobname[2]},
	                {value:jobdata[3], name:jobname[3]},
	                {value:jobdata[4], name:jobname[4]}
	            ].sort(function (a, b) { return a.value - b.value; }),
	            roseType: 'radius',
	            label: {
	                normal: {
	                    textStyle: {
	                    	fontSize: setFontsize("Twoschool_subtitle"),
	                        color: 'rgba(0, 0, 0, 0.6)'
	                    }
	                }
	            },
	            labelLine: {
	                normal: {
	                    lineStyle: {
	                        color: 'rgba(0, 0, 0, 0.6)'
	                    },
	                    smooth: 0.2,
	                    length: 10,
	                    length2: 20
	                }
	            },
	            itemStyle: {
	                normal: {
	                    color: 'red',
	                    shadowBlur: 200,
	                    shadowColor: 'rgba(255, 255, 255,1)'
	                }
	            },
	            animationType: 'scale',
	            animationEasing: 'elasticOut',
	            animationDelay: function (idx) {
	                return Math.random() * 200;
	            }
	        }
	    ]
	}
	
	//重新调整视图工具的配置，将缩略图/视图类型切换控件隐藏
	option.toolbox.feature.dataZoom.show = false
	option.toolbox.feature.magicType.show = false
	MyEcharts_third_rank.setOption(option)
	Chart_Loading(MyEcharts_third_rank)
}

//格式化职位薪资Top5图表数据
function ranking_update(data){
	var ThirdJob_name = []
	var ThirdJob_data = []
	if(typeof data === "object"){
		var json = data
	}else {
		var json =  $.parseJSON(data)
	}
	$.map(json,function (data,rankname){
		ThirdJob_name.push(rankname)
		ThirdJob_data.push(data)
		ChartThird_rank(ThirdJob_name,ThirdJob_data)
	})
}

//初始化两个图表数据
function Third_ajax_getjson(id,falg) {
    $.ajax({
        type: "post",
        url: "http://localhost:8080/queryJobSalaryData.action",
        async: true,
        data: {id: id},
        dataType: "json",
        error:function (json){
        	alert("哦豁，出错了")
        },
        success: function (json) {
        	if(falg){
//        		初始化工作经验>薪资图表
        		$(".JobThird-Job").text(json[0])
            	ChartThird_exp(json[1],json[2],json[3])
        	}else {
//        		初始化职位薪资Top5图表
        		ranking_update(json)
        	}
        }
    })
}

//两个图表动态请求数据
function Third_dynamic_getJSON(classname,falg){
	
   $.each($(classname), function (index, value) {
       $($(classname)[index]).on("click", function () {
    	   if(falg){
//    		   表示为工作经验薪资图表更新数据
    		   $(".activeThird-data").removeClass("activeThird-data")
               $(this).addClass("activeThird-data")
    	   }else {
//    		   表示为薪资Top5图表更新数据
    		   $(".active-average-iconback").removeClass("active-average-iconback")
        	   $(".active-average").removeClass("active-average")
        	   $(this).addClass('active-average')
        	   $(this).children().addClass("active-average-iconback")
    	   }
		   var reg = new RegExp("[\u4e00-\u9fa5]")
		   var Text = []
    	   for(var i = 0;i<=$(this).text().length;i++){
			   if(reg.exec($(this).text()[i])){
				   Text.push($(this).text()[i])
			   }
		   }
    	   var id = Text.join("")
           var date = new Date()
           $.post("http://localhost:8080/queryJobSalaryData.action?time="+date.getDate(), {id: encodeURI(id,"UTF-8")}, function (data) {

        	   if(falg){
				    var json = eval(data)
        		    $(".JobThird-Job").text(json[0])
               		ChartThird_exp(json[1],json[2],json[3])
        	   }else {
        	   	   console.log(data)
        		   ranking_update(data)
        	   }
           })
       })
   })
}


$(function (){
//	ajax初始化图表
	Third_ajax_getjson("算法",true)
	Third_ajax_getjson("最高薪资",false)
	
//	动态更新图标数据
	Third_dynamic_getJSON(".data-third",true)
	Third_dynamic_getJSON(".JobThird-average-toggle",false)
	
//	图表交互功能函数
	ChartThird_interaction()
})

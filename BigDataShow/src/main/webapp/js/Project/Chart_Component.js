// 响应式字体-字体大小
function setFontsize(target) {
    // 手机端字体
    if ($(window).width() >= 320 && $(window).width() <= 420) {
        if (target == "xAxis") {
            return 6
        } else if (target == "title") {
            return 9
        } else if (target == "yAxis") {
            return 6
        } else if (target == "axisPointer") {
            return 6
        } else if (target == "legend") {
            return 7
        } else if (target == "toolbox") {
            return 11
        } else if (target == "toolbox_gap") {
            return 2
        } else if (target == "Twoschool_title") {
            return 10
        } else if (target == "Twoschool_subtitle") {
            return 7
        } else if (target == "Twoschool_titlegaip") {
            return 2
        } else if (target == "Twoschool_legend") {
            return 7
        } else if (target == "Two_series_emphasis") {
            return 10
        } else if (target == "Two_tooltip") {
            return 6
        } else if (target == "Third_markP"){
        	return 0
        } else if (target == "Fourth_visvalMap"){
        	return 12
        } else if (target == "Fourth_ItemGap"){
        	return 2
        }
        // IPAD 端字体
    } else if ($(window).width() >= 768 && $(window).width() <= 920) {
        if (target == "xAxis") {
            return 9
        } else if (target == "title") {
            return 12
        } else if (target == "yAxis") {
            return 9
        } else if (target == "axisPointer") {
            return 9
        } else if (target == "legend") {
            return 9
        } else if (target == "toolbox") {
            return 9
        } else if (target == "toolbox_gap") {
            return 3
        } else if (target == "Twoschool_title") {
            return 15
        } else if (target == "Twoschool_subtitle") {
            return 12
        } else if (target == "Twoschool_titlegaip") {
            return 8
        } else if (target == "Two_tooltip") {
            return 13
        } else if (target == "Twoschool_legend") {
            return 11
        } else if (target == "Two_series_emphasis") {
            return 20
        }
        // IPAD Pro 端字体
    } else if ($(window).width() >= 920 && $(window).width() <= 1200) {
        if (target == "xAxis") {
            return 11
        } else if (target == "title") {
            return 14
        } else if (target == "yAxis") {
            return 11
        } else if (target == "legend") {
            return 12
        } else if (target == "toolbox") {
            return 13
        } else if (target == "toolbox_gap") {
            return 7
        } else if (target == "Twoschool_title") {
            return 16.5
        } else if (target == "Twoschool_subtitle") {
            return 13.5
        } else if (target == "Twoschool_titlegaip") {
            return 11
        } else if (target == "Two_tooltip") {
            return 12.5
        } else if (target == "Twoschool_legend") {
            return 12.5
        } else if (target == "Two_series_emphasis") {
            return 25
        }else if (target == "axisPointer") {
            return 11
        }
        //PC 端字体
    }else if($(window).width() >= 1700){
    	if (target == "Twoschool_title") {
            return 20
        }else if (target == "Twoschool_subtitle") {
            return 15
        }else if (target == "Twoschool_titlegaip") {
            return 10
        }else if (target == "Two_tooltip") {
            return 18
        }else if (target == "Twoschool_legend") {
            return 15
        }else if (target == "toolbox") {
            return 18
        }else if (target == "toolbox_gap") {
            return 9
        }else if (target == "xAxis") {
            return 15
        }else if (target == "yAxis") {
            return 15
        }else if (target == "Two_tooltip") {
            return 10
        }else if (target == "axisPointer") {
            return 15
        }else if (target == "Two_series_emphasis") {
            return 35
        }else if (target == "map_item") {
            return 15
        }
    	
    }//  笔记本端字体
    else {
        if (target == "xAxis") {
            return 13
        } else if (target == "title") {
            return 17
        } else if (target == "yAxis") {
            return 13
        } else if (target == "legend") {
            return 13
        } else if (target == "toolbox") {
            return 13
        } else if (target == "toolbox_gap") {
            return 8
        } else if (target == "Twoschool_title") {
            return 17
        } else if (target == "Twoschool_subtitle") {
            return 11
        } else if (target == "Twoschool_titlegaip") {
            return 13
        } else if (target == "Twoschool_legend") {
            return 12
        } else if (target == "Two_series_emphasis") {
            return 30
        } else if (target == "Two_tooltip") {
            return 14
        }else if (target == "axisPointer") {
            return 13
        }else if (target == "Third_markP"){
        	return 50
        }else if (target == "Fourth_visvalMap"){
        	return 14
        } else if (target == "Fourth_ItemGap"){
        	return 4
        }
    }
}

//	 响应式图例组件-图例大小
function ItemWidth_Height(target) {
    // 手机端
    if ($(window).width() >= 320 && $(window).width() <= 420) {
        if (target == "width") {
            return 8
        }
        if (target == "Twoschool_legendW") {
            return 11
        } else if (target == "Twoschool_legendH") {
            return 7
        } else if (target == "Twoschool_legendI") {
            return 1
        } else if (target == "Fourth_legendW") {
            return 15
        } else if (target == "Fourth_legendH") {
            return 8
        }  else {
            return 5
        }

        // IPAD 端
    } else if ($(window).width() >= 768 && $(window).width() <= 920) {
        if (target == "width") {
            return 10
        } else if (target == "Twoschool_legendW") {
            return 11
        } else if (target == "Twoschool_legendH") {
            return 7
        } else if (target == "Twoschool_legendI") {
            return 5
        } else if (target == "Fourth_legendW") {
            return 14
        } else if (target == "Fourth_legendH") {
            return 9
        } else {
            return 7
        }
        // IPAD Pro 端
    } else if ($(window).width() >= 920 && $(window).width() <= 1200) {
        if (target == "width") {
            return 12
        } else if (target == "Twoschool_legendW") {
            return 17
        } else if (target == "Twoschool_legendH") {
            return 10
        } else if (target == "Twoschool_legendI") {
            return 7
        } else {
            return 8
        }
        // PC 端
    }else if($(window).width() >= 1700){
    	if (target == "Twoschool_legendW") {
            return 27
        } else if (target == "Twoschool_legendH") {
            return 15
        } else if (target == "Twoschool_legendI") {
            return 13
        } else if (target == "Fourth_legendW") {
            return 27
        } else if (target == "Fourth_legendH") {
            return 15
        } else {
            return 9
        }
    } //笔记本端
    else {
        if (target == "width") {
            return 14
        }else if (target == "Twoschool_legendW") {
            return 25
        } else if (target == "Twoschool_legendH") {
            return 14
        } else if (target == "Twoschool_legendI") {
            return 10
        } else if (target == "Fourth_legendW") {
            return 25
        } else if (target == "Fourth_legendH") {
            return 14
        } else if (target == "Fourth_ItemGap"){
        	return 5
        } else {
            return 9
        }
    }
}

//响应式选框-刻度线Label
function setPadding(target) {
    // 手机端
    if ($(window).width() >= 320 && $(window).width() <= 420) {
        if (target == "axisPointer") {
            return [0.5, 1, 0.5, 1]
        }
        // IPAD 端
    } else if ($(window).width() >= 768 && $(window).width() <= 920) {
        if (target == "axisPointer") {
            return [3, 5, 3, 5]
        }
        // IPAD Pro 端
    } else if ($(window).width() >= 920 && $(window).width() <= 1200) {
        if (target == "axisPointer") {
            return [4, 6, 4, 6]
        }
        // PC 端
    } else {
        if (target == "axisPointer") {
            return [5, 7, 5, 7]
        }
    }
}

// 响应式选框-标记框大小
function setSymbolSize() {
    // 手机端
    if ($(window).width() >= 320 && $(window).width() <= 420) {
        return 25
        // IPAD 端
    } else if ($(window).width() >= 768 && $(window).width() <= 920) {
        return 40
        // IPAD Pro 端
    } else if ($(window).width() >= 920 && $(window).width() <= 1200) {
        return 45
        // PC 端
    } else if($(window).width() >= 1700){
    	return 75
    }//笔记本端
    else {
        return 60
    }
}

// 响应式选框-缩放框大小
function setDataZoomSize() {
    // 手机端
    if ($(window).width() >= 320 && $(window).width() <= 420) {
        return 10
        // IPAD 端
    } else if ($(window).width() >= 768 && $(window).width() <= 920) {
        return 15
        // IPAD Pro 端
    } else if ($(window).width() >= 920 && $(window).width() <= 1200) {
        return 20
        // PC 端
    } else {
        return 25
    }
}

//设置响应式图表配置项位置
function setPostion(target) {
    // 手机端
    if ($(window).width() >= 320 && $(window).width() <= 420) {
        if (target == "legend-top") {
            return 50
        } else if (target == "legend-left") {
            return 20
        }else if(target == "Third_toolbox"){
        	return 0
        }else if(target == "Third_legend_top"){
        	return 15
        }else if(target == "Fourth_title_top"){
        	return 5
        }else if(target == "Fourth-legend-top"){
        	return "bottom"
        }else if(target == "Fifth-legend-top"){
        	return "bottom"
        }
        // IPAD 端
    } else if ($(window).width() >= 768 && $(window).width() <= 920) {
        if (target == "legend-top") {
            return 60
        } else if (target == "legend-left") {
            return 120
        } else if (target == "title-left") {
            return 0
        }  else if (target == "Fifth-legend-top") {
            return 120
        }
        // IPAD Pro 端
    } else if ($(window).width() >= 920 && $(window).width() <= 1200) {
        if (target == "legend-top") {
            return 60
        } else if (target == "legend-left") {
            return 50
        } else if (target == "title-left") {
            return 0
        }  else if (target == "Fifth-legend-top") {
            return 150
        }
        // PC 端
    } else {
        if (target == "legend-top") {
            return 70
        } else if (target == "legend-left") {
            return 0
        }else if (target == "title-left") {
            return 0
        }else if(target == "Third_toolbox"){
        	return 22
        }else if(target == "Third_legend_top"){
        	return 0
        }else if(target == "Fourth_title_top"){
        	return 10
        }else if(target == "Fifth-legend-top"){
        	return 70
        }
    }
}

//设置响应式学历图表图形的大小位置
function setSeries(target) {
    // 手机端
    if ($(window).width() >= 320 && $(window).width() <= 420) {
        if (target == "series-radius") {
            return ['50%', '60%']
        } else if (target == "series-center") {
            return ['55%', '60%']
        } else if(target == "Fifth-center"){
        	return ["50%","48%"]
        }
        // IPAD 端
    } else if ($(window).width() >= 768 && $(window).width() <= 920) {
        if (target == "series-radius") {
            return ['50%', '70%']
        } else if (target == "series-center") {
            return ['60%', '60%']
        }
        // IPAD Pro 端
    } else if ($(window).width() >= 920 && $(window).width() <= 1200) {
        if (target == "series-radius") {
            return ['50%', '70%']
        } else if (target == "series-center") {
            return ['50%', '60%']
        }
        // PC 端
    } else {
        if (target == "series-radius") {
            return ['50%', '70%']
        } else if (target == "series-center") {
            return ['50%', '50%']
        } else if(target == "Fifth-center"){
        	return ["55%","52%"]
        }
    }
}

//设置响应式工作经验图表的视图映射组件的位置
function setvisualMap(target) {
    // 手机端
    if ($(window).width() >= 320 && $(window).width() <= 420) {
    	if(target == "Fifth-legend"){
    		return 'horizontal'
    	}else {
    		return 'vertical'
    	}
        // IPAD 端
    } else if ($(window).width() >= 768 && $(window).width() <= 920) {
        return 'vertical'
        // IPAD Pro 端
    } else if ($(window).width() >= 920 && $(window).width() <= 1200) {
        return 'vertical'
        // PC 端
    } else {
    	if(target == "Fifth-legend"){
    		return 'vertical'
    	}else {
    		return 'horizontal'
    	}
    }
}

//设置响应式工作经验图表的视图映射组件大小
function setvisualMapW_H(target) {
    // 手机端
    if ($(window).width() >= 320 && $(window).width() <= 420) {
        if (target == "visualMapW") {
            return 5
        } else if (target == "visualMapH") {
            return 35
        }
        // IPAD 端
    } else if ($(window).width() >= 768 && $(window).width() <= 920) {
        if (target == "visualMapW") {
            return 10
        } else if (target == "visualMapH") {
            return 50
        }
        // IPAD Pro 端
    } else if ($(window).width() >= 920 && $(window).width() <= 1200) {
        if (target == "visualMapW") {
            return 15
        } else if (target == "visualMapH") {
            return 90
        }
        // PC 端
    } else {
        if (target == "visualMapW") {
            return 20
        } else if (target == "visualMapH") {
            return 140
        }
    }
}

//设置响应式工作经验图表的视图映射组件位置
function setvisualMaoPostion(target) {
    // 手机端
    if ($(window).width() >= 320 && $(window).width() <= 420) {
        if (target == "visualMap_left") {
            return "10"
        } else if (target == "visualMap_bottom") {
            return "middle"
        }
        // IPAD 端
    } else if ($(window).width() >= 768 && $(window).width() <= 920) {
        if (target == "visualMap_left") {
            return "10"
        } else if (target == "visualMap_bottom") {
            return "middle"
        }
        // IPAD Pro 端
    } else if ($(window).width() >= 920 && $(window).width() <= 1200) {
        if (target == "visualMap_left") {
            return "center"
        } else if (target == "visualMap_bottom") {
            return "15"
        }
        // PC 端
    } else {
        if (target == "visualMap_left") {
            return "center"
        } else if (target == "visualMap_bottom") {
            return "15"
        }
    }
}

//设置图标工具栏在IE，Chrome，Firefox，Edge浏览器的位置兼容
function setvisualMapPosi(target){
	var Agent = navigator.userAgent;
    if ($(window).width() >= 320 && $(window).width() <= 420) {
    	if(target == "visualMap"){
    		return "1%"
    	}
    } else if ($(window).width() >= 768 && $(window).width() <= 920) {
    	if(target == "visualMap"){
    		return "5%"
    	}
    } else if ($(window).width() >= 920 && $(window).width() <= 1200) {
    	if(target == "visualMap"){
    		return "10%"
    	}
    } else if($(window).width() >= 1700) {
    	if(target == "visualMap"){
    		if (Agent.indexOf("NET CLR") >= 0) {//IE
    			return "10%"
    		}else if (Agent.indexOf("Firefox") >= 0) {//Firefox
    			return "5%"
    		}else if(Agent.indexOf("Edge") >= 0){//Edge
    			return "2%"
    		}else if(Agent.indexOf("Chrome") >= 0){//Chrome
    			return "5%"
    		}
    	}
    } else {
    	if(target == "visualMap"){
    		//判断当前浏览器
    		if (Agent.indexOf("NET CLR") >= 0) {//IE
    			return "13.5%"
    		}
    		else if (Agent.indexOf("Firefox") >= 0) {//Firefox
    			return "10%"
    		}else if(Agent.indexOf("Edge") >= 0){//Edge
    			return "3%"
    		}else if(Agent.indexOf("Chrome") >= 0){//Chrome
    			return "7%"
    		}
    	}
    }
}

//标题组件函数
function Title(text,subtext,top,left){
	return {
        text: text,
        top: top,
        left: left,
        subtext: subtext,
        textStyle: {
            fontSize: setFontsize("Twoschool_title")
        },
        subtextStyle: {
            fontSize: setFontsize("Twoschool_subtitle")
        },
        itemGap: setFontsize("Twoschool_titlegaip")
    }
}

//工具提示组件函数
function tooltip(tri,formatter){
	return  {
            Trigger: tri,
            formatter: formatter,
            enterable: false,
            padding: 7,
            textStyle: {
                fontFamily: "Helvetica Neue",
                fontSize: setFontsize("Two_tooltip")
            },
            //移动过渡时间
            transitionDuration: 0.6,
            extraCssText: "box-shadow:1px 1px 3px rgba(0,0,0,0.5)"
        }
}

//图例组件
function legend(type,orient,Y,X,data){
	return {
        type: type,
        orient: orient,
        itemWidth: ItemWidth_Height("Twoschool_legendW"),
        itemHeight: ItemWidth_Height("Twoschool_legendH"),
        itemGap: ItemWidth_Height("Twoschool_legendI"),
        y: Y,
        x: X,
        textStyle: {
            fontSize: setFontsize("Twoschool_legend")
        },
        data: data
    }
}

//工具栏组件
function toolbox(right,Isshow,bottom){
	if ($(window).width() >= 320 && $(window).width() <= 420) {
		Isshow = false
    } else {
		Isshow = true
	}
	return {
        right: right,
        bottom: bottom,
        showTitle: Isshow,
        itemSize: setFontsize("toolbox"),
        itemGap: setFontsize("toolbox_gap"),
        feature: {
            dataView: {readOnly: false},
            restore: {show: true},
            saveAsImage: {show: true},
            dataZoom: {show: true},
            magicType: {type: ['line', 'bar']}
        }
    }
}

//X轴组件
function xAxis(name,type,data){
	return {
        //	 X轴数据每隔一个信息不显示的原因是柱子之间间距太小，将axisTick改为axisLabel,然后将interval改变间距,1代表两个柱子之间间距一个【被间距的那个不显示】，0代表不间距
        name: name,
        type: type,
        nameTextStyle: {
            fontSize: setFontsize("xAxis")
        },
        boundaryGap : true,
        axisLabel: {
            interval: 0,
            alignWithLabel: true,
            textStyle: {
                fontSize: setFontsize("xAxis")
            }
        },
        data:  data,
    }
}

//Y轴组件
function yAxis(name,type,data){
	return {
        name: name,
        type:type,
        nameLocation: "end",
        nameGap: setFontsize("Two_tooltip") ,
        boundaryGap : true,
        nameTextStyle: {
            fontSize: setFontsize("yAxis")
        },
        axisLabel: {
            interval: 0,
            alignWithLabel: true,
            textStyle: {
                fontSize: setFontsize("yAxis")
            }
        },
        axisPointer: {
            show: true,
            type: "shadow",
            fontSize: setFontsize("yAxis"),
            label: {
                show: true,
                fontFamily: ['serif', 'monospace', 'Arial', 'Courier New', 'Microsoft YaHei'],
                fontSize: setFontsize("yAxis"),
                padding: setPadding("axisPointer")
            }
        },
        data: data
    }
}

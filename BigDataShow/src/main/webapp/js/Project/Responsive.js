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

//	顶部通栏【EN】工具提示框功能
function Tooltip() {
    $(".dataZoom_close").tooltip({
        animation: true,//提示框添加淡入淡出效果
        trigger: "hover focus",//以鼠标悬停，获取焦点的方式触发显示提示框
        placement: "auto right",//提示框的位置默认自动设定，优先left左边
        delay: {show: 400, hide: 100},//提示框的显示延迟为500毫秒，隐藏为100毫秒
        container: 'body'
    })

    $("#Job_modal").modal({
        show: false,
        backdrop: false,
        keyboard: true
    })
    if($(window).width() >= 1700){
    	$(".Left_item").on({
    		"mouseover":function () {
    	        $(this).stop().animate({width: "275px"}, "swing")
    	    },
    	    "mouseleave":function () {
    	        $(this).stop().animate({width: "260px"}, "swing")
    	    }
    	})
    }else {
    	$(".Left_item").on({
    		"mouseover":function () {
    	        $(this).stop().animate({width: "215px"}, "swing")
    	    },
    	    "mouseleave":function () {
    	        $(this).stop().animate({width: "200px"}, "swing")
    	    }
    	})
    }
    

    // 中英文按钮切换样式
    let falg_Eng_CN = true
    $(".Eng_CN").on("click", function () {
        if (falg_Eng_CN) {
            $(this).stop().animate({"float": "left"})
            $(this).css({
                "transform": "translateX(0px)",
                "-ms-transform": "translateX(0px)",
                "border": "none",
                "transition": "transform 0.3s,border 0.3s",
            })
            $(".Eng_CN_to").stop().fadeIn()
            $(".Eng_CN_to").css({
                "display": "inline-block",
                "border-bottom": "3px solid rgb(228,60,89)",
                "transition": "color 0.3s,border 0.3s"
            })
            $(".Eng_CN-icon").removeClass("glyphicon-menu-left").addClass("glyphicon-menu-right")
            falg_Eng_CN = false
        } else {
            $(this).stop().animate({"float": "none"})
            $(this).css({
                "transform": "translateX(80px)",
                "-ms-transform": "translateX(80px)",
                "border-bottom": "3px solid rgb(228,60,89)",
                "transition": "transform 0.3s,border 0.3s"
            })
            $(".Eng_CN_to").stop().fadeOut()
            $(".Eng_CN_to").css({
                "border": "none",
                "transition": "color 0.3s,border 0.3s"
            })
            $(".Eng_CN-icon").removeClass("glyphicon-menu-right").addClass("glyphicon-menu-left")
            falg_Eng_CN = true
        }
    })
}

//左侧通栏选项功能
function Options() {
	
    let falg_option = true
    $(".Options-Header").on("click", function () {
        if (falg_option) {
            $(".Options-Header-icon").removeClass("glyphicon-menu-left").addClass("glyphicon glyphicon-menu-down")
            falg_option = false
        } else {
            $(".Options-Header-icon").removeClass("glyphicon-menu-down").addClass("glyphicon glyphicon-menu-left")
            falg_option = true
        }
    })
//			刷新页面
    $($("#option").children()[0]).on("click", function () {
        location.reload(true)
    })
    
//			全屏页面
    $($("#option").children()[1]).on("click", function () {
    	let Agent = navigator.userAgent
		let fullscreenEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled
        if (document.querySelector("#fullpage").requestFullScreen) {
            document.querySelector("#fullpage").requestFullScreen()
        } else if (document.querySelector("#fullpage").webkitRequestFullScreen) {
            document.querySelector("#fullpage").webkitRequestFullScreen()
            /**
             * 由于Edge浏览器拥有Chrome内核，同时又没有支持此浏览器的全屏函数
             * 所以通过判断浏览器内核来进行分别渲染全屏后的样式
             * */
            if (Agent.indexOf("Edge") >= 0) {//Edge
            	  document.querySelector("#main").setAttribute('style', 'margin-top: 160px;')
            	  document.querySelector(".Tool").setAttribute('style', '-webkit-transform:translate(-95px,120px);')
            	  document.querySelector("#mainTwo-school").setAttribute('style', 'height: 650px;')
	              document.querySelector("#mainTwo-salary").setAttribute('style', 'height: 650px;')
	              document.querySelector(".mainTwo-TopJob").setAttribute('style', 'font-size: 18px;')
	              document.querySelector(".Tool-Two").setAttribute('style', 'width: 110px;height: 105px;margin-left: 110px;-webkit-transform: translateY(-170px);')
	              $(".Tool-Two-content > li").css({
	              	'height': '25px',
	              	'line-height': '25px',
	              	'font-size': '18px'
	              })
	              document.querySelector("#mainThird-Salary").setAttribute('style', 'margin-top: 210px;')
	              document.querySelector("#mainThird-rank_Salary").setAttribute('style', 'margin-top: 210px;')
	              document.querySelector("#mainFourth").setAttribute('style', 'width:100%;height: 1100px;margin-left: 3.5rem;')
        	}
        } else if (document.querySelector("#fullpage").mozRequestFullScreen) {
            document.querySelector("#fullpage").mozRequestFullScreen()
            document.querySelector("#mainFourth").setAttribute('style', 'height: 815px;')
        } else{
            document.querySelector("#fullpage").msRequestFullscreen()
            document.querySelector("#main").setAttribute('style', 'margin-top: 160px;')
            document.querySelector("#mainTwo-school").setAttribute('style', 'height: 650px;')
            document.querySelector("#mainTwo-salary").setAttribute('style', 'height: 650px;')
            document.querySelector(".mainTwo-TopJob").setAttribute('style', 'font-size: 18px;')
            document.querySelector(".Tool-Two").setAttribute('style', 'width: 110px;height: 105px;margin-left: 70px;-ms-transform: translateY(-150px);')
            document.querySelector(".Tool-Two-content > li").setAttribute('style', 'height: 25px;line-height: 25px;font-size: 16px;')
            document.querySelector("#mainThird-Salary").setAttribute('style', 'margin-top: 210px;')
            document.querySelector("#mainThird-rank_Salary").setAttribute('style', 'margin-top: 210px;')
            document.querySelector("#mainFourth").setAttribute('style', 'width:100%;height: 1100px;margin-top:0px;')
			//IE样式兼容
            if(fullscreenEnabled == true){//代表进入全屏状态
            	$("#fullpage").css({
            		"background": "rgb(255,255,255)!important"
            	})
            }
        }
    	
    })
    
    //当退出全屏状态后，由于浏览器未及时更新页面样式，所以在按下ESC键退出全屏时，进行刷新操作
    $("body").on("keyup",function (event){
    	var e  = event || window.event
    	if(e.keyCode == 27){
    		location.reload(true)
    	}
    })
    
	/* 
	 * 全屏改变样式
	 * 由于Chrome,Firefox退出全屏后会影响一些页面样式，
	 * 所以让Chrome，Firefox内核的浏览器刷新一次，重新获取样式【从缓存中拿取】
	 * 【借助IE内核不支持此操作，但是全屏后不影响页面样式】
	 * */
    document.addEventListener("fullscreenchange", function( event ) {
	  if (document.fullscreenElement) {
	  	/*进入全屏*/
	  } else {
	  	location.reload(false)
	 }})
	 
	// 关闭/退出页面
    $($("#option").children()[2]).on("click", function () {
    	//由于Chrome 与 Firefox 浏览器不支持JS直接操控未由JS打开的标签页关闭，所以只能通过将其设定为新标签页的形式代表关闭页面
        if (confirm("您确定要关闭本页并跳转到新页面吗？")) {
            if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") != -1) {
                window.location.href = "about:blank"
                window.close()
            } else {
            	//其他浏览器，如Edge，IE则没有这种问题，直接关闭当前标签页
                window.opener = null
                window.open("", "_self")
                window.close()
            }
        } else {}
    })
    
}

//	左右平滑控制导航栏切换样式
function Smooth(classname, fa_classname, add_Classname, judge_Classname, target_Classname, num) {
    //调用者类名  父元素类名  要添加的类名   要判断的类名  要添加样式的元素的类名
	let fer = true
    $(classname).on('click', function () {
        if (fer) {
            for (var i = 0; i < $(fa_classname).children().length - 1; i++) {
                if ($(target_Classname)[i].classList[1] == judge_Classname) {
                    if (i == num) {
                        num == 4 ? $(fa_classname).children()[0].className = add_Classname : num == 0 ? $(fa_classname).children()[4].className = add_Classname : false
                    } else {
                        num == 4 ? $(fa_classname).children()[i + 1].className += add_Classname : num == 0 ? $(fa_classname).children()[i - 1].className += add_Classname : false
                    }
                    $(fa_classname).children()[i].className = " "
                }
            }
            fer = true
        } else {
            fer = false
            return false
        }
    })
}

// 响应式底部通栏点击平滑块切换样式
function Bottom_item() {
	var index = 0
	var Ospan = $(".Bottom_item_list > li > span")
    $(".next").on('click', function () {
        if (index <= Ospan.length) {
            if ($(Ospan[index]).hasClass("Bottom_item_back")) {
                $(Ospan[index]).removeClass("Bottom_item_back")
                $(Ospan[index + 1]).addClass("Bottom_item_back")
                if (index == 4) {
                    index = 0
                    $(Ospan[0]).addClass("Bottom_item_back")//给来通过第一次判断【第一个角标span是否有类样式】
                } else {
                    index++
                }
            }
        }
    })

    $(".prev").off("click").on('click', function () {
        if (index <= Ospan.length) {
            if ($(Ospan[index]).hasClass("Bottom_item_back")) {
                $(Ospan[index]).removeClass("Bottom_item_back")
                $(Ospan[index - 1]).addClass("Bottom_item_back")
                if (index == 0) {
                    index = 4
                    $(Ospan[4]).addClass("Bottom_item_back")//给来通过第一次判断【第一个角标span是否有类样式】
                } else {
                    index--
                }
            }
        }
    })
}

//	导航栏切换样式函数
function Left_item() {
    //	点击切换导航栏目样式
    for (var i = 0; i < $(".mynav").children().length - 1; i++) {
        $($(".mynav").children()[i]).on("click", function () {
            if ($(this)[0].classList[0] == "actives") {
                return false
            } else {
                $(this)[0].className += "actives"

                var Nodes = []
                for (var i = 0; i < $(".mynav").children().length - 1; i++) {
                    if ($(".mynav").children()[i] != $(this)[0]) {
                        Nodes.push($(".mynav").children()[i])
                    }
                }
                for (var o = 0; o < Nodes.length; o++) {
                    if (Nodes[o].className.toString().indexOf("s") != -1) {
                        Nodes[o].className = " "
                    }
                }
            }
        })
    }

}

//加载动画函数
var time_His = null

function Chart_Loading(myEcharts) {
    myEcharts.showLoading({
        text: '加载中....',
        color: '#c23531',
        //	文本颜色
        textColor: '#000',
        //	 线条颜色
        maskColor: 'rgba(255, 255, 255, 0.8)',
        //	 相当于z-index
        zlevel: 0
    })

    time_His = setTimeout(function () {
        //暂停加载中 动画
        myEcharts.hideLoading()
    }, 500)
}

clearTimeout(time_His)

/*
 * 注意：IE不支持比较老的jquery版本中的$(function(){})函数，
 * 所以要使用原生JS的window.onload = function (){} 来兼容
 * */
window.onload = function (){
	//工具提示函数
	    Tooltip()
	//导航栏切换样式函数
	    Left_item()
	//左侧通栏选项功能函数
	    Options()
	//响应式底部通栏
	    Bottom_item()
	// PC端左平滑
	    Smooth(".prev", ".mynav", "actives", "active", ".slide", 0)
	// PC端右平滑
	    Smooth(".next", ".mynav", "actives", "active", ".slide", 4)
}

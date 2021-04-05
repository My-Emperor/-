/**
 * @constructor
 * @module 第四维度图表功能交互模块
 * @desc 由全局函数setTimeout() 定时器检测，如果用户切换到地图维度，则在顶部通栏显示职位搜索栏，否则将其隐藏，
 * 		并根据用户的终端设备，改变左右平滑图标的左右偏移值
 * @return void
 * */
function ChartFourth_interaction() {
	//切换到地图维度
	if ($(".mynav > li:eq(3)").hasClass("actives")) {
		if ($(window).width() <= 768) {
			$(".myLeft").css({"left": "1%"})
		} else if ($(window).width() >= 992 && $(window).width() <= 1200) {
			$(".myLeft").css({"left": "8%"})
		} else {
			$(".myLeft").css({"left": "20px"})
		}
		$(".controlArrow").css({
			"width": "65px",
			"height": "45%",
			"bottom": "20%"
		})
		$(".mylist").css({"height": "0"})
		$("#FourthJob_Control").stop().fadeIn()
	} else {
		//在其他维度
		$(".controlArrow").css({
			"width": "105px",
			"height": "93%",
			"bottom": "0"
		})
		$(".mylist").css({"height": "0px"})
		$("#FourthJob_Control").stop().fadeOut()
	}
}

/**
 * @constructor
 * @module 第四维度图表动态请求数据模块
 * @desc 在页面初始化或者用户通过职位搜索栏搜索某一职位动态获取数据时，在此将数据进行不同的格式化，并调用Chart_Fourth() 图表初始化函数以加载地图以及图表数据
 * @return void
 * */
function Fourth_getjson() {

//	POST请求初始化地图
	$.ajax({
		type: "post",
		url: "http://localhost:8080//queryJobAddrCoordData.action",
		async: true,
		data: {id: "算法"},
		dataType: "text",
		error: function () {
			alert("地区数据获取错误")
		},
		success: function (json) {
			//截取数组字符串[]范围内的数组字符串,之后将JSON数组字符串使用eval函数重构成数组对象
			var Citys = eval(json.substr(json.indexOf("["), json.indexOf("]") + 1))
			//截取对象字符串{}范围内的对象字符串,之后将JSON对象字符串使用JSON.parse解析为JSON对象
			var CoorMaps = JSON.parse(json.substring(json.indexOf("]") + 1, json.length))
			var Maps = {}
			$.map(CoorMaps, function (coord, city) {
				Maps[city] = eval(coord)
			})
			Chart_Fourth(Citys, Maps)
		}
	})

//	后台获取全部职位数据，以加载到提示框中以待用户输入时即时显示补全
	$(".FourthJob-put").autocomplete({
		source: "http://localhost:8080/queryAddrJobAllData.action"
	})

//    动态获取职位数据
	$("#Fourthsearch").on("click", function () {
		let id = encodeURI(document.querySelector(".FourthJob-put").value, "UTF-8")
		let date = new Date()
		$.post("http://localhost:8080//queryJobAddrCoordData.action?time=" + date.getDate(), {id: id}, function (json) {
			//截取数组字符串[]范围内的数组字符串,之后将JSON数组字符串使用eval函数重构成数组对象
			var Citys = eval(json.substr(json.indexOf("["), json.indexOf("]") + 1))
			//截取对象字符串{}范围内的对象字符串,之后将JSON对象字符串使用JSON.parse解析为JSON对象
			var CoorMaps = JSON.parse(json.substring(json.indexOf("]") + 1, json.length))
			var Maps = {}
			$.map(CoorMaps, function (coord, city) {
				/*由于传递过来的坐标数据为数组字符串，为匹配地图数据所需要的Number格式，
                通过eval() 函数将其重构成数组类型，并将其再一一存储到对象中*/
				Maps[city] = eval(coord)
			})
			Chart_Fourth(Citys, Maps)
		})
	})
}

/**
 * @constructor
 * @module 第四维度百度地图初始化模块
 * @desc 百度地图初始化函数，由Chart_Fourth()函数调用，在后台获取到城市以及坐标数据之后，将图表实例传入，
 * 		使用百度地图API配合传入的图表实例在页面上创建一个百度地图并显示对应的图表数据，并设定百度地图的样式以及功能
 * @param {Object} myEchartsFourth 图表实例，用于配合百度地图API创建地图
 * @return void
 * */
function Baidu_map(myEchartsFourth) {
	let Agent = navigator.userAgent;
	//如果PC端用户打开的是IE浏览器或Edge浏览器，则改变百度地图的高度以覆盖全屏显示
	if ($(window).width() >= 1700) {
		if (Agent.indexOf("NET CLR") >= 0) {//IE
			document.querySelector("#mainFourth").setAttribute('style', 'height: 800px!important;margin-top:0px!important;')
		} else if (Agent.indexOf("Edge") >= 0) {
			document.querySelector("#mainFourth").setAttribute('style', 'height: 940px!important')
		}
	}

	/*
      使用百度地图API将当前Echarts图表对象myEchartsFourth 封装成百度地图对象实例
     * */
	var bmap = myEchartsFourth.getModel().getComponent('bmap').getBMap()

	// 创建点坐标  ,设置地图显示的地区位置X轴，Y轴【越高越上，越低越下】
	// 初始化地图，设置中心点坐标,根据中心点创建出地图，和地图缩放级别  【最大19，最小0】
	bmap.centerAndZoom(new BMap.Point(108.188512, 38.23829), 5)

	bmap.enableScrollWheelZoom(true) // 开启滚动缩放
	bmap.enableContinuousZoom(true)  //启用地图惯性拖拽，默认禁用
	//设置用户可缩放的最大/最小级别
	bmap.setMinZoom(1)
	bmap.setMaxZoom(10)

	//  添加控件
	bmap.addControl(new BMap.ScaleControl({anchor: BMAP_ANCHOR_TOP_LEFT})) // 左上角，添加比例尺
	bmap.addControl(new BMap.NavigationControl()) //左上角，添加默认缩放平移控件
	bmap.addControl(new BMap.OverviewMapControl()) //添加默认缩略地图控件

	//	地图拖拽移动事件
	bmap.addEventListener("dragend", function () {
		//获取经纬度地理位置
		console.log("地图中心点变更为：" + bmap.getCenter().lng + ", " + bmap.getCenter().lat)
	})

	//地图缩放事件
	bmap.addEventListener("zoomend", function () {
		//每次用户缩放时，实时定位中心点缩放，否则地图会发生位置偏移
		bmap.centerAndZoom(new BMap.Point(108.188512, 38.23829), this.getZoom())
	})
}

/**
 * @constructor
 * @module 第四维度图表初始化模块
 * @desc 第四维度图表初始化函数，由Fourth_getjson() 函数调用，当Fourth_getjson()函数获取到数据时，传入格式化后的数据以加载图表
 * @param {Array | Object} datas 城市数据，类型为数组，如:[name:"北京市",value:156...]
 * @param {Array | Object} geoCoordMaps  坐标数据，类型为数组，如:["北京市":[118.58616,38.05616]...]
 * @return void
 * */
function Chart_Fourth(datas, geoCoordMaps) {

	//发布数数据
	let data = datas
	//城市坐标数据
	let geoCoordMap = geoCoordMaps

	//	发布数数据/坐标数据格式化，组成一个数组数据传输给图表更新
	var convertData = function (data) {
		var res = [];
		for (var i = 0; i < data.length; i++) {
			data[i].name = data[i].name.toString().replace("\uFEFF", "")
			var geoCoord = geoCoordMap[data[i].name]
			if (geoCoord) {
				res.push({
					name: data[i].name,
					value: geoCoord.concat(data[i].value)
				})
			}
		}
		return res
	}

	//	地图样式
	let MapStyle = [
		{
			// 高速公路
			'featureType': 'highway',
			'elementType': 'all',
			'stylers': {
				'color': '#FFFFFF'
			}
		}, {
			// 边界
			'featureType': 'boundary',
			'elementType': 'all',
			'stylers': {
				'color': '#293C55'
			}
		}, {
			// 城市字体
			'featureType': 'label',
			'elementType': 'labels.text.fill',
			'stylers': {
				'color': '#293C55'
			}
		}]
	var myEchartsFourth = echarts.init(document.querySelector("#mainFourth"))
	var option = {
		title: Title('全国地区职位发布数', null, setPostion("Fourth_title_top"), 'center'),
		tooltip: tooltip('item', null),
		toolbox: toolbox("10%", setvisualMapPosi("visualMap")),
		visualMap: {
			type: "piecewise",
			orient: "horizontal",
			itemWidth: ItemWidth_Height("Fourth_legendW"),
			itemHeight: ItemWidth_Height("Fourth_legendH"),
			itemGap: setFontsize("Fourth_ItemGap"),
			textGap: setFontsize("Fourth_ItemGap"),
			formatter: "发布数:{value}",
			right: "center",
			bottom: setvisualMapPosi("visualMap"),
			min: 0,
			max: 2000,
			text: ['高', '低'],
			dimension: 0,
			inRange: {
				color: ['#D7DA8B', '#E15457']
			},
			textStyle: {
				color: "#000",
				fontSize: setFontsize("Fourth_visvalMap")
			},
			realtime: true,
			calculable: false
		},
		// 自定义地图组件【用户结合百度地图在图表上创建相关的地图，实现地图+图表联动】
		bmap: {
			// 默认显示位置
			center: [108.114129, 38.2],
			//  地图缩放级别：可使用百度地图APIbmap.setMaxZoom(5)来更改【会覆盖】
			zoom: 5,
			//是否可拖拽
			roam: true,
			//地图样式
			mapStyle: {
				styleJson: MapStyle
			}
		},
		series: [
			{
				name: '发布数',
				type: 'effectScatter',
				coordinateSystem: 'bmap',
				symbolSize: function (val) {
					if(val[2] > 1000){
						return val[2] / 65
					}else if (val[2] > 700 && val[2] <= 1000){
						return val[2] / 40
					}else if (val[2] > 300 && val[2] <= 700){
						return val[2] / 30
					}else if(val[2] > 100 && val[2] <= 300) {
						return val[2] / 5.5
					}else if(val[2] > 50 && val[2] <= 100) {
						return val[2] / 8
					}else if(val[2] > 10 && val[2] <= 50) {
						return val[2] / 2.5
					}else if(val[2] > 5 && val[2] <= 10) {
						return val[2] * 2
					}else if(val[2] > 1 && val[2] <= 5) {
						return val[2] * 3
					}else {
						return val[2] * 10
					}
				},
				showEffectOn: 'render',
				rippleEffect: {
					brushType: 'stroke'
				},
				hoverAnimation: true,
				//文本标签
				label: {
					normal: {
						textStyle: {
							fontSize: setFontsize("map_item")
						},
						formatter: '{b}',
						position: 'right',
						show: false
					},
					emphasis: {
						textStyle: {
							fontSize: setFontsize("map_item")
						},
						show: true
					}
				},
				// 标记点
				itemStyle: {
					normal: {
						color: '#E43C59'
					}
				},
				data: convertData(data),
				zlevel: 1
			}
		]
	}
	//重新调整视图工具的配置，将缩略图/视图类型切换控件隐藏
	option.toolbox.feature.dataZoom.show = false
	option.toolbox.feature.magicType.show = false
	myEchartsFourth.setOption(option)
	Chart_Loading(myEchartsFourth)
	//百度地图初始化
	Baidu_map(myEchartsFourth)
}

var timer = null
$(function () {
	//动态获取数据函数
	Fourth_getjson()
	//定时器监测图表交互功能函数
	timer = setInterval(function () {
		ChartFourth_interaction()
	}, 1000)
	//图表初始化函数
	Chart_Fourth([], [])
})

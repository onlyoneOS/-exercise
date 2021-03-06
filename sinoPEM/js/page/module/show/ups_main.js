define(function(require, exports, module) {
    var $ = require("jquery");
    require("bootstrap");
    require("highcharts-for-seajs");
    require("flexslider");
    var StringBuffer = require("stringBuffer");
    var inter = null;
    var interHighChar = null;
    // var _batteryValue = 220+GetRandomNum(0,20);
    // var _exvoltageValue = 200+GetRandomNum(-20,20);
    // var _imvoltageValue = 200+GetRandomNum(-20,20);
    var _batteryValue = 0;
    var _exvoltageValue = 0;
    var _imvoltageValue = 0;
    var showIndicator = null;
    function getBattery(){
    	var roomId = $("#roomId_").val();
    	var deviceId = $("#_sino_ups_tabid").val();
    	$.ajax({url:ctx+"/show/ups/getIndicatorMotorData",
    		dataType: "json",
    		data:{"roomId":roomId,"deviceId":deviceId,"indicatorId":"1423467866824"},
    		success:function(data){
    		//	alert(data);
    		 if(data!=null){
    		    $("#"+deviceId+"_batVal").html(data.indicatorValue+"%");
    		 }else{
    			 $("#"+deviceId+"_batVal").html("0%");
    		 }
    	}});
    	
    }
    exports.init = function() {
        var tabid = $("#_sino_ups_tabid").val();
        if (tabid == null || tabid == "") {
            tabid = $("#_sino_ups_tab a:first").attr("id");
            $("#_sino_ups_tabid").attr("value", tabid);
        }
        if($("#_sino_ups_tabid").val()!=""){ //只有有UPS时，才请求数据
            eventLatestData(tabid);
            loadIndicators();
            getShowIndicator(tabid);
            getBattery();
        }

        $("#_sino_ups_tab a").click(function(e) {
            $("#_sino_ups_tabid").val($(this).attr("id"));
            getShowIndicator($(this).attr("id"));
//            reloadFirst();
            e.preventDefault();
            $(this).tab("show");
            eventLatestData($(this).attr("id"));
            loadIndicators();
            getBattery();
        });
        $(".small-m").click(function(e) {
            loadIndicators();
        });
        $("#back").click(function(){
        	back();
        });

        $(".small").on("click",function() {
            // 点击查看指标历史记录
            if (showIndicator == null || showIndicator.length == 0 || showIndicator[0] == "") return;
            // var objName = $(this).attr("name");
            var highCharDiv = $(this).find("div").attr("id");
            var highCharId = highCharDiv.split("_");
            // $(".big").empty();
            var deviceId = highCharId[0];
            var p = $(this).find("p").attr("id");
            var pIndex = p.split("_");
            var indicatorIndex = pIndex[1];

            var indicatorId = showIndicator[indicatorIndex].indicatorProduct.indicatorId;
            // var indicatorId = "";
            var roomId = $("#_sino_roomId").val();

            // alert("roomId "+roomId);
            var modiUrl = ctx + "/monitorIndicatorData/upsMonitorIndicatorDataManagePage?deviceId=" + deviceId + "&indicatorId=" + indicatorId + "&roomId=" + roomId;
            // var modiUrl =
            // ctx+"/monitorIndicatorData/upsMonitorIndicatorDataManagePage?deviceId="+""+"&indicatorId="+""+"&roomId="+roomId;
            $("#edit_list").empty();
            $("#edit_list").load(modiUrl);

        

        });
        $(".middle-m").bind("mouseover",
        function() {
            $(".p-alert-count", this).css("color", "#ffffff");

        });
        $(".middle-m").bind("mouseout",
        function() {
            $(".p-alert-count", this).css("color", "#c81623");

        });
        $(".middle-m").click(function(e) {
            var tabid = $("#_sino_ups_tabid").val();
            $(".big").empty();
            var buffer = new StringBuffer();
            buffer.append('<div class="flexslider">');
            buffer.append('<ul class="slides">');
            buffer.append("</ul");
            buffer.append("</div");
            $(".big").append(buffer.toString());
            $.ajax({
                url: ctx + "/show/ups/getEventLatestDataInfos?deviceId=" + tabid + "&tmp=" + Math.random(),
                async: false,
                dataType: "json",
                type: "post",
                success: function(data) {
                    var result = data;
                    var li = "<li>";
                    $.each(result,
                    function(i, n) {
                        li += "<div class='row-fluid portfolio-block'>" + "<div class='span5 portfolio-text' style='overflow:hidden;width:60%'>" + "<div style='float:left;background-color:#1DCA70;border: 0 none; height:80px;	width:30%;vertical-align: middle;padding-top:20px'  >" + n.eventLevel + "</div>" + "<div class='portfolio-text-info' style='float:left;overflow:hidden;width:70%' >" + "<h4>" + n.eventName + "</h4>" + "<p>" + n.eventContent + "</p>" + "</div>" + "</div>" + "<div style='overflow:hidden;width:20%' class='span5'>" + "<div class='portfolio-info'>" + "<span style='font-size:15px'>" + timestampformat(n.lastProduceTime / 1000) + "</span>" + "</div>" + "</div>" + "<div class='span2 portfolio-btn'>" + "<a id='" + n.id + "' class='bigicn-only' href='#'><span>OK</span></a>" + "</div>" + "</div>";
                        if ((i + 1) % 4 == 0 && i != 0 && data.length != (i + 1)) {
                            li += "</li ><li>\n";
                        }
                    });
                    // 追加如tbody中
                    li += "</li>\n";
                    $(".slides").append(li);
                }
            });

            $(".bigicn-only").on("click",function() {
                var mid = this.id;
                var url = ctx + "/show/ups/delEventLatestDataInfo?id=" + mid;
                $.ajax({
                    url: url,
                    // 提交的页面
                    data: "",
                    // 从表单中获取数据
                    type: "POST",
                    // 设置请求类型为"POST"，默认为"GET"
                    success: function(data) {

                        $("a[id='" + data + "'] span").text("已确认");
                        $("a[id='" + data + "']").parent().removeClass("portfolio-btn");
                        $("a[id='" + data + "']").parent().addClass("disportfolio-btn");

                    }
                });
            });
            $(".flexslider").flexslider();

        });

/*        inter = setInterval(function() {

            // _batteryValue = 220+GetRandomNum(0,20);
            // _exvoltageValue = 200+GetRandomNum(-20,20);
            // _imvoltageValue = 200+GetRandomNum(-20,20);
            //				
            reloadFirst();
        },
        30000);*/

    };
    function GetRandomNum(Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }
    function getShowIndicator(deviceId) {
    	
    	if(deviceId!=""){  //有设备才进行取指标
    		  var url = ctx + "/show/ups/getShowIndicator?deviceId=" + deviceId + "&roomId=" + $("#_sino_roomId").val();
    	        $.ajax({
    	            url: url,
    	            // 提交的页面
    	            data: "",
    	            // 从表单中获取数据
    	            type: "POST",
    	            // 设置请求类型为"POST"，默认为"GET"
    	            success: function(data) {
    	                showIndicator = data;
    	                if (showIndicator != null) {
    	                    if (showIndicator.length > 0) {
    	                        var indicatorId0 = showIndicator[0].indicatorProduct.indicatorId;
    	                    }
    	                    if (showIndicator.length > 1) {
    	                        var indicatorId1 = showIndicator[1].indicatorProduct.indicatorId;
    	                    }
    	                    if (showIndicator.length > 2) {
    	                        var indicatorId2 = showIndicator[2].indicatorProduct.indicatorId;
    	                    }
    	                }

    	                for (var i = 0; i < data.length; i++) {
    	                    // var deviceId =
    	                    // data[i].deviceIndicatorValue.deviceId;
    	                    $("#" + deviceId + "_" + i).html(data[i].indicatorProduct.indicatorName);
    	                    /*
    								 * var str = "参考值:"; var level1 =
    								 * data[i].deviceIndicatorValue.indicatorValve1; if
    								 * (level1 == null) { level1 = ""; } var level2 =
    								 * data[i].deviceIndicatorValue.indicatorValve2; if
    								 * (level2 == null) { level2 = ""; } str += level1 +
    								 * "~" + level2;
    								 */
    	                    // $("#" + deviceId + "_battery_" + i).html(str);
    	                }
    	                reloadFirst(indicatorId0, indicatorId1, indicatorId2);
    	            }
    	        });
    	}
      
    }
    // HighCharts JS end
    function reloadFirst(indicatorId0, indicatorId1, indicatorId2) {
        var roomId = $("#_sino_roomId").val();
        var tabid = $("#_sino_ups_tabid").val();
        if (tabid == undefined) {
            clearInterval(inter);
            return;
        }
        if (tabid == null || tabid == "") {
            tabid = $("#_sino_ups_tab a:first").attr("id");
            $("#_sino_ups_tabid").attr("value", tabid);
        }
        var _battery = tabid + "_battery";
        var _exvoltage = tabid + "_exvoltage";
        var _imvoltage = tabid + "_imvoltage";
        var colorGray = "undefined-state";

        // $("#"+_battery).text(_batteryValue);
        // $("#"+_exvoltage).text(_exvoltageValue);
        // $("#"+_imvoltage).text(_imvoltageValue);
        if (showIndicator != null) {
            if (showIndicator.length > 0) {
                indicatorId0 = showIndicator[0].indicatorProduct.indicatorId;
            }
            if (showIndicator.length > 1) {
                indicatorId1 = showIndicator[1].indicatorProduct.indicatorId;
            }
            if (showIndicator.length > 2) {
                indicatorId2 = showIndicator[2].indicatorProduct.indicatorId;
            }
        }

        // 电池电压
        $.ajax({
            type: "GET",
            url: ctx + "/show/ups/getIndicatorMotorDataFirst?roomId=" + roomId + "&deviceId=" + tabid + "&indicatorId=" + indicatorId0 + "&tmp=" + Math.random(),
            success: function(msg) {
                var indicatorUnit = msg.indicatorUnit;
                var indicatorValue = msg.indicatorValue + indicatorUnit;
                var indicatorState = msg.indicatorState;
                if (indicatorValue == null) {
                    indicatorValue = 0;
                }
                _batteryValue = indicatorValue;
                $("#" + _battery).text(indicatorValue);
                // if(msg.indicatorValue1 != null){
                // $("#"+_battery+"_").text(msg.indicatorValue1+ "v~"
                // +msg.indicatorValue2 + "v");
                // }
                if (indicatorState) {
                    $("#" + _battery).parent().removeClass(colorGray);
                    if (indicatorState == 1) {
                        $("#" + _battery).parent().addClass("normal-state");
                    } else if (indicatorState == 2) {
                        $("#" + _battery).parent().addClass("warning-state");
                    } else if (indicatorState == 3) {
                        $("#" + _battery).parent().addClass("bad-state");
                    }

                }
            }
        });
        // 输出电压
        $.ajax({
            type: "GET",
            url: ctx + "/show/ups/getIndicatorMotorDataFirst?roomId=" + roomId + "&deviceId=" + tabid + "&indicatorId=" + indicatorId1 + "&tmp=" + Math.random(),
            success: function(msg) {
                var indicatorUnit = msg.indicatorUnit;
                var indicatorValue = msg.indicatorValue + indicatorUnit;
                var indicatorState = msg.indicatorState;
                if (indicatorValue == null) {
                    indicatorValue = 0;
                }
                _exvoltageValue = indicatorValue;
                $("#" + _exvoltage).text(indicatorValue);
                // if(msg.indicatorValue1 != null){
                // $("#"+_exvoltage+"_").text(msg.indicatorValue1 + "v~"
                // +msg.indicatorValue2 + "v");
                // }
                if (indicatorState) {
                    $("#" + _exvoltage).parent().removeClass(colorGray);
                    if (indicatorState == 1) {
                        $("#" + _exvoltage).parent().addClass("normal-state");
                    } else if (indicatorState == 2) {
                        $("#" + _exvoltage).parent().addClass("warning-state");
                    } else if (indicatorState == 3) {
                        $("#" + _exvoltage).parent().addClass("bad-state");
                    }
                }
            }
        });
        // 输入电压
        $.ajax({
            type: "GET",
            url: ctx + "/show/ups/getIndicatorMotorDataFirst?roomId=" + roomId + "&deviceId=" + tabid + "&indicatorId=" + indicatorId2 + "&tmp=" + Math.random(),
            success: function(msg) {
                var indicatorUnit = msg.indicatorUnit;
                var indicatorValue = msg.indicatorValue + indicatorUnit;
                var indicatorState = msg.indicatorState;
                if (indicatorValue == null) {
                    indicatorValue = 0;
                }
                _imvoltageValue = indicatorValue;
                $("#" + _imvoltage).text(indicatorValue);
                // if(msg.indicatorValue1 != null){
                // $("#"+_imvoltage+"_").text(msg.indicatorValue1 + "v~"
                // +msg.indicatorValue2 + "v");
                // }
                if (indicatorState) {
                    $("#" + _exvoltage).parent().removeClass(colorGray);
                    if (indicatorState == 1) {
                        $("#" + _imvoltage).parent().addClass("normal-state");
                    } else if (indicatorState == 2) {
                        $("#" + _imvoltage).parent().addClass("warning-state");
                    } else if (indicatorState == 3) {
                        $("#" + _imvoltage).parent().addClass("bad-state");
                    }
                }
            }
        });
    }

    function eventLatestData(tabid) {
        // 警报信息
        $.ajax({
            type: "GET",
            url: ctx + "/show/ups/getEventLatestDataInfos?deviceId=" + tabid + "&tmp=" + Math.random(),
            success: function(msg) {
                if (msg.length > 0) {
                    var eventName = msg[0].eventName;
                    var eventContent = msg[0].eventContent;
                    // var eventLevel =
                    // msg.eventLatestDataInfos[0].eventLevel;
                    var eventCount = msg.length;
                    $("#" + tabid + "_upsName").text(eventName);
                    $("#" + tabid + "_upsContent").text(eventContent);
                    $("#" + tabid + "_upsCount").text(eventCount);

                } else {
                    var noEvent = "<span class='icon-font' data-icon='&#xe619;'></span>";
                    $("#" + tabid + "_upsContent").html(noEvent);
                    $("#" + tabid + "_upsContent").parent().removeClass("bad-state");
                    $("#" + tabid + "_upsContent").parent().addClass("undefined-state");
                }
            }
        });
    }
 

    function loadIndicators() {

        var roomId = $("#_sino_roomId").val();
        var tabid = $("#_sino_ups_tabid").val();
        $(".big").empty();
        var buffer = new StringBuffer();
        buffer.append('<div class="flexslider">');
        buffer.append('<ul class="slides">');
        buffer.append("</ul");
        buffer.append("</div");
        $(".big").append(buffer.toString());
        $.ajax({
            url: ctx + '/show/ups/getIndicatorMotorDatas?roomId=' + roomId + '&deviceId=' + tabid + '&tmp=' + Math.random(),
            async: false,
            dataType: "json",
            type: "post",
            success: function(data) {
                var result = data;

                var divStart = "";

                var divEnd = "</tbody></table></div></div></li>";
                divStart += "<li><div class='portlet box green'>" + "<div class='portlet-title'>" + "<div class='caption' >其他指标</div>" + "<div class='tools'>" + "<span  style='font-size:25px;color: white'>＞</span>" + "<span  style='font-size:25px;color: white;margin-left:-10%'>＞</span>" + "<span  style='font-size:25px;color: white;margin-left:-10%''>＞</span>" + "</div>" + "</div>" + "<div class='portlet-body'>" + "<table class='table table-condensed'>" + "<thead>" + "<tr>" + "<th>指标名称</th>" + "<th>指标值</th>" + "<th>采集时间</th>" + "<th class='table-td-center'>指标状态</th>" + "</tr>" + "</thead><tbody style='font-size:14px'>";
                var divContent = divStart;
                if (result != null) {
                    $.each(result,
                    function(i, n) {
                        var indicatorState = n.indicatorState;
                        var ss = "";
                        if (indicatorState == 1) {
                            ss = "正常";
                        } else if (indicatorState == 2) {
                            ss = "中度异常";
                        } else if (indicatorState == 3) {
                            ss = "严重异常";
                        }
                        divContent += "<tr>" + "<td>" + "<a href='#' id='" + n.indicatorId + "'  name = 'indicatorHistoryData'>" + n.indicatorName + "</a>" + "</td>" + "<td>" + n.indicatorValue + n.indicatorUnit + "</td>" + "<td>" + timestampformat(n.createTime / 1000) + "</td>" + "<td class='table-td-center perfect-state'><span  class='table-td-state'>" + ss + "</span></td>";
                        if (data != null) {
                            if ((i + 1) % 6 == 0 && i != 0 && data.length != (i + 1)) {
                                divContent += divEnd + divStart;
                            }
                        }
                    });
                }
                // 追加如tbody中
                divContent += divEnd + "\n";
                $(".slides").append(divContent);

                // 查看指标历史数据
                $('a[name="indicatorHistoryData"]').unbind("click").click(function() {

                    // var deviceId =
                    // $("#_device_id").val();
                    var indicatorId = this.id;
                    var roomId = $("#_sino_roomId").val();
                    var modiUrl = ctx + "/monitorIndicatorData/upsMonitorIndicatorDataManagePage?deviceId=" + tabid + "&indicatorId=" + indicatorId + "&roomId=" + roomId;
                    // var modiUrl =
                    // ctx+"/monitorIndicatorData/upsMonitorIndicatorDataManagePage?deviceId="+deviceId+"&indicatorId="+indicatorId;
                    // alert("roomId "+roomId);
                    // alert(modiUrl);
                    $("#edit_list").empty();
                    $("#edit_list").load(modiUrl);
                });

            }
        });
        $(".flexslider").flexslider({
            animation: "slide",
            pauseOnHover:"true"
        });

    }
    $(".big").each(function() {
        var $this = $(this),
        page = $this.data("page");
        $this.on("click",function() {
            $(".page." + page).addClass("openpage");
            // fadeDashBoard();
        });
    });

    Date.prototype.format = function(format) {
        var o = {
            "M+": this.getMonth() + 1,
            // month
            "d+": this.getDate(),
            // day
            "h+": this.getHours(),
            // hour
            "m+": this.getMinutes(),
            // minute
            "s+": this.getSeconds(),
            // second
            "q+": Math.floor((this.getMonth() + 3) / 3),
            // quarter
            "S": this.getMilliseconds()
            // millisecond
        };
        if (/(y+)/.test(format) || /(Y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };

    function timestampformat(timestamp) {
        return (new Date(timestamp * 1000)).format("yyyy-MM-dd hh:mm:ss");
    }
	function back(){
		var url = ctx + "/room/roomList?tmp="+Math.random();
		//window.location.href= url;
        $(".maintop").empty();
        $(".maintop").load(url);
	}

});
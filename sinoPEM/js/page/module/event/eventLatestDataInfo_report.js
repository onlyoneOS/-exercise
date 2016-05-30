function load() {
		$(".tab-content").load(ctx+"/eventDailyManageInfo/manager");
		//日报
		$("#day").click(function() {
			$(".tab-content").empty();
			$(".tab-content").load(ctx+"/eventDailyManageInfo/manager");
		});
		//周报
		$("#weeks").click(function() {
			$(".tab-content").empty();
			$(".tab-content").load(ctx+"/eventWeekManageInfo/manager");
		});
		//月报
		$("#month").click(function() {
			$(".tab-content").empty();
			$(".tab-content").load(ctx+"/eventMouthManageInfo/manager");
		});
		//季报
		$("#season").click(function() {
			//alert("未完成的报表");
			$(".tab-content").empty();
			$(".tab-content").load(ctx+"/eventSeasonManageInfo/manager");
		});
		//年报
		$("#years").click(function() {
			//alert("未完成的报表");
			$(".tab-content").empty();
			$(".tab-content").load(ctx+"/eventYearsManageInfo/manager");
		});
	};

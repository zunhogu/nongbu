$(document).ready(function() {
	// refresh page fadein
	$("#wrap, .wrap_pop").addClass("fadein");

	// quick menu
	$(".btn_quick").click(function() {
		$(".open_quick").fadeToggle('fast');
		return false;
	});

	// to top
	$(".to_top").click(function() {
		$("html").animate({ scrollTop: 0 }, 160);
	});

	// toggle fade/slide
	$(document).on("click", ".tgf_btn", function() {
		$(this).toggleClass("on");
		$(this).siblings(".tgf_cont").fadeToggle('fast');
	});
	
	$(".tgs_btn").click(function() {
		$(this).parent().toggleClass("on");
		$(this).parent().siblings(".tgs_cont").slideToggle('fast');
	});
	
	// toggle btn
	$(".btn.toggle, .btn_basic.toggle").click(function() {
		$(this).toggleClass("select");
	});

	// top util
	$(".util").click(function() {
		$(".pop_util").fadeToggle('fast');
	});
	
	$(".wr_left, #container, #footer").click(function() {
		if($(".pop_util").css("display") == "block") {
			$(".pop_util").fadeOut('fast');
		}
	});
	
	// 스크롤 이동 시 상세 검색 팝업 hide
	$("#container").on('mousewheel',function(e){
		if($("#pop_dictSearchDetail").css("display") == "block") {
			$("#searchareaMain .detailsearch, #searchareaCommon .detailsearch").trigger("click");
		}	
	});

	// 이벤트 발생 시 상세 검색 팝업 hide
	$("#container").click(function(e){
		var id = $(e.target).parent().attr("id");

		if(id != "searchform_common" && id != "searchform_main") {	// 통합검색 입력 창 제외
			if($("#pop_dictSearchDetail").css("display") == "block") {
				$("#searchareaMain .detailsearch, #searchareaCommon .detailsearch").trigger("click");
			}	
		}
	});
});


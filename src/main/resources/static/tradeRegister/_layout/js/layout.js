var sidebar_autosubmit_onbefore_func = {};
$(function() {
	//-------------------------------------------------------------------------
	// 사이트 바 액션 처리
	sidebar_autosubmit("#sideFrm");

	//-------------------------------------------------------------------------
	// 날짜 아이콘 전체 적용
	$("i.icon.i-calendar").click(function() {
		$(this).prev(".datepicker,.ui-custom-weeksel").focus();
	});
});
// 사이트 바 액션 처리 전 실행
function sidebar_autosubmit_onbefore(formId, func) {
	var _fid = formId.replace("#", "");
	sidebar_autosubmit_onbefore_func[_fid] = func;
}
// 사이트 바 액션 처리
function sidebar_autosubmit(formId) {

	var _fid = formId.replace("#", "");

	if($(formId).is("form")) {
		var timer_side_action = null;
		var side_action = function() {	
			// 바로 액션이 일어나면 너무 많은 액션이 한꺼번에 발생함
			if(timer_side_action != null) clearTimeout(timer_side_action);

			timer_side_action = setTimeout(function() {
				//-------------------------------------------------------------
				// TODO : 필수 값 체크
				var is_require_check = true;
				$("input[require],select[require],span[data-require='true'],div[data-require='true']", formId).each(function(i, o) {
					if($(this).is("span,div") && $(this).data("require") == true) {
						var gid = $(this).attr("id");
						var objs = $("[data-group='" + gid + "']:checked", formId);

						if(objs.length < 1) {
							is_require_check = false;
							return false;
						}
						
						if($("#" + gid, formId).data("min-check") != null 
								&& objs.length < parseInt($("#" + gid, formId).data("min-check"))) {
							is_require_check = false;
							return false;
						}
					} else if($.trim($(o).val()) == "") {
						is_require_check = false;
						return false;
					}
				});
				// 필수 값 체크 통과하지 못하면 서브밋 중단
				if(!is_require_check) return false;

				//-------------------------------------------------------------
				// before function 실행
				if(_fid in sidebar_autosubmit_onbefore_func) {
					if(sidebar_autosubmit_onbefore_func[_fid]() === false) {
						return false;
					}
				}

				//-------------------------------------------------------------
				// 서브밋
				$("form[data-autosubmit='true']").each(function() {
					$(this).submit();
				});
			}, 1000);
		};

		$("#opt_channel_group", formId).change(function() {
			$("#btn_channel > div", formId).hide();
			$("#opt_channel_" + $(this).val(), formId).show();
		}).bind("reset", function() {
			$(this).change();
		});

		$("#btn_channel a", formId).click(function() {
			$("#btn_channel a").removeClass("ON");
			$(this).addClass("ON");

			var id = "opt_channel";
			var text = $(this).text();
			var val = $(this).data("val");

			$("span[data-sidefrm-val='" + id + "'],div[data-sidefrm-val='" + id + "']").attr("class", $(this).attr("class")).text($(this).text());
			$("input[data-sidefrm-val='" + id + "'],select[data-sidefrm-val='" + id + "']").val(val).change();
			$("#opt_channel", formId).val(val);

			side_action();
			return false;
		}).bind("reset", function() {
			$("#btn_channel a.active").click();
		});

		var objects = ":radio,:checkbox,:text,:hidden,select";
		$(formId).delegate(objects, "side_action", function() {
			var id = $(this).attr("id"),
				text = "",
				val = "";

			var is_submit = true;
			
			switch($(this).prop("tagName")) {
				case "INPUT" :
					if($(this).is(":checkbox") || $(this).is(":radio")) {
						// 그룹이 있을경우 체크 
						if($(this).data("group") != null) {
							var gid = $(this).data("group"),
								gtext = "",
								gval = "";

							var objs = $("[data-group='" + gid + "']", formId);
							var all = $("#" + gid, formId).data("group-all");

							var _text = [], _val = [];
							objs.each(function(i, o) {
								if($(this).is(":checked")) {
									var _id = $(this).attr("id");
									_text.push($(this).siblings("label[for='" + _id + "']").text());
									_val.push($(this).val());
								}	
							});

							if(_text.length == objs.length && all != null) {
								_text = [all];
							}
							gtext = _text.join(",");
							gval = _val.join(",");

							// 그룹화된 체크박스에서 최소 개수(data-min-check="2")를 선택하지 않았을 경우 서브밋 되지 않음
							if($("#" + gid, formId).data("min-check") != null 
									&& _val.length < parseInt($("#" + gid, formId).data("min-check"))) {
								is_submit = false;
							}
							// 그룹화된 체크박스에서 최소 개수(data-max-check="2")를 선택하지 않았을 경우 서브밋 되지 않음
							if($("#" + gid, formId).data("max-check") != null
									&& _val.length > parseInt($("#" + gid, formId).data("max-check"))) {
								is_submit = false;
								$(this).prop("checked", !$(this).prop("checked"));
								alert("최대 " + $("#" + gid, formId).data("max-check") + "개까지 선택할 수 있습니다.");
								return;
							}

							$("[data-sidefrm-val='" + gid + "']").text(gtext).val(gval);
						}

						if($(this).is(":checked")) {
							text = $(this).siblings("label[for='" + id + "']").text();
							val = $(this).val();
						} else {
							text = "";
							val = "";
						}
					} else {
						text = $(this).val();
						val = $(this).val();
					}
					break;
				default :
					text = $(this).val();
					val = tval = $(this).val();
					break;
			}

			$("[data-sidefrm-val='" + id + "']").text(text).val(val).change();

			// 필드에 data-autosubmit="false" 로 설정하면 자동 서브밋 하지 않음
			if($(this).data("autosubmit") == false) is_submit = false;

			if(is_submit) side_action();
		}).delegate(objects, "change", function() {
			$(this).trigger("side_action");
		});

		// 리셋
		$(".reset", formId).on("click", function() {
			$(formId)[0].reset();

			$(":radio,:checkbox,:text,:hidden,select", formId).trigger("reset").trigger("side_action");
			$("#btn_channel a", formId).trigger("reset");
			$("#opt_channel_group", formId).trigger("reset");
		});
	}

	makeCalendarWeek(formId + " #week_date", 1, -1, "input[data-sidefrm-val='week_sdate']", "input[data-sidefrm-val='week_edate']");
}
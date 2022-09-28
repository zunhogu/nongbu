$(function() {	
	$.ajaxSetup({
		contentType : 'application/x-www-form-urlencoded; charset=utf-8',
		headers: {'X-Action-Call-Type': 'AJAX'}
	});

	$.ajaxPrefilter(function( options, originalOptions, jqXHR ) {
		if(options.type.toUpperCase() == 'POST') {
			jqXHR.setRequestHeader('X-CSRF-Token', cb_csrf_hash);
		}
	});

	initField(document);

	$.getMultiScripts = function(arr, path) {
		var _arr = $.map(arr, function(scr) {
			return $.getScript( (path||"") + scr );
		});

		_arr.push($.Deferred(function( deferred ){
			$( deferred.resolve );
		}));
		return $.when.apply($, _arr);
	};

	$.getCSS = function(scr, path) {
		$('<link/>', {rel: 'stylesheet', type: 'text/css', href: (path||"") + scr}).appendTo('head');
	}

	$.getMultiCSS = function(arr, path) {
		$.each(arr, function(i, scr) {
			$.getCSS(scr, path);
		});
	};

	// jquery tmpl 사용시
	if('tmpl' in $.fn) {
		$("script[type='text/x-jquery-tmpl']").appendTo("body");
	}
});

// 특정 element 제외
$.fn.ignore = function(sel){
	return this.clone().find(sel||">*").remove().end();
};

//data 값으로 필터링
$.fn.filterByData = function(prop, val) {
    return this.filter(
        function() { return $(this).data(prop)==val; }
    );
}

jQuery.extend({
	postJSON : function( url, data, callback ) {
		return jQuery.post( url, data, callback, "json" );
	},
	exists : function(sel) {
		return $(sel).length > 0;
	}
});

$.fn.exists = function(sel){
	return $(this).find(sel).length > 0;
};

//browser detect
//if(!('browser' in $)) {
	$.browser = (function() {
		var s = navigator.userAgent.toLowerCase();

		var match = 
			/(edge)\/([\w.]+)\./.exec( s ) ||
			/(chrome)[ \/]([\w.]+)/.exec( s ) ||
			/(webkit)[ \/]([\w.]+)/.exec( s ) ||
			/(opera)(?:.*version|)[ \/]([\w.]+)/.exec( s ) ||
			/(msie) ([\w.]+)/.exec( s ) ||
			/(trident).*rv[ :]*([\w.]+)\./.exec( s ) ||
			(s.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( s )) ||
		[];
		
		var b = {'msie':false, 'msedge':false, 'opera':false, 'mozilla':false, 'webkit':false, 'chrome':false, 'safari':false};
		var browser = match[ 1 ] || "";
		var version = match[ 2 ] || "0";
		
		if ( browser == "edge" ) {
			b.msedge = true;
			b.version = match[ 2 ] || "";
		} else if ( browser == "trident" ) {
			b.msie = true;
			b.version = match[ 2 ] || "";
		} else if ( browser ) {
			b[ browser] = true;
			b.version = version;
		} 
		
		if ( b.chrome ) {
			b.webkit = true;
		} else if ( b.webkit ) {
			b.safari = true;
		}
		return b;
	}());
//}

if(!('device' in $)) {
	$.device = (function() {
		var ua = navigator.userAgent.toLowerCase();
		if(/ipad/.test(ua)) {
			return 'tablet';
		} else if(/lgtelecom/.test(ua) || /android/.test(ua) || /blackberry/.test(ua) || /iphone/.test(ua) 
				|| /samsung/.test(ua) || /symbian/.test(ua) 
				|| /sony/.test(ua) || /SCH-/.test(ua) || /SPH-/.test(ua)) {
			return 'mobile';
		}
		return 'pc';
	}());
}

if('datepicker' in $) {
	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: '주차',
		dateFormat: 'yy-mm-dd',
		altFormat:  'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		showOtherMonths: true,
		selectOtherMonths: true,
		yearSuffix: '년 ',
		changeYear: true,
		changeMonth: true,
		showButtonPanel: true,
		gotoCurrent : true,
		currentText: '오늘',
		closeText: '닫기'
	};
	$.datepicker.setDefaults($.datepicker.regional['ko']);

	// custom
	$.datepicker._updateDatepicker_original = $.datepicker._updateDatepicker;
	$.datepicker._updateDatepicker = function(inst) {
		$.datepicker._updateDatepicker_original(inst);

		var afterShow = this._get( inst, 'afterShow' );
		if (afterShow) {
			afterShow.apply( inst.input, [ inst.input, inst ]);  // trigger custom callback
		}
	};
	$.datepicker._gotoToday = function(id) {
		var date,
			target = $(id),
			inst = this._getInst(target[0]);

		date = new Date();
		inst.selectedDay = date.getDate();
		inst.drawMonth = inst.selectedMonth = date.getMonth();
		inst.drawYear = inst.selectedYear = date.getFullYear();

		this._notifyChange(inst);
		this._adjustDate(target);
	};
}

/**
 * 필드 기본 액션 설정
 * @param selector 선택 엘리먼트 하위 필드만 적용
 */
function initField(selector) {
	if(selector == null) selector = document;
	
	// 숫자필드
	$(selector).find("input[type='text'].numeric").bind("keyup blur", function() {
		var v = $(this).val().replace(/[^0-9]+/g,"");
		if(v != $(this).val()) $(this).val(v);
	}).css({"imeMode":"disabled"});

	$(selector).find("input[type='text'].decimal").bind("keyup blur", function() {
		var v = $(this).val().replace(/[^0-9.-]+/g,"");
		if(v != $(this).val()) $(this).val(v);
	}).css({"imeMode":"disabled"});
	
	$(selector).find("input[type='text'].numcomma").bind("keyup blur", function() {
		var v = $(this).val().replace(/[^0-9]+/g,"");
		
		var regexp = /(^[+-]?\d+)(\d{3})/;
		while (regexp.test(v)) {
			v = v.replace(regexp, "$1,$2");
		}
		
		if(v != $(this).val()) $(this).val(v);
	}).css({"imeMode":"disabled"});
	
	// 입력불가 필드
	$(selector).find("input[readonly='readonly'],input[readonly]").css({
		"cursor":"basic",
		//"background-color":"#f5f5f5"
		//"border":"1px solid"
	}).bind("keydown", function(event) {
		if ( event.which == 8 ) {
			 event.preventDefault();
		}
	});
	
	if('datepicker' in $.ui) {
		$(selector).find("input[type='text'].datepicker").addClass("readonly").datepicker({
			beforeShow: function(input, inst) {
				input = input.target || input;

				var max = $(input).data("datepicker-max");
				var min = $(input).data("datepicker-min");
				if(max) $( input ).datepicker('option', 'maxDate', max);
				if(min) $( input ).datepicker('option', 'minDate', min);
			},
			afterShow : function(input, inst) {	
				$(inst.dpDiv).find("td.ui-state-current > a").addClass("ui-state-hover");
			}
		});
	}

	if('button' in $.ui) {
		$(selector).find("input[type=button].button,input[type=submit].button,a.button").button();
	}
}


//날짜 기간 설정
function makeTermFromDate(baseDate, type, cnt) {
	var rs = makeTermFromDateToObject(baseDate, type, cnt);
	var startDate = rs[0];
	var endDate = rs[1];
	
	startDate = startDate.getFullYear() + "-" + padZero(startDate.getMonth()+1) + "-" + padZero(startDate.getDate());
	endDate = endDate.getFullYear() + "-" + padZero(endDate.getMonth()+1) + "-" + padZero(endDate.getDate());

	// [s, e]
	return [ startDate, endDate ];
}

//날짜 기간 설정 (Object)
function makeTermFromDateToObject(baseDate, type, cnt) {
	var y, m, d, baseDateStr;
	
	if ( baseDate == "" ) {
		baseDate = new Date();
	} else if (typeof(baseDate) == 'object'){ 	

	} else {		
		baseDate = new Date(Date.parse(baseDate));
	}
	
	y = baseDate.getFullYear();
	m = baseDate.getMonth();
	d = baseDate.getDate();
	baseDateStr = y + "-" + padZero(m+1) + "-" + padZero(d);

	var date = new Date();
	var startDate = baseDate;
	var endDate = baseDate;

	// cnt만큼 주단위로 움직여 월요일~일요일 날짜 반환
	if(/WT[0-6]?/.test(type)) {
		var cday = parseInt(type.slice(-1)); // 월요일
		if(isNaN(cday)) cday = 1;

		var t = (-6 - baseDate.getDay() + cday -1) % 7;
		t += cnt * 7;

    	startDate = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate() + t);
    	endDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + 6);

		// JSON.stringify 주의 ISO String
    	return [startDate, endDate];
	}
	
	if(cnt == 0) {
		return [baseDate, baseDate];
	}

	var did = 1;
	if(cnt > 0) did = -1;
	
	if(type == "D") {
		date = new Date(y, m, d + cnt + did);
	} else if(type == "M") {
		// 월말처리
		if(cnt < 0) {
			var ldate = new Date(y, m + cnt + did, 0);
			if(d > ldate.getDate()) d = ldate.getDate();

			var fdate = new Date(y, m + 1, 0);
			if(d == fdate.getDate()) d = ldate.getDate();
		}

		date = new Date(y, m + cnt, d + did);
	} else if(type == "W") {
		date =  new Date(y, m, d + (cnt * 7) + did);
	} else if(type == "Y") {
		// 월말처리
		if(cnt < 0) {
			var ldate = new Date(y + cnt, m + did, 0);
			if(d > ldate.getDate()) d = ldate.getDate();

			var fdate = new Date(y, m + did, 0);
			if(cnt < 0 && d == fdate.getDate()) d = ldate.getDate();
		}

		date =  new Date(y + cnt, m, d + did);
	} 
	
	if(cnt > 0) endDate = date;
	else startDate = date;
	
	// [s, e]
	return [ startDate, endDate ];
}

// 맞춤설정에서 currentText 클릭 시 최근 업데이트 일자로 이동
function setLastDate(jsonGraphDate) {
	var last_week_sdate;
	var original_gotoToday = $.datepicker._gotoToday;
	$.datepicker._gotoToday = function(id) {
		var id_name = $(id);
		var json = JSON.parse(jsonGraphDate);
		
		for(var i = 0; i<json.length; i++) {
			if(id == json[i].name) {
				last_week_sdate = json[i].value.split('-');
				break;
			}				
		}
		var target = $(id),
			inst = this._getInst(target[0]);
			
		original_gotoToday.call(this, id);
		this._selectDate(id, this._formatDate(inst, last_week_sdate[2], (last_week_sdate[1]-1), last_week_sdate[0]));			
	}
}

// 맞춤설정의 최근일자 데이터 값 생성
function makeDateToJson() {
	var graph_date_id = [
		"#graph1_term_s", "#graph2_term_s", "#graph3_term_s", 
		"#graph4_sdate", "#graph4_edate", "#online_graph4_term_s", 
		"#online_graph4_term_e", "#week_sdate"
	];
	var json_graph_date = new Array();

	for(var i=0; i<graph_date_id.length; i++) {
		var graph_date = new Object();
		graph_date.name = graph_date_id[i];

		if(graph_date_id[i] == "#graph4_sdate") {
			graph_date.value = $('#graph4_edate').val();
		} else if(graph_date_id[i] == '#online_graph4_term_s') {
			graph_date.value = $('#online_graph4_term_e').val();
		} else {
			graph_date.value = $(graph_date_id[i]).val();
		}

		json_graph_date.push(graph_date);
	}

	return JSON.stringify(json_graph_date);

}


// 기간 생성해서 input or selectbox 에 표시
function makeTermSetField( type, cType, cnt, startObjId, endObjId ) {
	cnt = cnt * -1;
	if(type == "DAY") {
		var date = $("#" + endObjId).val();
		var rs = makeTermFromDate(date, cType, cnt);

		$("#" + startObjId).val(rs[0]);
	}
	else if(type == "MONTH") {
		if(typeof(startObjId) != "object" || startObjId.length < 2 
				|| typeof(endObjId) != "object" || endObjId.length < 2) {
			return;
		}
		
		var y = parseInt($("#" + endObjId[0]).val(), 10);
		var m = parseInt($("#" + endObjId[1]).val(), 10) - 1;
		
		var date = new Date(y, m, 1);
		var rs = makeTermFromDateObject(date, cType, cnt);
		date = rs[0];
		
		// [20131218 cocktial]jQuery Option 변경 방식 변경
		$("#" + startObjId[0] + " option:contains('" + date.getFullYear() + "')").prop("selected", true);
		$("#" + startObjId[1] + " option:contains('" + padZero(date.getMonth()+1) + "')").prop("selected", true);		
	}
	else if(type == "YEAR") {
		var y =  parseInt($("#" + endObjId).val(), 10);
		$("#" + startObjId + " option:contains('" + parseInt(y-cnt) + "')").prop("selected", true);
		$("#" + startObjId).val(parseInt(y-cnt));
	}
}



/**
 * 
 * @param num
 * @param z
 * @returns
 */
function padZero(num, z) {
	z = z || 2;	
	return (new Array(z).join('0') + num).slice(-z);
}

/**
 * 숫자에 콤마를 찍어준다.
 * @param val
 * @returns {*}
 */
function numberWithComma(x){
	x = x || 0;
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * Math.round
 */
function round(num, z) {
	var zz = Math.pow(10, z);
	return Math.round(num * zz) / zz;
}

/**
 * 태그제거
 * @param val
 * @returns {*}
 */
function stripHTML(dirtyString) {
  return $("<div></div>").html(dirtyString).text();
}

/**
 * 숫자를 Tween 애니메이션으로 출력한다.
 * @param text_object
 * @param dataValue
 */
function showNumberTweenTransition(text_object, dataValue, postFix) {
	$('#' + text_object).data("value", dataValue);
	var needlePosMax = $('#' + text_object).data("value") * 10;
	d3.select("#" + text_object).transition().duration(1200).attrTween("class", function() {
		return function(t) {
			$("#" + text_object).text(numberWithComma(Math.round(Math.ceil(t * needlePosMax)/10)) + postFix);
		};
	});
}

/**
 * 배열에 중복된 값은 입력하지 않는다.
 *
 * @param arrayObject
 * @param item
 * @returns {*}
 */
function pushAtomicArray(arrayObject, item) {
	for(var i=0; i<arrayObject.length;i++){
		if(arrayObject[i] == item){
			return arrayObject;
		}
	}
	arrayObject.push(item);
	return arrayObject;
}

/**
 * key/value object 에 중복된 키는 넣지 않는다.
 * @param arrayObject
 * @param key
 * @param value
 * @param is_accumulation	누적모드
 * @returns {*}
 */
function pushAtomicKey(object, key, value, is_accumulation) {

	var exists = false;

	if(key in object){
		if(!is_accumulation){
			return object;
		} else {
			exists = true;
		}
	}

	if(!is_accumulation) {
		object[key] = value;
	} else {
		if(exists){
			if(typeof(object[key]) != "object"){
				var tmp = object[key];
				object[key] = [];
				object[key].push(tmp);
			}
			object[key].push(value);
		} else {
			object[key] = value;
		}
	}

	return object;
}

/**
 * json Data를 피벗하여 리턴한다.
 *
 * @param jsonObject
 * @param column
 * @param is_accumulation	중복값을 누적한다.
 * @returns {Array}
 */
function jsonPivot(jsonObject, column, is_accumulation) {
	var dataset = [];
	var resultSet = [];

	if(is_accumulation == undefined) {
		is_accumulation = false;
	}

	$.each(jsonObject, function(i, row){
		$.each(row, function(j, val) {
			if(j == column) {
				pushAtomicKey(dataset, val, [], false);
			}
		});
		$.each(row, function(j, val) {
			pushAtomicKey(dataset[eval('row.' + column)], j, val, is_accumulation);
		});
	});

	for(key in dataset) {
		resultSet.push(dataset[key]);
	}

	return resultSet;
}


//노드 전체 출력(디버깅용)
function print_r(arr, dept) {
	if(arr == null) return "null";
	dept = (dept == null ? 0 : dept);

	var tab = "";
	for(i=0; i < dept; i++) {
		tab += "\t";
	}
	//if(dept > 1) return "";

	var str = "";
	if(typeof(arr) == "object") {
		str = "Object(\n";
		$.each(arr, function(i, v) {
			if(typeof(v) == "object") {
				v = print_r(v, dept+1);
			} 
			str += tab + "\t[" + i + "] = " + v + "\n";
		});
		str += tab + ");\n";
	} else {
		str += "" + arr;
	}

	if(dept == 0) {
		//str = str.replace(/\n/g,"<br />").replace(/\t/g,"&nbsp; &nbsp; &nbsp; &nbsp;");
		//$("body").append(str);
		$("body").append($("<pre></pre>").append(document.createTextNode(str)));
	} else {
		return str;
	}
}


// 텍스트 길이 줄이기 '...'
function text_substr(text, length) {
    if(text.length >= length) {
        return $.trim(text.substr(0, length))+"...";
    } else {
        return $.trim(text);
    }
}


/*
 * json에서 가장 높은 값의 데이터 추출
 */
function get_max(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (!max || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
}

// 파일 경로 중 파일 이름 및 확장자 추출
function getFileNameExt(fileNameFull) {
	var fileLen = fileNameFull.length;
	var fileDot = fileNameFull.lastIndexOf(".");	// 확장자 바로 앞 dot 위치 찾기
	var fileExt = fileNameFull.substring(fileDot+1, fileLen);		// 확장자
	//var fileExt = fileNameFull.substring(fileDot+1, fileLen).toLowerCase();		// 확장자가 대문자일 경우 소문자로 변경
	var fileName = fileNameFull.substring(0, fileDot);	// 파일 이름만 추출
	
	console.log(fileName, fileExt);
	
	var obj = new Object();
	obj.fname = fileName;
	obj.fext = fileExt;
	
	return obj;
}

//날짜 yyyy-mm-dd / yyyy-mm-dd HH:ii:ss 형태를 Date로 변환
function changeStringToDate(dateText) {
	// new Date( dateText ) IE7에서 안됨
	
	var y = parseInt(dateText.substring(0,4), 10);
	var m = parseInt(dateText.substring(5,7), 10) - 1; // 0 ~ 11
	var d = parseInt(dateText.substring(8,10), 10);
	
	if(dateText.length > 10) {
		var h = parseInt(dateText.substring(11,13), 10);
		var i = parseInt(dateText.substring(14,16), 10);
		var s = 0;
		if(dateText.length > 16) {
			s = parseInt(dateText.substring(17,19), 10);
		}
		return new Date(y, m, d, h, i, s);
	} else {
		return new Date(y, m, d);
	}
}

// 날짜 치환 (dateFormat 을 사용하세요)
function changeDateToString(date, is_time) {
	var dateStr = date.getFullYear() + "-" + padZero(date.getMonth()+1) + "-" + padZero(date.getDate());
	var timeStr = padZero(date.getHours()) + ":" + padZero(date.getMinutes()) + ":" + padZero(date.getSeconds());

	if(is_time == true) {
		return dateStr + " " + timeStr;
	} else {
		return dateStr;
	}
}

//날짜 yyyy-mm-dd 형태를 yyyymmdd로 변환
function changeDateInt(pdate) {
	var date = pdate.split("-");
	
	intDate = date[0]+date[1]+date[2];
	
	return parseInt(intDate);
}

// 날짜 치환
function dateFormat(format, date) {
    if (!this.valueOf()) return " ";
    
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = date || new Date();

    return format.replace(/(yyyy|yy|MM|dd|E|HH|hh|mm|ss|a\/p)/g, function(match) {
        switch (match) {            
           case "yyyy": return d.getFullYear();
           case "yy": return d.getYear();
           case "MM": return padZero(d.getMonth() + 1);
           case "dd": return padZero(d.getDate());            
           case "E": return weekName[d.getDay()];            
           case "HH": return padZero(d.getHours());            
           case "hh": return padZero((h = d.getHours() % 12) ? h : 12);  
           case "mm": return padZero(d.getMinutes());            
           case "ss": return padZero(d.getSeconds());            
           case "a/p": return d.getHours() < 12 ? "오전" : "오후";
           default: return match;
         }
    });
}

/**
 * 주간단위 캘린더 생성
 * @param selector start date ~ end date
 * @param firstDay 0~1 (일~월)
 * @param addWeek null or number 선택 제한
 */
function makeCalendarWeek(selector1, selector2, firstDay, addWeek, selector3)
{
	var calendar;
	
	if(firstDay < 0 || firstDay > 6) firstDay = 0;
	//if(addWeek == null) addWeek = 0;

	$( selector1 ).each(function(idx, obj) {
		var sel_date = "";
		var term = $(obj).val();
		if(term != null && $.trim(term) != "") {
			var t = term.split("~");
			if(t.length >= 2) {
				sel_date = $.trim(t[1]);
			}
		}

		var target = $('<input type="text" id="titleDate" value="' + $(selector1).val() + '" readonly/>').width($(obj).width());
		$(obj).before(target).bind("click focus", function(e) {
			$(target).focus();
		}).prop("readonly", true).addClass("ui-custom-weeksel");
		
		/*
		// 필요시 아래 클래스로 CSS수정
		target.prop("readonly", true).css({
			"padding"	: $(obj).css("padding"), 
			"font-size"	: $(obj).css("font-size"), 
			"border" 	: $(obj).css("border"), 
			"line-height" : $(obj).css("line-height"), 
			"margin" : $(obj).css("margin"),
			"height" : $(obj).css("height")
		});

		target.css("margin-right", ((target.outerWidth() + parseInt($(obj).css("margin-left"))) * -1));
		*/
		
		calendar = $(target).datepicker({
			dateFormat: 'yy.mm.dd',
			altFormat:  'yy.mm.dd',
			showButtonPanel: true,
			closeText: '닫기',
			prevText: '이전달',
			nextText: '다음달',
			defaultDate: $(selector1).val(),
			currentText: '최근 1주일',
			monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
			dayNames: ['일','월','화','수','목','금','토'],
			dayNamesShort: ['일','월','화','수','목','금','토'],
			dayNamesMin: ['일','월','화','수','목','금','토'],
			gotoCurrent : false,
			beforeShowDay: function(date) {
				var format = $(target).datepicker( "option", "dateFormat" );
				var d = $.datepicker.formatDate(format, date);

				var term = $(obj).val();
				if(term != null && $.trim(term) != "") {
					var t = term.split("~");

					if(t.length >= 2 && $.trim(t[0]) <= d && d <= $.trim(t[1])) {
						return [true, "ui-state-week-current", ""];
					}
				}

				return [true, "", ""];
			},
			beforeShow: function(input, inst) {
				input = input.target || input;

				var max = $(obj).data("datepicker-max");
				var min = $(obj).data("datepicker-min");
				if(max) $( input ).datepicker('option', 'maxDate', max);
				if(min) $( input ).datepicker('option', 'minDate', min);

				if(addWeek != '' && addWeek != false && addWeek != null) {
					var d = new Date();
					var dn = d.getDay();
					var t = d.getTime();
					dn = dn - firstDay < 0 ? dn - firstDay + 7 : dn - firstDay;
					t = t - (86400000 * dn) + 518400000;
					t = t + addWeek * 7 * 86400000; 
					d.setTime(t);

					$( input ).datepicker('option', 'maxDate', d);
				}
			},
			afterShow: function(input, inst) {
				input = input.target || input;

				$(inst.dpDiv).find("td > a").hover(function() {
					var format = $(target).datepicker( "option", "dateFormat" );
					$(inst.dpDiv).find("td > a").removeClass("ui-state-week-active");

					var y = $(this).parent().data("year");
					var m = $(this).parent().data("month") + 1;
					var d = $(this).text();
					var date = $.datepicker.parseDate(format, y + "." + m + "." + d);
					var dn = date.getDay();

					var a_list = $(inst.dpDiv).find("td > a");
					var idx = a_list.index(this);
	
					var s_idx = dn - firstDay < 0 ? idx - (dn - firstDay + 7) : idx - (dn - firstDay);
					var e_idx = s_idx+7;

					if(s_idx < 0) s_idx = 0;
					if(e_idx > a_list.length) e_idx = a_list.length;

					$(a_list).slice(s_idx, e_idx).addClass("ui-state-week-hover");
				}, function() {
					$(inst.dpDiv).find("td > a").removeClass("ui-state-week-hover");
					$(inst.dpDiv).find("td.ui-state-week-current > a").addClass("ui-state-week-active");
				});
				$(".ui-state-active").removeClass("ui-state-active");
				$(".ui-state-hover").removeClass("ui-state-hover");
				$(inst.dpDiv).find("td.ui-state-week-current > a").addClass("ui-state-week-active ui-state-week-hover");
			},
			onSelect: function(dateText, inst) {
				var format = $(target).datepicker( "option", "dateFormat" );
				
				format = 'yy.mm.dd';
				
				var d = $.datepicker.parseDate(format, dateText);
				var sdate = $.datepicker.formatDate(format, d);
				var edate = $.datepicker.formatDate(format, d);

				$(target).val(sdate).trigger("change");

				if(selector1 != null) $(selector1).val(sdate);
				if(selector2 != null) $(selector2).val(sdate);
			}
		});
	});
	
	return calendar;
}

/**
 * 선택된 라디오박스(주/월) 단위 캘린더 생성
 * 분석 날짜 기준 지난 주 / 지난 달 date 생성
 * @param selector start date ~ end date
 * @param firstDay 0~1 (일~월)
 * @param addWeek null or number 선택 제한
 * @param selector 전체 일자 출력
 */
function makeCalendarWeekMonth(selector1, selector2, firstDay, addWeek, selector3, lcCheck) {	
	if(firstDay < 0 || firstDay > 6) firstDay = 0;

	var sel_date = "";
	var term = $(selector1).val();
	if(term != null && $.trim(term) != "") {
		var t = term.split("~");
		if(t.length >= 2) {
			sel_date = $.trim(t[1]);
		}
	}
	
	var calendar = $(selector1 + ", " + selector2 + ", " + selector3).datepicker({
		dateFormat: 'yy-mm-dd',
		altFormat:  'yy-mm-dd',		
		showOtherMonths: true,
        showMonthAfterYear:true,
        changeYear: true,
        changeMonth: true,        
		showButtonPanel: true,
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		defaultDate: $(selector1).val(),
		monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		gotoCurrent : true,
		currentText : '최근 1주일',
		beforeShowDay: function(date) {
			var format = $(selector1).datepicker( "option", "dateFormat" );
			var d = $.datepicker.formatDate(format, date);

			var term_s = $(selector1).val();
			var term_e = $(selector2).val();

			if(term_s != "" && term_e != "" && $.trim(term_s) <= d && d <= $.trim(term_e)) {
				return [true, "ui-state-week-current", ""];
			}

			return [true, "", ""];
		},
		beforeShow: function(input, inst) {
			input = input.target || input;
			
			var currentText = '';
			var currentDate = $('#titleStartDate').val();
			
			if(addWeek != '' && addWeek != false && addWeek != null) {
				var d = new Date();
				var maxDate = "";
				
				var dateType = $('input[name=totalDatetype]:checked').val();				
				dateType = (typeof dateType == "undefined")? "W" : dateType;
				
				if(dateType == "W") {
					currentText = '최근 1주일';
					
					// 현재 날짜 기준 일주일 전 date
					var dayOfMonth = d.getDate();
					d.setDate(dayOfMonth - 7);
					
					// 주의 시작과 끝 구하기(월요일 ~ 일요일)
					var currentWeekDay = d.getDay();
					var lessDays = currentWeekDay == 0 ? 6 : currentWeekDay - 1;
					var weekkStart = new Date(new Date(d).setDate(d.getDate() - lessDays));
					var weekkEnd = new Date(new Date(weekkStart).setDate(weekkStart.getDate() + 6));
					maxDate = weekkEnd;
				} else {
					currentText = '최근 한달';
					
					// 현재 날짜 기준 지난 달 구하기
					var firstDayOfMonth = new Date( d.getFullYear(), d.getMonth() , 1 );
					var lastMonth = new Date( firstDayOfMonth.setDate( firstDayOfMonth.getDate() - 1 ) );
					maxDate = lastMonth;
				}
							
				// minDate, maxDate 설정				
				if(lcCheck  == true) {	//지역화페 경우 보유 데이터 날짜 고정
					$( input ).datepicker('option', 'minDate', lc_start_date);
					$( input ).datepicker('option', 'maxDate', lc_end_date);
					
					// panel text, default date 설정
					$( input ).datepicker('option', 'defaultDate', lc_end_date);
					$( input ).datepicker('option', 'currentText', currentText);
				} else {
					$( input ).datepicker('option', 'minDate', limit_start_date);
					$( input ).datepicker('option', 'maxDate', maxDate);
					
					// panel text, default date 설정
					$( input ).datepicker('option', 'defaultDate', currentDate);
					$( input ).datepicker('option', 'currentText', currentText);
				}
			}

			setTimeout(function () {
				$('#ui-datepicker-div').find("td > a").hover(function() {
					var format = $(selector1).datepicker( "option", "dateFormat" );

					var y = $(this).parent().data("year");
					var m = $(this).parent().data("month") + 1;
					var d = $(this).text();
					var date = $.datepicker.parseDate(format, y + "-" + m + "-" + d);
					var dn = date.getDay();

					var a_list = $('#ui-datepicker-div').find("td > a");
					var idx = a_list.index(this);
					var s_idx, e_idx;

					var dateType = $('input[name=totalDatetype]:checked').val();
					dateType = (typeof dateType == "undefined")? "W" : dateType;
					
					if(dateType == 'W') {
						s_idx = dn - firstDay < 0 ? idx - (dn - firstDay + 7) : idx - (dn - firstDay);
						e_idx = s_idx+7;
					} else {
						s_idx = 0;
						e_idx = s_idx + 31;
					}
					
					if(s_idx < 0) s_idx = 0;
					if(e_idx > a_list.length) e_idx = a_list.length;

					$(a_list).slice(s_idx, e_idx).addClass("ui-state-week-hover");
					
				}, function() {
					$('#ui-datepicker-div').find("td > a").removeClass("ui-state-week-hover");
					$('#ui-datepicker-div').find("td.ui-state-week-current > a").addClass("ui-state-week-active");
				});
				$(".ui-state-active").removeClass("ui-state-active");
				$(".ui-state-hover").removeClass("ui-state-hover");
				$('#ui-datepicker-div').find("td.ui-state-week-current > a").addClass("ui-state-week-active");	
				
			}, 0);

			$(selector3).val($(selector1).val().replace(/-/gi,".") + " ~ " + $(selector2).val().replace(/-/gi,"."));
		},
		onChangeMonthYear: function() {
			setTimeout(function () {
				$('#ui-datepicker-div').find("td > a").hover(function() {
					var format = $(selector1).datepicker( "option", "dateFormat" );

					var y = $(this).parent().data("year");
					var m = $(this).parent().data("month") + 1;
					var d = $(this).text();
					var date = $.datepicker.parseDate(format, y + "-" + m + "-" + d);
					var dn = date.getDay();

					var a_list = $('#ui-datepicker-div').find("td > a");
					var idx = a_list.index(this);
					var s_idx, e_idx;

					var dateType = $('input[name=totalDatetype]:checked').val();
					dateType = (typeof dateType == "undefined")? "W" : dateType;
					
					if(dateType == 'W') {
						s_idx = dn - firstDay < 0 ? idx - (dn - firstDay + 7) : idx - (dn - firstDay);
						e_idx = s_idx+7;
					} else {
						s_idx = 0;
						e_idx = s_idx + 31;
					}
					
					if(s_idx < 0) s_idx = 0;
					if(e_idx > a_list.length) e_idx = a_list.length;

					$(a_list).slice(s_idx, e_idx).addClass("ui-state-week-hover");
					
				}, function() {
					$('#ui-datepicker-div').find("td > a").removeClass("ui-state-week-hover");
					$('#ui-datepicker-div').find("td.ui-state-week-current > a").addClass("ui-state-week-active");
				});
				$(".ui-state-active").removeClass("ui-state-active");
				$(".ui-state-hover").removeClass("ui-state-hover");
				$('#ui-datepicker-div').find("td.ui-state-week-current > a").addClass("ui-state-week-active");
				
			}, 0);
		},
		onSelect: function(dateText, inst) {
			var sdate, edate;
			var format = $(selector1).datepicker( "option", "dateFormat" );
			var d = $.datepicker.parseDate(format, dateText);
			var dn = d.getDay();
			dn = dn - firstDay < 0 ? dn - firstDay + 7 : dn - firstDay;

			var dateType = $('input[name=totalDatetype]:checked').val();
			dateType = (typeof dateType == "undefined")? "W" : dateType;
			
			if(dateType == 'W') {
				d.setTime(d.getTime() - 86400000 * dn);
				sdate = $.datepicker.formatDate(format, d);

				d.setTime(d.getTime() + 518400000);
				edate = $.datepicker.formatDate(format, d);
				
			} else {
				var date = d.getDate() - 1;
				var endDateSplit = dateText.split('-');
				var lastDay = (new Date(endDateSplit[0], endDateSplit[1], 0)).getDate();
				
				d.setTime(d.getTime() - (86400000 * date));
				sdate = $.datepicker.formatDate(format, d);
    					
				d.setTime(d.getTime() + (86400000 * (lastDay - 1)));
				edate = $.datepicker.formatDate(format, d);
			}

			$(selector1).datepicker("setDate", sdate ).trigger("change");
			$(selector2).datepicker("setDate", edate ).trigger("change");

			if(selector3 != null) {
				$(selector3).datepicker('option', 'defaultDate', sdate);
				$(selector3).val(sdate.replace(/-/gi,".") + " ~ " + edate.replace(/-/gi,"."));
			}

			$(this).blur();
		}
	});
	
	return calendar;
}

function convertDate(date, timeFlag) {
	var yyyy = date.getFullYear();
	var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
	var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

	if(timeFlag) {
		return yyyy + "-" + mm + "-" + dd + " " + hour + ":" + minute + ":" + seconds;
	} else {
		return yyyy + "-" + mm + "-" + dd;
	}
}

function convertDotDate(date, timeFlag) {
	var yyyy = date.getFullYear();
	var mm = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : (date.getMonth() + 1);
	var dd = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
	var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
	var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
	var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
	
	if(timeFlag) {
		return yyyy + "." + mm + "." + dd + " " + hour + ":" + minute + ":" + seconds;
	} else {
		return yyyy + "." + mm + "." + dd;
	}
}

function getWeek(d, flag) {
	var day = d.getDay();
	var dist;

	// 주의 월요일과 일요일 구하기 (기준 : 월  ~ 일)
	if(flag == 'startDate') { // 월요일 찾기	
		if(day > 1) {					// 화 ~ 토
			dist = 0 - (day - 1);
		} else if(day == 1) {			// 월
			dist = 0;
		} else if(day == 0) {			// 일
			dist = -6;
		}
	} else if(flag == 'endDate') { // 일요일 찾기
		if(day > 0) {			// 월 ~ 토
			dist = 7 - day;
		} else if(day == 0) {	// 일
			dist = 0;
		}
	}
	
	d.setDate(d.getDate() + dist);
	
	return d;
}

// cookie 값 저장
function setCookie(cookie_name, value, days) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + days);
	// 설정 일수만큼 현재시간에 만료값으로 지정

	var cookie_value = escape(value) + ((days == null) ? '' : ';    expires=' + exdate.toUTCString() + '; path=/;');
	document.cookie = cookie_name + '=' + cookie_value;			  
}

// cookie 값 가져오기
function getCookie(cookie_name) {
	var x, y;
	var val = document.cookie.split(';');

	for (var i = 0; i < val.length; i++) {
    	x = val[i].substr(0, val[i].indexOf('='));
    	y = val[i].substr(val[i].indexOf('=') + 1);
    	x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
    	if (x == cookie_name) {
    		return unescape(y); // unescape로 디코딩 후 값 리턴
    	}
	}
}

/* HashMap 객체 생성 */
var HashMap = function(){
    this.map = new Object();
};
 
HashMap.prototype = {
    /* key, value 값으로 구성된 데이터를 추가 */
    put: function (key, value) {
        this.map[key] = value;
    },
    /* 지정한 key값의 value값 반환 */
    get: function (key) {
        return this.map[key];
    },
    /* 구성된 key 값 존재여부 반환 */
    containsKey: function (key) {
        return key in this.map;
    },
    /* 구성된 value 값 존재여부 반환 */
    containsValue: function (value) {
        for (var prop in this.map) {
            if (this.map[prop] == value) {
                return true;
            }
        }
        return false;
    },
    /* 구성된 데이터 초기화 */
    clear: function () {
        for (var prop in this.map) {
            delete this.map[prop];
        }
    },
    /*  key에 해당하는 데이터 삭제 */
    remove: function (key) {
        delete this.map[key];
    },
    /* 배열로 key 반환 */
    keys: function () {
        var arKey = new Array();
        for (var prop in this.map) {
            arKey.push(prop);
        }
        return arKey;
    },
    /* 배열로 value 반환 */
    values: function () {
        var arVal = new Array();
        for (var prop in this.map) {
            arVal.push(this.map[prop]);
        }
        return arVal;
    },
    /* Map에 구성된 개수 반환 */
    size: function () {
        var count = 0;
        for (var prop in this.map) {
            count++;
        }
        return count;
    }
}
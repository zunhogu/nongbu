//아이디 저장 체크
function check_save_id(frm){
	if(frm == null) {
		frm = document.flogin;
	}

	var chk = "N";
	var id = "";
	var pw = "";

	if(frm.save_login == null) return;

	if(localStorage != null) {
		chk = localStorage.getItem("login_save_chk");
		id = localStorage.getItem("login_save_id");
		pw = localStorage.getItem("login_save_pw");
	} else {
		chk = setCookie("login_save_chk", "Y", 31536000);
		id = setCookie("login_save_id", frm.mem_userid.value, 31536000);
	}
	if(chk == "Y") {
		 frm.save_login.checked = true;
		 frm.mem_userid.value = id;
		 frm.mem_password.value = pw;
	}
}

// 아이디저장
function save_id(frm) {
	if(frm == null) {
		frm = document.flogin;
	}
	
	if(frm.save_login == null) return;

	if(frm.save_login.checked == true) {
		if(frm.mem_userid.value != "") {
			if(localStorage != null) {
				localStorage.setItem("login_save_chk", "Y");
				localStorage.setItem("login_save_id", frm.mem_userid.value);
				localStorage.setItem("login_save_pw", frm.mem_password.value);
			} else {
				setCookie("login_save_chk", "Y", 31536000);
				setCookie("login_save_id", frm.mem_userid.value, 31536000);
			}
		}
	} else {
		if(localStorage != null) {
			localStorage.setItem("login_save_chk", "N");
			localStorage.setItem("login_save_id", "");
			localStorage.setItem("login_save_pw", "");
		} else {
			setCookie("login_save_chk", "N", 0);
			setCookie("login_save_id", "", 0);
		}
	}
}
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="/resources/css/mypage.css">
<style>
</style>
<script
	src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
	<div class="top-div">
		<div class="main-nabar">
			<div class="menu-area">
				<img id="data" src="/resources/images/data.png"> <a href="#">데이터
					센터</a> <img id="data" src="/resources/images/deal.png"> <a
					href="#">선물 거래</a> <img id="data" src="/resources/img/news.png">
				<a href="#">뉴스</a> <img id="data"
					src="/resources/images/funding.png"> <a href="#">크라우드 펀딩</a>
			</div>
		</div>
		<div class="img-div">
			<div class="img-area">
				<div class="img-logo">
					<img id="logo" src="/resources/img/logo_small.png" alt="로고">
				</div>
				<div class="user-area">
					<img id="menu" src="/resources/images/ex2.png" alt="메뉴"> <img
						id="user" src="/resources/images/ex3.png" alt="사용자"> <span>안녕하세요
						username 님!</span>
				</div>
			</div>
		</div>
		<div class="producer-div">
			<div class="producer-area">
				<div class="pagename">
					<p>생산자 마이페이지</p>
				</div>
			</div>

			<div class="producer-area2">
				<div id="username" class="hi">안녕하세요 생산자님</div>
				<div class="logout">
					<button>로그아웃</button>
				</div>
			</div>
		</div>

	</div>
	<div class="mid-div">
		<div class="userimg-div">
			<img src="/resources/img/person.png">
		</div>
		<div class="userinfo-div">
			<div class="userinfo">
				<div class="userinfo2">개인정보</div>
				<div class="userup">
					<a href="/index/userupdate">수정</a>
				</div>
			</div>
			<br>
			<p id="username"></p>
			<p id="userdate"></p>
		</div>
		<div class="userphone-div">
			<div class="userphone">
				<div class="userphone2">연락처</div>
				<div class="userup">
					<a href="/index/userupdate">수정</a>
				</div>
			</div>
			<br>
			<p id="usernumber">82)</p>
			<p id="useremail">Email:</p>
		</div>

		<div class="userupdate-div">
			<div class="btn-area">
				<button>
					<a href="/mypage//iteminsert">등록</a>
				</button>
				<button>
					<a href="/mypage//insert">삭제</a>
				</button>
			</div>
			<div class="grade-area">
				<a href="#">등급정보</a>
			</div>
		</div>
	</div>

	<div class="bottom-div">
		<div class="tab-div">
			<div class="tab" data-tab-target="#tab1">
				<p>판매중인 물품()</p>
			</div>
			<div class="bin"></div>
			<div class="tab" data-tab-target="#tab2">
				<p>판매 완료된 물품</p>
			</div>
			<div class="bin"></div>
			<div class="tab" data-tab-target="#tab3">
				<p>채팅관리</p>
			</div>
		</div>
		<div class="item-div">
			<div id="tab1" data-tab-content class="items active">
				<!-- 
				<c:forEach var="item" items="${item}">
					<c:if test="${user.id == item.user.id}">
						<c:set var="i" value="${i+1}" />
						<div class="item-area">
							<div class="item-num">${i}</div>
							<div class="item-img">
								<img src="/resources/images/userimg.png">
							</div>
							<div class="item-info">
								<h1>${item.itemtitle}</h1>
								<p>${item.itemcon}/${item.itemsell}/${item.itemcondition}/${item.itemaddr}/${item.itemtax}</p>
								<button>구매자 정보</button>
								<button>게시글 수정</button>
								<button>계약서 확인</button>
							</div>
						</div>
					</c:if>
				</c:forEach>
				 -->

			</div>

			<div id="tab2" data-tab-content class="items">
				<div class="item-area">
					<div class="item-num">1</div>
					<div class="item-img">
						<img src="/resources/images/userimg.png">
					</div>
					<div class="item-info">
						<h1>asd</h1>
						<p>asd</p>
						<button>구매자 정보</button>
						<button>게시글 수정</button>
						<button>계약서 확인</button>
					</div>
				</div>
				<div class="item-area">
					<div class="item-num">1</div>
					<div class="item-img">
						<img src="/resources/images/userimg.png">
					</div>
					<div class="item-info">
						<h1>asd</h1>
						<p>asd</p>
						<button>구매자 정보</button>
						<button>게시글 수정</button>
						<button>계약서 확인</button>
					</div>
				</div>
			</div>
			<div id="tab3" data-tab-content class="items">
				<div class="item-area">
					<div class="item-num">1</div>
					<div class="item-img">
						<img src="/resources/images/userimg.png">
					</div>
					<div class="item-info">
						<h1>asd</h1>
						<p>asd</p>

						<button>
							<a href="/mypage/room">채팅</a>
						</button>
						<button>게시글 수정</button>
						<button>계약서 확인</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="page-div">
		<ul>
			<li><a class="prev"></a></li>
			<li><a class="nex" href="#"></a></li>
		</ul>
	</div>

	<!-- Footer -->
	<footer class="footer">
		<div class="footer-inner">
			<p>경북협동조합 농부아지야</p>
			<hr />
			<ul>
				<li><a href="#">농넷</a></li>
				<li><a href="#">KAMIS</a></li>
				<li><a href="#">한국농어촌공사</a></li>
				<li><a href="#">영남대학교</a></li>
			</ul>
		</div>
	</footer>
	<script src="/resources/js/tab.js" charset="utf-8"></script>
</body>
</html>
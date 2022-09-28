<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%@page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%@ page import="com.service.yis.product.ProductVO" %>
<%@ page import="com.service.yis.product.ProductDAO" %>
<%@ page import="java.util.Collections" %>

<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <link href="index.css" rel="stylesheet">
    <link href="mainpage.css" rel="stylesheet">
    <link href="search.css" rel="stylesheet">

    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <title>Test Page</title>
</head>
<body>


<nav>
    <ul>
        <li>
            <a href="../DataCenter/html/DataCenter.html"
               th:href="@{/datacenter}">
                <img
                        class="datacenter-img"
                        src="img/datacenter.png"
                        th:src="@{/img/datacenter.png}"/>
                <h>데이터 센터</h>
            </a>
        </li>
        <li>
            <a href="../index.html"
               th:href="@{/}">
                <img
                        class="news-img"
                        src="img/trade.png"
                        th:src="@{/img/trade.png}"/>
                <h>선물거래</h>
            </a>
        </li>
        <li>
            <a href="../index.html"
               th:href="@{/}">
                <img
                        class="trade-img"
                        src="img/news.png"
                        th:src="@{/img/news.png}"/>
                <h>뉴스</h>
            </a>
        </li>
        <li>
            <a href="../funding/main-crowdFunding.html"
               th:href="@{/crowd}">
                <img
                        class="funding-img"
                        src="img/crowdfunding.png"
                        th:src="@{/img/crowdfunding.png}"/>
                <h>크라우드 펀딩</h>
            </a>
        </li>
    </ul>
</nav>

<!--item content-->
<!-- 주제 로고 및 설명 -->
<div class="background">
    <!-- 로고 및 로그인,로그아웃,마이페이지-->
    <div class="index-top">
        <div class="index-top-left">
            <img
                    th:onclick="|location.href='@{/}'|"
                    src="img/logo_small.png"
                    th:src="@{/img/logo_small.png}"/>
        </div>
        <div class="index-top-right">
            <img
                    src="../../static/img/table.png"
                    th:src="@{/img/table.png}"/>
            <img
                    src="../../static/img/person.png"
                    th:src="@{/img/person.png}"/>

            <a sec:authorize="isAnonymous()"
               href="login.html"
               th:href="@{/account/login}">로그인</a>

            <h
                    sec:authorize="isAnonymous()">또는
            </h>

            <a sec:authorize="isAnonymous()"
               href="join.html"
               th:href="@{/account/join}">회원가입</a>

            <h
                    sec:authorize="isAuthenticated()"
            >안녕하세요!
            </h>
            <a
                    sec:authorize="isAuthenticated()"
                    href="login.html"
                    th:href="@{/account/login}">
            </a>
        </div>
    </div>
    <hr>

    <!-- 폰트 로고 및 주제 -->
    <div class="title">
        <p>
            경북에서 가장 저렴한 농산물 플랫폼
        </p>
        <img src="img/logo_fontt.png"
             th:src="@{/img/logo_fontt.png}"
        >
    </div>

    <!-- 내용 -->
    <section class="contents_section">
        <!-- 검색-->
        <div class="search" style="margin-top:50px;">
            <form action="./keywordSearch" method="get" name="keywordSearch">
                <input id="searchbox" type="text" name="keyword" placeholder="검색어 입력"
                       onkeypress="if(event.keyCode == 13){doAction1(); return false;}"
                       onfocus="this.placeholder=''" onblur="this.placeholder='검색어 입력'" autocomplete="off">
                <button class="searchBtn" type="button" onclick="doAction1()">검색</button>
            </form>
        </div>

        <!--상세 검색 모달 페이지-->
        <div style="margin-top:15px">
            <button class="openBtn">상세 검색</button>
            <div class="modal hidden">
                <div class="bg"></div>
                <span class="modalBox">
                        <form action="./detailSearch" method="get" name="detailSearch">
                            <table>
                                <tr>
                                    <th>카테고리</th>
                                    <td>
                                        <select class="form-control" id="categoryA" name="categoryA" autocomplete="off"
                                                onchange="categoryChange(this)" style="width:120px; height:30px;">
                                            <option>선택</option>
                                            <option value="과일">과일</option>
                                            <option value="채소">채소</option>
                                            <option value="작물">작물</option>
                                        </select>
                                        &nbsp;
                                        <select class="form-control" id="categoryB" name="categoryB"
                                                style="width:120px; height:30px;"></select>
                                    </td>
                                </tr>

                                <tr>
                                    <th>예상 출하 시기</th>
                                    <td>
                                        <input type="text" id="datepicker1" name="date"
                                               style="width:120px; height:30px;" autocomplete="off">
                                    </td>
                                </tr>

                                <!--
                                <tr>
                                    <th>지역</th>
                                    <td>
                                        <select class="form-control" id="regionA" name="regionA"
                                            onchange="regionChange(this)" style="width:80px; height:30px;">
                                            <option>선택</option>
                                            <option value="경상남도">경상남도</option>
                                            <option value="경상북도">경상북도</option>
                                            <option value="강원도">강원도</option>
                                        </select>
                                        &nbsp;
                                        <select class="form-control" id="regionB" name="regionB"
                                            style="width:80px; height:30px;"></select>
                                    </td>
                                </tr>
                                -->

                                <tr>
                                    <th>kg당 가격(원)</th>
                                    <td>
                                        <select class="form-control" id="price" name="price" autocomplete="off"
                                                style="width:120px; height:30px;">
                                            <option>선택</option>
                                            <option value="5000">5000원 이하</option>
                                            <option value="10000">10000원 이하</option>
                                            <option value="15000">15000원 이하</option>
                                            <option value="20000">20000원 이하</option>
                                            <option value="25000">25000원 이하</option>
                                        </select>
                                    </td>
                                </tr>
                            </table>
                            <button class="submit" type="reset" onclick="doAction2()">검색</button>
                            <button class="closeBtn"></button>
                        </form>
                    </span>
            </div>
        </div>

        <!-- 해시태그-->
        <div class="hash-tag">
            <ul>
                <li><a>#사과</a></li>
                <li><a>#쌀</a></li>
                <li><a>#포도</a></li>
            </ul>
        </div>
    </section>

    <!--search info-->
    <div style="margin-top: 35px;">
        <c:forEach items="${detailList}" var="detailList" varStatus="status" begin="0" end="0">
            <p><b>${detailList.getCategoryA()} > ${categoryB} > ${detailList.getDate()},
                kg당 ${detailList.getPriceRange()}원 이하</b></p>
        </c:forEach>
    </div>

    <!--content-->
    <div class="Rescontainer">
        <c:forEach items="${detailList}" var="detailList">
            <div class="filterDiv ${detailList.getFarmname()}" style="margin-top: 80px;">
                <a href="#">
                    <img src="img/test.PNG" th:src="@{/img/test.PNG}"
                         style="width:180px; height:180px; display:block; text-align: center;">
                    <p style="clear:both; margin-top: 20px;"><b>${detailList.getCategoryB()}</b></p>
                    <p style="clear:both; margin-top: 10px; color:green"><b>거래 가능</b></p>
                </a>
            </div>
        </c:forEach>
    </div>

    <!--Page-->
    <div class="pageInfo_area">
        <ul id="pageInfo" class="pageInfo">
            <!-- 이전페이지 버튼 -->
            <c:if test="${pagingD.prev}">
                <li class="pageInfo_btn previous"><a href="${pagingD.startPage - 1}"> 이전 </a></li>
            </c:if>

            <c:forEach var="num" begin="${pagingD.startPage}" end="${pagingD.endPage}">
                <!--<li class="pageInfo_btn"><a href='#'>${num} </a></li>-->
                <li class="pageInfo_btn"><a href="${num}">${num}</a></li>
            </c:forEach>

            <!-- 다음페이지 버튼 -->
            <c:if test="${pagingD.next}">
                <li class="pageInfo_btn next"><a href="${pagingD.endPage + 1}"> 다음 </a></li>
            </c:if>
        </ul>
    </div>

    <form id="actionForm" method="get">
        <input type="hidden" name="categoryA" value="${categoryA}">
        <input type="hidden" name="categoryB" value="${categoryB}">
        <input type="hidden" name="date" value="${date}">
        <input type="hidden" name="price" value="${price}">
        <input type="hidden" name="pageNum" value="${pagingD.cri.pageNum}">
    </form>


    <!-- Footer -->
    <footer class="footer" style="margin-top: 80px;">
        <div class="footer-inner">
            <div><i class="fas fa-globe fa-2x"></i> 한국어</div>
            <ul style="margin-left:50%;">
                <li><a href="https://www.nongnet.or.kr/index.do" target="_blank">농넷</a></li>
                <li><a href="https://www.kamis.or.kr/customer/main/main.do" target="_blank">KAMIS</a></li>
                <li><a href="https://kosis.kr/statHtml/statHtml.do?orgId=678&tblId=DT_67801_E000020&conn_path=I2"
                       target="_blank">한국농어촌공사</a></li>
                <li><a href="https://www.yu.ac.kr/main/index.do" target="_blank">영남대학교</a></li>
            </ul>
        </div>
    </footer>

    <script type="text/javascript" src="buttonCondition.js"></script>
    <script type="text/javascript" src="divFilter.js"></script>
    <script type="text/javascript" src="tableFilter.js"></script>
    <script type="text/javascript" src="modal.js"></script>
    <script type="text/javascript" src="changer.js"></script>
    <script type="text/javascript" src="datepicker.js"></script>
    <script type="text/javascript" src="buttonCondition.js"></script>
</div>
</body>
<script>

    let actionForm = $('#actionForm');

    $(".pageInfo_btn a").click(function (e) {
        e.preventDefault();

        actionForm.find("input[name='pageNum']").val($(this).attr("href"));
        actionForm.submit();
    });

    window.scrollTo(0, 550);
</script>
</html>


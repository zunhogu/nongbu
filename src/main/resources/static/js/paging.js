let actionForm = $('#actionForm');

$(".pageInfo_btn a").click(function (e) {
    e.preventDefault();

    actionForm.find("input[name='pageNum']").val($(this).attr("href"));
    actionForm.submit();


});

window.scrollTo(0, 575);
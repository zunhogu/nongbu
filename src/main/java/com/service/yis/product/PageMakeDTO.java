package com.service.yis.product;

public class PageMakeDTO {
    public int total;
    public int display = 10;
    public int startPage;
    public int endPage;
    public boolean prev, next;
    public Criteria cri;

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;

        Paging();
    }

    private void Paging() {
        endPage = (int) (Math.ceil(cri.pageNum / (double) display) * display);
        startPage = (endPage - display) + 1;

        int tmpEndpage = (int) (Math.ceil(total / (double) cri.amount));

        if (endPage > tmpEndpage) {
            endPage = tmpEndpage;
        }
        prev = startPage == 1 ? false : true;
        next = endPage * cri.amount >= total ? false : true;
    }

    public int getDisplay() {
        return display;
    }

    public int getStartPage() {
        return startPage;
    }

    public int getEndPage() {
        return endPage;
    }

    public boolean isPrev() {
        return prev;
    }

    public boolean isNext() {
        return next;
    }

    public Criteria getCri() {
        return cri;
    }

    public void setDisplay(int display) {
        this.display = display;
    }

    public void setStartPage(int startPage) {
        this.startPage = startPage;
    }

    public void setEndPage(int endPage) {
        this.endPage = endPage;
    }

    public void setPrev(boolean prev) {
        this.prev = prev;
    }

    public void setNext(boolean next) {
        this.next = next;
    }

    public void setCri(Criteria cri) {
        this.cri = cri;
    }
}

package com.service.yis.product;

public class Criteria {
    public int pageNum;
    public int amount;

    public int getPageStart(){
        return (this.pageNum - 1) * amount;
    }
    public Criteria() {
        this.pageNum = 1;
        this.amount = 12;
    }
    public Criteria(int pageNum, int amount) {
        this.pageNum = pageNum;
        this.amount = amount;
    }
    public int getPageNum(){
        return pageNum;
    }
    public void setPageNum(int pageNum){
        if(pageNum < 1) {
            this.pageNum = 1;
        }
        else {
            this.pageNum = pageNum;
        }
    }
    public int getAmount(){
        return amount;
    }
    public void setAmount(int amount){
        int cnt = this.amount;

        if(amount != cnt){
            this.amount = cnt;
        }
        else{
            this.amount = amount;
        }
    }
}

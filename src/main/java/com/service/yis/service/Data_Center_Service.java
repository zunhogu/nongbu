package com.service.yis.service;

import com.service.yis.domain.item.Item_Entity;
import com.service.yis.domain.item.Item_Repository;
import com.service.yis.domain.item.Item_Entity;
import com.service.yis.domain.item.Item_Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Data_Center_Service {
    @Autowired
    private Item_Repository item_Repository;

    public List<Item_Entity> getItem(){return item_Repository.getItem();}
    public List<Item_Entity> getItemAvgByDate(String name) {
        return item_Repository.getItemAvgByDate(name);
    }
    public List<Item_Entity> getItemAvgByDateMarket(String name, String date) {return item_Repository.getItemAvgByDateMarket(name, date);}
    public List<Item_Entity> getItemAllAvgByDate(String name) {return item_Repository.getItemAllAvgByDate(name);}
    public List<Item_Entity> getItemAllAvgByDate2(String name, String market) {return item_Repository.getItemAllAvgByDate2(name, market);}
    public List<Item_Entity> getItemByBtwDateAndDate(String name, String startDate, String endDate) {return item_Repository.getItemByBtwDateAndDate(name, startDate, endDate);}
    public List<Item_Entity> getItemByBtwDateAndDate2(String name, String startDate, String endDate, String market) {return item_Repository.getItemByBtwDateAndDate2(name, startDate, endDate, market);}
    public List<Item_Entity> getItemAvgMonth(String name) {return item_Repository.getItemAvgMonth(name);}
    public List<Item_Entity> getItemAvgMonth2(String name, String market) {return item_Repository.getItemAvgMonth2(name,market);}
    public List<Item_Entity> getItemAvgYear(String name) {return item_Repository.getItemAvgYear(name);}
    public List<Item_Entity> getItemAvgYear2(String name, String market) {return item_Repository.getItemAvgYear2(name, market);}
    public List<Item_Entity> getItemAvg3Month(String name) {return item_Repository.getItemAvg3Month(name);}
    public List<Item_Entity> getItemAvg3Month2(String name, String market) {return item_Repository.getItemAvg3Month2(name, market);}
    public List<Item_Entity> getItemAvg6Month(String name) {return item_Repository.getItemAvg6Month(name);}
    public List<Item_Entity> getItemAvg6Month2(String name, String market) {return item_Repository.getItemAvg6Month2(name, market);}
    public List<Item_Entity> getItemAvgByKind(String name) {return item_Repository.getItemAvgByKind(name);}
    public List<Item_Entity> getItemAvgByMarket(String name, String market) {return item_Repository.getItemAvgByMarket(name, market);}



}

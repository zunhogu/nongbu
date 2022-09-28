package com.service.yis.controller;

import com.service.yis.service.Data_Center_Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.apache.ibatis.annotations.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/tradeRegister")
@RequiredArgsConstructor
public class TradeRegister {
    Data_Center_Service data_center_service;

    @GetMapping
    public String tradeRegisterMain(){
        return "tradeRegister/trade_register";
    }
//    @Query(value = "insert ", nativeQuery = true);

}

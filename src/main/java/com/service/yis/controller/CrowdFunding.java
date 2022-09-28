package com.service.yis.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/crowd")
@RequiredArgsConstructor
public class CrowdFunding {

    @GetMapping
    public String crowdFundingMain(){
        return "funding/main-crowdFunding";
    }
    @GetMapping("/detail")
    public String crowdFundingDetail(){
        return "funding/crowdFunding-detail";
    }

}

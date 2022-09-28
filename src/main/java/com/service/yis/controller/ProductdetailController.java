package com.service.yis.controller;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import com.service.yis.service.productListService;
import org.springframework.ui.Model;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
@Controller
public class ProductdetailController{
	
	@Autowired
	private productListService productlistservice;
	
	@RequestMapping("/detail/{id}")
	public String detail(@PathVariable int id, Model model){
		
		model.addAttribute("plist", productlistservice.detail(id));
		return "product/productdetail";

	}
}
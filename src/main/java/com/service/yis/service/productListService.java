package com.service.yis.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.service.yis.domain.productList.ProductList;
import com.service.yis.domain.repository.productListRepository;

@Service
public class productListService {
	
	@Autowired
	private productListRepository productlistrepository;
	
	public ProductList detail(int id) {
		return productlistrepository.findById(id).orElseThrow(()->{
			return new IllegalArgumentException("실패");
		});
	}
}
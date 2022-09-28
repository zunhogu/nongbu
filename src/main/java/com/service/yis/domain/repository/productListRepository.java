package com.service.yis.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.service.yis.domain.productList.ProductList;

public interface productListRepository extends JpaRepository<ProductList, Integer>{

}
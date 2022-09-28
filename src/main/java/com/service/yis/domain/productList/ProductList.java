package com.service.yis.domain.productList;

import java.sql.Date;
import javax.persistence.Entity;
import javax.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.*;
import org.springframework.lang.Nullable;

import javax.persistence.*;

@Getter
@Entity
@Table(name="productList")
@NoArgsConstructor
public class ProductList {
	
	@Id
	private int idx_num;
	
	private String address;
	private String farmer_name;
	private String farmer_company;
	private String farmer_comment;
	private String farmer_img_obj;
	private String product_category;
	private String product_name;
	private String product_attribute;
	private String sales_day;
	private String delivery_condition;
	private String product_local;
	private String is_tax;
	private Date d_date;
	private int price;
	private String product_img_obj;
	private String image_info;
	
	@Builder
	public ProductList(int idx_num, String address,String farmer_name,String farmer_company,String farmer_comment,String farmer_img_obj,String product_category
			,String product_name,String product_attribute,String sales_day,String delivery_condition
			,String product_local,String is_tax, Date d_date,int price,String product_img_obj,String image_info) {
		this.idx_num = idx_num;
		this.address = address;
		this.farmer_name = farmer_name;
		this.farmer_company = farmer_company;
		this.farmer_comment = farmer_comment;
		this.farmer_img_obj = farmer_img_obj;
		this.product_category = product_category;
		this.product_name = product_name;
		this.product_attribute = product_attribute;
		this.sales_day = sales_day;
		this.delivery_condition = delivery_condition;
		this.product_local = product_local;
		this.is_tax = is_tax;
		this.d_date = d_date;
		this.price = price;
		this.product_img_obj = product_img_obj;
		this.image_info = image_info;
	}
}
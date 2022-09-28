package com.service.yis.controller;

import com.service.yis.product.ProductDAO;
import com.service.yis.product.ProductVO;
import com.service.yis.product.PageMakeDTO;
import com.service.yis.product.Criteria;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.util.*;

@Controller
@RequestMapping(value = "/detailSearch", method = RequestMethod.GET)
public class SearchController3 {
    String keyword = "";
    ProductVO productVO = new ProductVO();
    ProductDAO dao = new ProductDAO();
    List productList = null;

    List johab = null;

    @GetMapping
    public String doC(HttpServletRequest request, Model model, Criteria cri) throws ParseException {
        keyword = request.getParameter("categoryB");
        String categoryA = request.getParameter("categoryA");
        String date1 = request.getParameter("date1");
        String date2 = request.getParameter("date2");
        String price1 = request.getParameter("price1");
        String price2 = request.getParameter("price2");
        String johabb = request.getParameter("johab");

        int priceInt1 = Integer.parseInt(price1);
        int priceInt2 = Integer.parseInt(price2);
        productVO.setProduct_name(keyword);
        productVO.setDate1(date1);
        productVO.setDate2(date2);
        productVO.setPrice1(priceInt1);
        productVO.setPrice2(priceInt2);
        productVO.setJohab(johabb);
        productList = dao.listDetail(productVO, cri);
        int total = dao.getDetailTotal(productVO);
        johab = dao.getJohabList();

        PageMakeDTO paging = new PageMakeDTO();
        paging.setCri(cri);
        paging.setTotal(total);

        model.addAttribute("detailList", productList);
        model.addAttribute("pagingD", paging);
        model.addAttribute("categoryA", categoryA);
        model.addAttribute("categoryB", keyword);
        model.addAttribute("date1", date1);
        model.addAttribute("date2", date2);
        model.addAttribute("price1", priceInt1);
        model.addAttribute("price2", priceInt2);
        model.addAttribute("johab", johab);
        model.addAttribute("johabb", johabb);
        model.addAttribute("total", total);

        return "search/testDetailRes";
    }
}



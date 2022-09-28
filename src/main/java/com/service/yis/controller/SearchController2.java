package com.service.yis.controller;

import com.service.yis.product.ProductDAO;
import com.service.yis.product.ProductVO;
import com.service.yis.product.PageMakeDTO;
import com.service.yis.product.Criteria;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

@Controller
@RequestMapping(value = "/keywordSearch", method = RequestMethod.GET)
public class SearchController2 {
    String keyword = "";
    ProductVO productVO = new ProductVO();
    ProductDAO dao = new ProductDAO();
    List productList = null;
    List johab = null;

    @GetMapping
    public String doB(HttpServletRequest request, Model model, Criteria cri) {
        keyword = request.getParameter("keyword");
        productVO.setProduct_name(keyword);
        productList = dao.listKeyword(productVO, cri);
        int total = dao.getKeywordTotal(productVO);
        johab = dao.getJohabList();

        PageMakeDTO paging = new PageMakeDTO();
        paging.setCri(cri);
        paging.setTotal(total);

        model.addAttribute("keyword", keyword);
        model.addAttribute("list", productList);
        model.addAttribute("paging", paging);
        model.addAttribute("total", total);
        model.addAttribute("johab", johab);

        return "search/testRes";
    }
}


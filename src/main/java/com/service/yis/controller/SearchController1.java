package com.service.yis.controller;

import com.service.yis.product.ProductDAO;
import com.service.yis.product.ProductVO;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@Controller
@RequestMapping("/search")
public class SearchController1 {
    ProductVO productVO = new ProductVO();
    ProductDAO dao = new ProductDAO();
    List fruitList1 = null;
    List fruitList2 = null;
    List fruitList3 = null;
    List vegetableList1 = null;
    List vegetableList2 = null;
    List vegetableList3 = null;
    List cropList1 = null;
    List cropList2 = null;
    List cropList3 = null;
    List johab = null;

    @GetMapping
    public String doA(Model model) {
        fruitList1 = dao.listFruit(productVO);
        fruitList2 = dao.listFruit(productVO);
        fruitList3 = dao.listFruit(productVO);
        vegetableList1 = dao.listVegetable(productVO);
        vegetableList2 = dao.listVegetable(productVO);
        vegetableList3 = dao.listVegetable(productVO);
        cropList1 = dao.listCrop(productVO);
        cropList2 = dao.listCrop(productVO);
        cropList3 = dao.listCrop(productVO);
        johab = dao.getJohabList();

        model.addAttribute("fruitlist1", fruitList1);
        model.addAttribute("fruitlist2", fruitList2);
        model.addAttribute("fruitlist3", fruitList3);
        model.addAttribute("vegetablelist1", vegetableList1);
        model.addAttribute("vegetablelist2", vegetableList2);
        model.addAttribute("vegetablelist3", vegetableList3);
        model.addAttribute("croplist1", cropList1);
        model.addAttribute("croplist2", cropList2);
        model.addAttribute("croplist3", cropList3);
        model.addAttribute("johab", johab);

        dao.Fruitstart = 0;
        dao.Vegetablestart = 0;
        dao.Cropstart = 0;

        return "search/BtoB";
    }
}



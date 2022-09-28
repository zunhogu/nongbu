package com.service.yis.product;

import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Date;
import java.util.Set;
import java.util.HashSet;
import java.util.Collections;

public class ProductDAO {
    Connection conn = null;
    Statement stmt = null;
    ResultSet rs = null;
    public int Fruitstart = 0;
    public int Vegetablestart = 0;
    public int Cropstart = 0;
    int amount = 4;
    String jdbcDriver = "jdbc:mysql://20.214.186.164:3306/yis?" +
            "useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true";
    String dbUser = "yis";
    String dbPass = "1234";

    public List listFruit(ProductVO productVO) {
        List<ProductVO> fruitList = new ArrayList<>();
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            conn = DriverManager.getConnection(jdbcDriver, dbUser, dbPass);
            stmt = conn.createStatement();
            rs = stmt.executeQuery("select * " + "from productList " + "where product_category = '" + "과일" + "'" + "limit " + Fruitstart + "," + amount);

            while (rs.next()) {
                int idx_num = rs.getInt("idx_num");
                String product_name = rs.getString("product_name");
                int price = rs.getInt("price");
                String Imgsrc = rs.getString("product_img_obj");
                String johab = rs.getString("farmer_company");

                ProductVO vo = new ProductVO();
                vo.setIdx_num(idx_num);
                vo.setProduct_name(product_name);
                vo.setPrice(price);
                vo.setImgsrc(Imgsrc);
                vo.setJohab(johab);

                fruitList.add(vo);
            }
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } finally {
            if (rs != null) try {
                rs.close();
            } catch (SQLException ex) {
            }
            if (stmt != null) try {
                stmt.close();
            } catch (SQLException ex) {
            }
            if (conn != null) try {
                conn.close();
            } catch (SQLException ex) {
            }
        }
        Fruitstart += 4;
        return fruitList;
    }

    public List listVegetable(ProductVO productVO) {
        List<ProductVO> vegetableList = new ArrayList<>();
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            conn = DriverManager.getConnection(jdbcDriver, dbUser, dbPass);
            stmt = conn.createStatement();
            rs = stmt.executeQuery("select * " + "from productList " + "where product_category = '" + "채소" + "'" + "limit " + Vegetablestart + "," + amount);

            while (rs.next()) {
                int idx_num = rs.getInt("idx_num");
                String product_name = rs.getString("product_name");
                int price = rs.getInt("price");
                String Imgsrc = rs.getString("product_img_obj");
                String johab = rs.getString("farmer_company");

                ProductVO vo = new ProductVO();
                vo.setIdx_num(idx_num);
                vo.setProduct_name(product_name);
                vo.setPrice(price);
                vo.setImgsrc(Imgsrc);
                vo.setJohab(johab);

                vegetableList.add(vo);
            }
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } finally {
            if (rs != null) try {
                rs.close();
            } catch (SQLException ex) {
            }
            if (stmt != null) try {
                stmt.close();
            } catch (SQLException ex) {
            }
            if (conn != null) try {
                conn.close();
            } catch (SQLException ex) {
            }
        }
        Vegetablestart += 4;
        return vegetableList;
    }

    public List listCrop(ProductVO productVO) {
        List<ProductVO> cropList = new ArrayList<>();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            conn = DriverManager.getConnection(jdbcDriver, dbUser, dbPass);
            stmt = conn.createStatement();
            rs = stmt.executeQuery("select * " + "from productList " + "where product_category = '" + "작물" + "'" + "limit " + Cropstart + "," + amount);

            while (rs.next()) {
                int idx_num = rs.getInt("idx_num");
                String product_name = rs.getString("product_name");
                int price = rs.getInt("price");
                String Imgsrc = rs.getString("product_img_obj");
                String johab = rs.getString("farmer_company");

                ProductVO vo = new ProductVO();
                vo.setIdx_num(idx_num);
                vo.setProduct_name(product_name);
                vo.setPrice(price);
                vo.setImgsrc(Imgsrc);
                vo.setJohab(johab);

                cropList.add(vo);
            }
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } finally {
            if (rs != null) try {
                rs.close();
            } catch (SQLException ex) {
            }
            if (stmt != null) try {
                stmt.close();
            } catch (SQLException ex) {
            }
            if (conn != null) try {
                conn.close();
            } catch (SQLException ex) {
            }
        }
        Cropstart += 4;
        return cropList;
    }

    public List listKeyword(ProductVO productVO, Criteria cri) {
        List<ProductVO> keywordList = new ArrayList<>();
        String keyword = productVO.getProduct_name();
        int pageNum = cri.pageNum - 1;
        int amount = cri.amount;

        try {
            int start = pageNum * 12;

            Class.forName("com.mysql.cj.jdbc.Driver");

            conn = DriverManager.getConnection(jdbcDriver, dbUser, dbPass);
            stmt = conn.createStatement();
            rs = stmt.executeQuery("select * from productList where product_name like '%" + keyword + "%'" + "limit " + start + "," + amount);

            while (rs.next()) {
                int idx_num = rs.getInt("idx_num");
                String product_name = rs.getString("product_name");
                int price = rs.getInt("price");
                String Imgsrc = rs.getString("product_img_obj");
                String johab = rs.getString("farmer_company");

                ProductVO vo = new ProductVO();
                vo.setIdx_num(idx_num);
                vo.setProduct_name(product_name);
                vo.setPrice(price);
                vo.setImgsrc(Imgsrc);
                vo.setJohab(johab);

                keywordList.add(vo);
            }
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } finally {
            if (rs != null) try {
                rs.close();
            } catch (SQLException ex) {
            }
            if (stmt != null) try {
                stmt.close();
            } catch (SQLException ex) {
            }
            if (conn != null) try {
                conn.close();
            } catch (SQLException ex) {
            }
        }
        return keywordList;
    }

    public List listDetail(ProductVO productVO, Criteria cri) throws ParseException {
        List<ProductVO> detailList = new ArrayList<>();
        String product_name = productVO.getProduct_name();
        String date1 = productVO.getDate1();
        String date2 = productVO.getDate2();
        int price1 = productVO.getPrice1();
        int price2 = productVO.getPrice2();
        String johab = productVO.getJohab();

        int pageNum = cri.pageNum - 1;
        int amount = cri.amount;

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date date1Res = formatter.parse(date1);
        Date date2Res = formatter.parse(date2);
        java.sql.Date sqlDate1 = new java.sql.Date(date1Res.getTime());
        java.sql.Date sqlDate2 = new java.sql.Date(date2Res.getTime());

        try {
            int start = pageNum * 12;
            Class.forName("com.mysql.cj.jdbc.Driver");

            conn = DriverManager.getConnection(jdbcDriver, dbUser, dbPass);
            stmt = conn.createStatement();
            rs = stmt.executeQuery("select * " +
                    "from productList " +
                    "where product_name " +
                    "like '%" + product_name + "%'" +
                    "and d_date >= '" + sqlDate1 + "'" +
                    "and d_date <= '" + sqlDate2 + "'" +
                    "and price >= " + price1 + " " +
                    "and price <= " + price2 + " " +
                    "and farmer_company = '" + johab + "'" +
                    "limit " + start + "," + amount);

            while (rs.next()) {
                int idx_num = rs.getInt("idx_num");
                String product_name1 = rs.getString("product_name");
                int price = rs.getInt("price");
                String Imgsrc = rs.getString("product_img_obj");
                String johab1 = rs.getString("farmer_company");

                ProductVO vo = new ProductVO();
                vo.setIdx_num(idx_num);
                vo.setProduct_name(product_name1);
                vo.setPrice(price);
                vo.setImgsrc(Imgsrc);
                vo.setJohab(johab1);

                detailList.add(vo);
            }
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } finally {
            if (rs != null) try {
                rs.close();
            } catch (SQLException ex) {
            }
            if (stmt != null) try {
                stmt.close();
            } catch (SQLException ex) {
            }
            if (conn != null) try {
                conn.close();
            } catch (SQLException ex) {
            }
        }
        return detailList;
    }

    public int getKeywordTotal(ProductVO productVO){
        int total = 0;
        String keyword = productVO.getProduct_name();
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            conn = DriverManager.getConnection(jdbcDriver, dbUser, dbPass);
            stmt = conn.createStatement();
            rs = stmt.executeQuery("select count(*) from productList where product_name like '%" + keyword + "%'");

            if(rs.next())
                total = rs.getInt(1);
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } finally {
            if (rs != null) try {
                rs.close();
            } catch (SQLException ex) {
            }
            if (stmt != null) try {
                stmt.close();
            } catch (SQLException ex) {
            }
            if (conn != null) try {
                conn.close();
            } catch (SQLException ex) {
            }
        }
        return total;
    }

    public int getDetailTotal(ProductVO productVO) throws ParseException {
        int total = 0;
        String product_name = productVO.getProduct_name();
        String date1 = productVO.getDate1();
        String date2 = productVO.getDate2();
        int price1 = productVO.getPrice1();
        int price2 = productVO.getPrice2();
        String johab = productVO.getJohab();

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        Date date1Res = formatter.parse(date1);
        Date date2Res = formatter.parse(date2);
        java.sql.Date sqlDate1 = new java.sql.Date(date1Res.getTime());
        java.sql.Date sqlDate2 = new java.sql.Date(date2Res.getTime());

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            conn = DriverManager.getConnection(jdbcDriver, dbUser, dbPass);
            stmt = conn.createStatement();
            rs = stmt.executeQuery("select count(*) " +
                    "from productList " +
                    "where product_name " +
                    "like '%" + product_name + "%'" +
                    "and d_date >= '" + sqlDate1 + "'" +
                    "and d_date <= '" + sqlDate2 + "'" +
                    "and price >= " + price1 + " " +
                    "and price <= " + price2 + " " +
                    "and farmer_company = '" + johab + "'");

            if(rs.next())
                total = rs.getInt(1);
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } finally {
            if (rs != null) try {
                rs.close();
            } catch (SQLException ex) {
            }
            if (stmt != null) try {
                stmt.close();
            } catch (SQLException ex) {
            }
            if (conn != null) try {
                conn.close();
            } catch (SQLException ex) {
            }
        }
        return total;
    }

    public List getJohabList() {
        List<String> johabList = new ArrayList<>();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");

            conn = DriverManager.getConnection(jdbcDriver, dbUser, dbPass);
            stmt = conn.createStatement();
            rs = stmt.executeQuery("select farmer_company from productList");

            while (rs.next()) {
                String johab = rs.getString("farmer_company");
                johabList.add(johab);
            }
        } catch (SQLException ex) {
            System.out.println(ex.getMessage());
            ex.printStackTrace();
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        } finally {
            if (rs != null) try {
                rs.close();
            } catch (SQLException ex) {
            }
            if (stmt != null) try {
                stmt.close();
            } catch (SQLException ex) {
            }
            if (conn != null) try {
                conn.close();
            } catch (SQLException ex) {
            }
        }
        Set<String> set = new HashSet<String>(johabList);
        List<String> NewjohabList = new ArrayList<String>(set);
        Collections.sort(NewjohabList);

        return NewjohabList;
    }
}


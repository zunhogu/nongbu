//package com.service.yis.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;


//import com.service.yis.repository.UserRepository;
//스프링이 컴포넌트 스캔을 통해서 Bean에 등록해줌. IOC

//@Service
//public class UserService {

//	@Autowired
//	private UserRepository userRepository;
//
//	@Transactional // 추가
//	public int jo(User user) {
//		try {
//			userRepository.save(user);
//			return 1;
//		} catch (Exception e) {
//			// TODO: handle exception
//			e.printStackTrace();
//			System.out.println("UserService: jo()" + e.getMessage());
//		}
//		return -1;
//	}
//
//	@Transactional // 업데이트
//	public void update(int id, User requestUser) {
//		User user = userRepository.findById(id).orElseThrow(() -> {
//			return new IllegalArgumentException("실패");
//		});
//		user.setUsername(requestUser.getUsername());
//		user.setUserdate(requestUser.getUserdate());
//		user.setUsernumber(requestUser.getUsernumber());
//		user.setUseremail(requestUser.getUseremail());
//
//	}
//
//	@Transactional // 삭제
//	public void delete(int id) {
//		userRepository.deleteById(id);
//	}
//
//	public List<User> mypage() {
//
//		return userRepository.findAll();
//
//	}
//
//	public User detail(int id) {// 해당 아이디 검색
//		return userRepository.findById(id).orElseThrow(() -> {
//			return new IllegalArgumentException("실패다 이녀석아");
//		});
//	}
//	
//
//	public void update1(int id, Files files) {
//		User user = userRepository.findById(id).orElseThrow(() -> {
//			return new IllegalArgumentException("실패");
//		});
//		
//		user.setUsername(user.getUsername());
//		user.setUserdate(user.getUserdate());
//		user.setUsernumber(user.getUsernumber());
//		user.setUseremail(user.getUseremail());
//		user.setFiles(files);
//		
//		userRepository.save(user);
//	}

//}

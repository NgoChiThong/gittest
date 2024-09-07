package com.project.booking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import com.project.booking.config.JwtToken;
import com.project.booking.entity.Cinema;
import com.project.booking.entity.Movie;
import com.project.booking.entity.User;
import com.project.booking.model.ResponseData;
import com.project.booking.model.UserNameProfile;
import com.project.booking.repository.UserRepository;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtToken token;

	@Autowired
	private PasswordEncoder passwordEncoder;

	public ResponseData<UserNameProfile> getUserProfileById(Integer userId) {
		UserNameProfile user = userRepository.getUserById(userId);
		if (user == null) {
			return new ResponseData<>(HttpStatus.NOT_FOUND, "User not found", null);
		}
		return new ResponseData<>(HttpStatus.OK, "success", user);
	}

//    public ResponseData<UserNameProfile > getAllUser(){
//        List<UserNameProfile > rs = userRepository.getAllUserProfiles();
//        if(CollectionUtils.isEmpty(rs)){
//            return new ResponseData(HttpStatus.NOT_FOUND, "failed", null);
//        }else{
//            return new ResponseData(HttpStatus.OK, "success",rs);
//        }
//    }

	public ResponseData<String> updateUser(Authentication authentication, UserNameProfile user) {
		Integer userId = userRepository.findIdByUsername(authentication.getName());
		if (userId == null) {
			return new ResponseData<>(HttpStatus.NOT_FOUND, "User not found", null);
		}
		Integer rs = userRepository.updateUser(user.getUsername(), user.getUserFullname(), user.getUserBirthday(),
				user.getUserGender(), user.getUserEmail(), user.getUserCity(), user.getUserPhone(), userId);
		return new ResponseData(HttpStatus.OK, "Success", rs);
	}

	public ResponseData<Integer> registerUser(User user) {
//	    if (user.getUsername() == null || user.getUserEmail() == null || user.getUserPhone() == null) {
//	        return new ResponseData<>(HttpStatus.BAD_REQUEST, "Username, email, and phone must not be null", null);
//    }
//
//	    if (userRepository.findByUsername(user.getUsername()) != null) {
//	        return new ResponseData<>(HttpStatus.CONFLICT, "Username exists", 0);
//	    }
//	    if (userRepository.findByEmail(user.getUserEmail()) != null) {
//	        return new ResponseData<>(HttpStatus.CONFLICT, "Email exists", 0);
//	    }
//	    if (userRepository.findByPhone(user.getUserPhone()) != null) {
//        return new ResponseData<>(HttpStatus.CONFLICT, "Phone exists", 0);
//    }

		String avatar = user.getUserGender() == 1 ? "http://lathanhhanh.tk/src/beta/img/trai.jpg"
				: "http://lathanhhanh.tk/src/beta/img/gai.jpg";

		try {
			Integer userId = userRepository.registerUser(user.getUsername(), passwordEncoder.encode(user.getPassword()),
					avatar, user.getUserFullname(), user.getUserBirthday(), user.getUserGender(), user.getUserEmail(),
					user.getUserCity(), user.getUserPhone());
			return new ResponseData<>(HttpStatus.OK, "Success", userId);
		} catch (Exception e) {
			return new ResponseData<>(HttpStatus.INTERNAL_SERVER_ERROR, "Error registering user", null);
		}
	}

	public ResponseData<String> loginUser(String username, String password) {
		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(username, password));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			String jwt = token.generateToken((UserDetails) authentication.getPrincipal());
			return new ResponseData<>(HttpStatus.OK, "Success", jwt);
		} catch (Exception e) {
			return new ResponseData<>(HttpStatus.UNAUTHORIZED, "An error occurred during sign-in.", null);
		}
	}

	public ResponseData<User> getInfo(Authentication authentication) {
		User user = userRepository.findByUsername(authentication.getName());
		if (user == null) {
			return new ResponseData<>(HttpStatus.NOT_FOUND, "User not found", null);
		}
		return new ResponseData<>(HttpStatus.OK, "Success", user);
	}

	// lay ra toan bo user
	public List<User> getAllUsers() {
		return userRepository.findAll();
	}
	
	//tìm user theo id
	 public User getUserById(int userId) {
	        return userRepository.findByUserId(userId);
	    }
}

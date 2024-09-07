package com.project.booking.controllerAdmin;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.project.booking.entity.Cinema;
import com.project.booking.entity.User;
import com.project.booking.model.ResponseData;
import com.project.booking.model.UserNameProfile;
import com.project.booking.service.CinemaService;
import com.project.booking.service.UserService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;

@RestController
@Api(value = "Api user")
@RequestMapping("/admin/user")
public class UserControllerAd {
    @Autowired
    private UserService userService;
    
//    @GetMapping("/{id}")
//    public ResponseEntity<?> getUserProfileById(@PathVariable Integer id) {
//        ResponseData<UserNameProfile> responseData = userService.getUserProfileById(id);
//        return new ResponseEntity<>(responseData, responseData.getStatus());
//    }
//    
//    @ApiOperation(value = "Lấy danh sách các tài khoản")
//    @GetMapping("")
//    public ResponseEntity<?> getAllUserProfile(){
//        return ResponseEntity.ok(userService.getAllUser());
//    }
    
    
    
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    @GetMapping("/{userId}")
    public User getUserById(@PathVariable int userId) {
        return userService.getUserById(userId);
    }
    
    
    
    
}

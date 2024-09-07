package com.project.booking.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.project.booking.entity.User;
import com.project.booking.model.ResponseData;
import com.project.booking.model.UserNameProfile;
import com.project.booking.service.UserService;

import javax.validation.Valid;
import java.util.HashMap;

@RestController
@Api(value = "Api user")
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;

    @ApiOperation(value = "Đăng ký user")
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        ResponseData<Integer> response = userService.registerUser(user);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @ApiOperation(value = "Cập nhật user")
    @PostMapping("/update")
    public ResponseEntity<?> updateUser(Authentication authentication, @Valid @RequestBody UserNameProfile user) {
        ResponseData<String> response = userService.updateUser(authentication, user);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @ApiOperation(value = "Đăng nhập - Get token login")
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody HashMap<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");
        ResponseData<String> response = userService.loginUser(username, password);
        return ResponseEntity.status(response.getStatus()).body(response);
    }

    @ApiOperation(value = "Lấy thông tin user")
    @GetMapping("/info")
    public ResponseEntity<?> getInfo(Authentication authentication) {
        ResponseData<User> response = userService.getInfo(authentication);
        return ResponseEntity.status(response.getStatus()).body(response);
    }
}

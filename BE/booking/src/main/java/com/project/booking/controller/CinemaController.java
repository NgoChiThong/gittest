package com.project.booking.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.booking.service.CinemaService;

@RestController
@Api(description = "Api cinemas")
@RequestMapping("/cinema")
public class CinemaController {

    @Autowired
    CinemaService cinemaService;
    @ApiOperation(value = "Lấy rạp theo suất chiếu")
    @GetMapping("/{schedule_id}")
    public ResponseEntity<?> getCinemaByScheduleId(@PathVariable Integer schedule_id){
        return ResponseEntity.ok(cinemaService.getCinemaByScheduleId(schedule_id));
    }
}

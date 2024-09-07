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
import com.project.booking.service.ScheduleService;

@RestController
@Api(description = "Api schedule")
@RequestMapping("/schedule")
public class ScheduleController {
    @Autowired
    ScheduleService scheduleService;
    @Autowired
    CinemaService cinemaService;

    @ApiOperation(value = "Lấy rạp theo suất chiếu")
    @GetMapping("/{schedule_id}")
    public ResponseEntity<?> getCinemaByScheduleId(@PathVariable Integer schedule_id){
        return ResponseEntity.ok(cinemaService.getCinemaByScheduleId(schedule_id));
    }

    @ApiOperation(value = "Get suất chiếu")
    @GetMapping("/{movie_id}/{schedule_date}")
    public ResponseEntity<?> getScheduleCinema(@PathVariable Integer movie_id, @PathVariable String schedule_date){
        return ResponseEntity.ok(scheduleService.getScheduleCinema(movie_id, schedule_date));
    }
    
    
    
    //viet lai
    @GetMapping("/movie/{movie_id}")
    public ResponseEntity<?> getSchedule(@PathVariable Integer movie_id){
        return ResponseEntity.ok(scheduleService.getAllMovie(movie_id));
    }
    @GetMapping("/movieschedule/{movie_id}")
    public ResponseEntity<?> getAllSchedule(@PathVariable Integer movie_id){
        return ResponseEntity.ok(scheduleService.getAllByMovie(movie_id));
    }
}

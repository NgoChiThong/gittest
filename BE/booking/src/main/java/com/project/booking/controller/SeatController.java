package com.project.booking.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.booking.entity.Seat;
import com.project.booking.service.SeatService;

@RestController
@Api(description = "Api seat")
@RequestMapping("/seat")
public class SeatController {
    @Autowired
    SeatService seatService;

    @ApiOperation(value = "Lấy ghế trống theo suất chiếu")
    @GetMapping("/{schedule_id}/seat-empty")
    public ResponseEntity<?> getSeatEmpty(@PathVariable Integer schedule_id){
        return ResponseEntity.ok(seatService.getSeatEmpty(schedule_id));
    }
    
//    @GetMapping("/{schedule_id}")
//    public ResponseEntity<?> getSeatsBySchedule(@PathVariable Integer scheduleId) {
//        return ResponseEntity.ok(seatService.getSeatsBySchedule(scheduleId));
//    }
    
    @GetMapping("/s/{schedule_id}")
    public ResponseEntity<?> getSeat(@PathVariable Integer schedule_id){
        return ResponseEntity.ok(seatService.getSeatsBySchedule(schedule_id));
    }
    @GetMapping("/sbooked/{schedule_id}")
    public ResponseEntity<?> getSeatBooked(@PathVariable Integer schedule_id){
        return ResponseEntity.ok(seatService.getSeatsBookedBySchedule(schedule_id));
    }
}

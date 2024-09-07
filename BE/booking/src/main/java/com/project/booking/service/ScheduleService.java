package com.project.booking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.project.booking.entity.Movie;
import com.project.booking.entity.Schedule;
import com.project.booking.model.ResponseData;
import com.project.booking.model.ResponseScheduleCinema;
import com.project.booking.repository.CinemaRepository;
import com.project.booking.repository.ScheduleRepository;

import java.util.List;

@Service
public class ScheduleService {
	@Autowired
	ScheduleRepository scheduleRepository;

	@Autowired
	CinemaRepository cinemaRepository;

	public ResponseData<ResponseScheduleCinema> getScheduleCinema(Integer movie_id, String schedule_date) {
		List<ResponseScheduleCinema> rs = scheduleRepository.getSchedule(movie_id, schedule_date);
		if (CollectionUtils.isEmpty(rs)) {
			return new ResponseData(HttpStatus.NOT_FOUND, "not found schedule", null);
		} else {
			return new ResponseData(HttpStatus.OK, "success", scheduleRepository.getSchedule(movie_id, schedule_date));
		}
	}
	// lich chieu theo id phim

	public ResponseData<Schedule> getAllMovie(Integer movieId) {
		List<Schedule> rs = scheduleRepository.getAll(movieId);
		if (CollectionUtils.isEmpty(rs)) {
			return new ResponseData(HttpStatus.NOT_FOUND, "failed", null);
		} else {
			return new ResponseData(HttpStatus.OK, "success", rs);
		}
	}
	public ResponseData<Schedule> getAllByMovie(Integer movieId) {
		List<Schedule> rs = scheduleRepository.getAllByID(movieId);
		if (CollectionUtils.isEmpty(rs)) {
			return new ResponseData(HttpStatus.NOT_FOUND, "failed", null);
		} else {
			return new ResponseData(HttpStatus.OK, "success", rs);
		}
	}
	public ResponseData<Schedule> getScheduleById(Integer scheduleId) {
   	 Schedule schedule = scheduleRepository.findScheduleById(scheduleId);
       if (schedule == null) {
           return new ResponseData<>(HttpStatus.NOT_FOUND, "Schedule not found", null);
       }
       return new ResponseData<>(HttpStatus.OK, "success", schedule);
   }
	
	public ResponseData<Schedule> getAllSchedule(){
        List<Schedule> rs = scheduleRepository.getAllSchedules();
        if(CollectionUtils.isEmpty(rs)){
            return new ResponseData(HttpStatus.NOT_FOUND, "failed", null);
        }else{
            return new ResponseData(HttpStatus.OK, "success",rs);
        }
    }

	public Schedule addSchedule(Schedule schedule) {
		return scheduleRepository.save(schedule);
	}

	public Schedule updateSchedule(int scheduleId, Schedule scheduleDetails) {
	    Schedule schedule = scheduleRepository.findById(scheduleId)
	            .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + scheduleId));
	    schedule.setMovieId(scheduleDetails.getMovieId());
	    schedule.setRoomId(scheduleDetails.getRoomId());
	    schedule.setScheduleDate(scheduleDetails.getScheduleDate());
	    schedule.setScheduleStart(scheduleDetails.getScheduleStart());
	    schedule.setScheduleEnd(scheduleDetails.getScheduleEnd());
	    return scheduleRepository.save(schedule);
	}
	
	public void deleteSchedule(int scheduleId) {
	    Schedule schedule = scheduleRepository.findById(scheduleId)
	            .orElseThrow(() -> new RuntimeException("Schedule not found with id: " + scheduleId));
	    scheduleRepository.delete(schedule);
	}
}

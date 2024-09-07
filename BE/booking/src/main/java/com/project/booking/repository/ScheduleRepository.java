package com.project.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.booking.entity.Movie;
import com.project.booking.entity.Schedule;
import com.project.booking.model.*;

import java.util.List;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

	@Query(nativeQuery = true, name = "getResponseCinema")
	List<ResponseCinema> getScheduleCinema(Integer movie_id, String schedule_date);

	@Query(name = "getScheduleFormat", nativeQuery = true)
	String getFormat(Integer movie_id, String schedule_date, Integer cinema_id);

	@Query(name = "getScheduleTimeByFilm", nativeQuery = true)
	List<ResponseScheduleTime> getScheduleTimeByFilm(Integer movie_id, String schedule_date, Integer cinema_id);

	@Query(name = "showSchedule", nativeQuery = true)
	List<ResponseScheduleCinema> getSchedule(Integer movie_id, String schedule_date);

	// chinh lai
	@Query(value = "WITH RankedSchedules AS (" + "    SELECT " + "        schedule_id, " + "        movie_id, "
			+ "        room_id, " + "        schedule_date, " + "        schedule_start, " + "        schedule_end, "
			+ "        ROW_NUMBER() OVER (PARTITION BY schedule_date ORDER BY schedule_date) as row_num " + "    FROM "
			+ "        `schedule` " + "    WHERE " + "        movie_id = ?1" + ") " + "SELECT " + "    schedule_id, "
			+ "    movie_id, " + "    room_id, " + "    schedule_date, " + "    schedule_start, " + "    schedule_end "
			+ "FROM " + "    RankedSchedules " + "WHERE " + "    row_num = 1 " + "ORDER BY "
			+ "    schedule_date", nativeQuery = true)
	List<Schedule> getAll(Integer movie_id);

	@Query(value = "SELECT schedule_id, movie_id, room_id, schedule_date, schedule_start, schedule_end FROM `schedule` WHERE movie_id = ?1", nativeQuery = true)
	List<Schedule> getAllByID(Integer movie_id);
	
	//lay  theo id
    @Query(value = "SELECT * FROM schedule WHERE schedule_id = :scheduleId", nativeQuery = true)
    Schedule findScheduleById(@Param("scheduleId") Integer scheduleId);
    //lay toan bo 
    @Query(value = "SELECT * FROM `schedule` ORDER BY schedule_id DESC", nativeQuery = true)
    List<Schedule> getAllSchedules();

}
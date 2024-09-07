package com.project.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.booking.entity.Cinema;
import com.project.booking.entity.Movie;
import com.project.booking.model.ResponseScheduleCinema;

import java.util.List;

@Repository
public interface CinemaRepository extends JpaRepository<Cinema, Integer> {
    @Query(value = "SELECT `cinemas`.* FROM `cinemas`,`schedule`, `room` WHERE `schedule`.`room_id` = `room`.`room_id` AND `room`.`cinema_id`  = `cinemas`.`cinema_id` AND `schedule`.`schedule_id` = ?1", nativeQuery = true)
    Cinema getCinemasByIdSchedule(Integer schedule_id);

    @Query(nativeQuery = true, value = "SELECT `cinemas`.* FROM `cinemas`, `schedule`, `room` WHERE `schedule`.`room_id` = `room`.`room_id` AND `room`.`cinema_id` = `cinemas`.`cinema_id` AND `schedule`.`movie_id` = ?1 AND `schedule`.`schedule_date` = ?2")
    List<Cinema> getScheduleCinema(Integer movie_id, String schedule_date);
    
  //lay  theo id
    @Query(value = "SELECT * FROM cinemas WHERE cinema_id = :cinemaId", nativeQuery = true)
    Cinema findCinemaById(@Param("cinemaId") Integer cinemaId);
    //lay toan bo 
    @Query(value = "SELECT * FROM `cinemas` ORDER BY cinema_id DESC", nativeQuery = true)
    List<Cinema> getAllCinemas();
}

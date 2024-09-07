package com.project.booking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.booking.entity.Movie;
import com.project.booking.entity.Room;

@Repository
public interface RoomRepository extends JpaRepository<Room, Integer> {
	//lay  theo id
    @Query(value = "SELECT * FROM room WHERE room_id = :roomId", nativeQuery = true)
    Room findRoomById(@Param("roomId") Integer roomId);
    //lay toan bo 
    @Query(value = "SELECT * FROM `room` ORDER BY room_id DESC", nativeQuery = true)
    List<Room> getAllRooms();
}

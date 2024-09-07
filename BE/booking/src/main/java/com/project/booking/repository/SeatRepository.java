package com.project.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.booking.entity.Seat;
import com.project.booking.model.ResponseSeat;
import com.project.booking.model.ResponseSeatEmpty;

import java.util.List;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Integer> {
    //lấy ghế trống theo id film và id schedule
    @Query(name = "getSeatEmpty", nativeQuery = true)
    List<ResponseSeat> getSeatEmptyBySchedule(Integer schedule_id);
    //
    //
    
    @Query(value ="SELECT se.seat_id, se.seat_type, se.room_id, se.seat_row, se.seat_number "
    		+ "FROM schedule s "
    		+ "JOIN room r ON s.room_id = r.room_id "
    		+ "JOIN seats se ON r.room_id = se.room_id "
    		+ "WHERE s.schedule_id = :scheduleId", nativeQuery = true )
     List<Seat> findSeatsByScheduleId(Integer scheduleId);
    
    @Query(value ="SELECT se.seat_id,	se.seat_type,	se.room_id,	se.seat_row, se.seat_number "
    		+ "FROM schedule s "
    		+ "INNER JOIN order_details b ON s.schedule_id = b.schedule_id "
    		+ "INNER JOIN seats se ON b.seat_id = se.seat_id "
    		+ "WHERE s.schedule_id = :scheduleId", nativeQuery = true )
     List<Seat> findSeatsBookedByScheduleId(Integer scheduleId);
}

package com.project.booking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.project.booking.entity.Movie;
import com.project.booking.entity.Room;
import com.project.booking.model.ResponseData;
import com.project.booking.repository.RoomRepository;

@Service
public class RoomService {
	@Autowired
	RoomRepository roomRepository;
	
	public Room addRoom(Room room) {
        return roomRepository.save(room);
    }
	
	public ResponseData<Room> getRoomById(Integer roomId) {
   	 Room room = roomRepository.findRoomById(roomId);
       if (room == null) {
           return new ResponseData<>(HttpStatus.NOT_FOUND, "Room not found", null);
       }
       return new ResponseData<>(HttpStatus.OK, "success", room);
   }
	
	public ResponseData<Room> getAllRoom(){
        List<Room> rs = roomRepository.getAllRooms();
        if(CollectionUtils.isEmpty(rs)){
            return new ResponseData(HttpStatus.NOT_FOUND, "failed", null);
        }else{
            return new ResponseData(HttpStatus.OK, "success",rs);
        }
    }

	
	public Room updateRoom(int roomId, Room roomDetails) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));
        room.setCinemaId(roomDetails.getCinemaId());
        room.setRoomName(roomDetails.getRoomName());
        return roomRepository.save(room);
    }

    public void deleteRoom(int roomId) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RuntimeException("Room not found with id: " + roomId));
        roomRepository.delete(room);
    }
}

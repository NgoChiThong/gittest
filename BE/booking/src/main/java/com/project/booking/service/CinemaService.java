package com.project.booking.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import com.project.booking.entity.Cinema;
import com.project.booking.entity.Movie;
import com.project.booking.model.ResponseData;
import com.project.booking.repository.CinemaRepository;

@Service
public class CinemaService {
    @Autowired
    CinemaRepository cinemaRepository;

    public ResponseData<Cinema> getCinemaByScheduleId(Integer schedule_id){
        return new ResponseData(HttpStatus.OK, "success", cinemaRepository.getCinemasByIdSchedule(schedule_id));
    }
    public ResponseData<Cinema> getCinemaById(Integer cinemaId) {
   	 Cinema cinema = cinemaRepository.findCinemaById(cinemaId);
       if (cinema == null) {
           return new ResponseData<>(HttpStatus.NOT_FOUND, "Cinema not found", null);
       }
       return new ResponseData<>(HttpStatus.OK, "success", cinema);
   }
    
    public ResponseData<Movie> getAllCinema(){
        List<Cinema> rs = cinemaRepository.getAllCinemas();
        if(CollectionUtils.isEmpty(rs)){
            return new ResponseData(HttpStatus.NOT_FOUND, "failed", null);
        }else{
            return new ResponseData(HttpStatus.OK, "success",rs);
        }
    }

    
//  Thêm rạp
  public Cinema addCinema(Cinema cinema) {
      return cinemaRepository.save(cinema);
  }
//  Sửa rạp
  public Cinema updateCinema(int cinemaId, Cinema cinemaDetails) {
      Cinema cinema = cinemaRepository.findById(cinemaId)
                                        .orElseThrow(() -> new RuntimeException("Cinema not found with id: " + cinemaId));

      cinema.setCinemaName(cinemaDetails.getCinemaName());
      cinema.setCinemaAddress(cinemaDetails.getCinemaAddress());

      return cinemaRepository.save(cinema);
  }
//  Xóa rạp
  public void deleteCinema(int cinemaId) {
      Cinema cinema = cinemaRepository.findById(cinemaId)
                                        .orElseThrow(() -> new RuntimeException("Cinema not found with id: " + cinemaId));

      cinemaRepository.delete(cinema);
  }
}

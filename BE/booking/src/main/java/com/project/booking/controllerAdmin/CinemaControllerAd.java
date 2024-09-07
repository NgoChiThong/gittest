package com.project.booking.controllerAdmin;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.booking.entity.Cinema;
import com.project.booking.entity.Movie;
import com.project.booking.model.ResponseData;
import com.project.booking.service.CinemaService;

@RestController
@Api(description = "Api cinemas")
@RequestMapping("/admin/cinema")
public class CinemaControllerAd {

    @Autowired
    CinemaService cinemaService;
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getCinemaById(@PathVariable Integer id) {
        ResponseData<Cinema> responseData = cinemaService.getCinemaById(id);
        return new ResponseEntity<>(responseData, responseData.getStatus());
    }
    
    @ApiOperation(value = "Lấy danh sách các rạp")
    @GetMapping("")
    public ResponseEntity<?> getAllCinema(){
        return ResponseEntity.ok(cinemaService.getAllCinema());
    }
    
    @ApiOperation(value = "Thêm rạp chiếu")
    @PostMapping("/add")
    public ResponseEntity<Cinema> addCinema(@RequestBody Cinema cinema) {
        Cinema addedCinema = cinemaService.addCinema(cinema);
        return new ResponseEntity<>(addedCinema, HttpStatus.OK);
    }
    
    @ApiOperation(value = "Sửa rạp chiếu")
    @PutMapping("/update/{id}")
    public ResponseEntity<Cinema> updateCinema(@PathVariable("id") int cinemaId, @RequestBody Cinema cinemaDetails) {
        Cinema updatedCinema = cinemaService.updateCinema(cinemaId, cinemaDetails);
        return new ResponseEntity<>(updatedCinema, HttpStatus.OK);
    }
    
    @ApiOperation(value = "Xóa rạp chiếu")
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteCinema(@PathVariable("id") int cinemaId) {
        cinemaService.deleteCinema(cinemaId);
        return ResponseEntity.ok("Cinema deleted successfully");
    }
}

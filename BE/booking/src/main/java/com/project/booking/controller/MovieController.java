package com.project.booking.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.booking.entity.Movie;
import com.project.booking.model.ResponseData;
import com.project.booking.service.MovieSevice;

@RestController
@Api(description = "Api movie")
@RequestMapping("/movies")
public class MovieController {
    @Autowired
    MovieSevice movieSevice;

    @ApiOperation(value = "Lấy danh sách các bộ phim")
    @GetMapping("")
    public ResponseEntity<?> getAllMovies(){
        return ResponseEntity.ok(movieSevice.getAllMovie());
    }

    @ApiOperation(value = "Lấy danh sách phim đang chiếu")
    @GetMapping("/now")
    public ResponseEntity<?> getMoviesNow(){
        return ResponseEntity.ok(movieSevice.getMoviesNow());
    }

    @ApiOperation(value = "Lấy danh sách phim sắp chiếu")
    @GetMapping("/future")
    public ResponseEntity<?> getMoviesFuture(){
        return ResponseEntity.ok(movieSevice.getMoviesFuture());
    }
    @GetMapping("/{id}")
    public ResponseEntity<?> getMovieById(@PathVariable Integer id) {
        ResponseData<Movie> responseData = movieSevice.getMovieById(id);
        return new ResponseEntity<>(responseData, responseData.getStatus());
    }
    
    @ApiOperation(value = "Tìm kiếm phim theo tên")
    @PostMapping("/search")
    public ResponseEntity<?> searchMovieByName(@RequestBody Map<String, String> requestBody) {
        String keyword = requestBody.get("keyword");
        if (keyword == null) {
            return new ResponseEntity<>("Missing 'keyword' parameter", HttpStatus.BAD_REQUEST);
        }
        return ResponseEntity.ok(movieSevice.searchMovieByName(keyword));
    }
}

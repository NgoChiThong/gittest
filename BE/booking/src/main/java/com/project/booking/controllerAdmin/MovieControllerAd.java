package com.project.booking.controllerAdmin;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import com.project.booking.entity.Movie;
import com.project.booking.model.ResponseData;
import com.project.booking.repository.MovieRepository;
import com.project.booking.service.MovieSevice;


@RestController
@Api(description = "Api movie")
@RequestMapping("/admin/movies")
public class MovieControllerAd {
	@Autowired
	MovieSevice movieSevice;


	@Autowired
	MovieRepository movieRepository;


//    Thêm phim mới
//	@PostMapping("/add")
//	public ResponseEntity<Movie> addMovie(@RequestParam String movieName, @RequestParam String movieDescription,
//			@RequestParam String movieCens, @RequestParam String movieGenres, @RequestParam String movieRelease,
//			@RequestParam String movieLength, @RequestParam String movieFormat,
//			@RequestParam("poster") MultipartFile poster, @RequestParam("trailer") MultipartFile trailer) throws IOException {
//
//		Movie createMovie = movieSevice.createMovie(movieName, movieDescription, movieCens, movieGenres, movieRelease, movieLength, movieFormat, poster, trailer);
//		return new ResponseEntity<>(createMovie, HttpStatus.OK);
//	}
	 @PostMapping("/add")
	    public ResponseEntity<Movie> addMovie(@RequestBody Movie movie) {
	        Movie newMovie = movieSevice.addMovie(movie);
	        return new ResponseEntity<>(newMovie, HttpStatus.CREATED);
	    }

//    Xóa phim
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteMovie(@PathVariable Integer id) {
		try {
			movieSevice.deleteMovie(id);
			return ResponseEntity.ok("Movie deleted successfully");
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while deleting the movie");
		}
	}

//    Cập nhật phim
//	@PutMapping("/update/{id}")
//    public ResponseEntity<Movie> updateMovie(@PathVariable("id") int movieId, @RequestParam("poster") MultipartFile poster, @RequestParam("trailer") MultipartFile trailer, @ModelAttribute Movie movieDetails) {
//        Movie updatedMovie = movieSevice.updateMovie(movieId, poster, trailer, movieDetails);
//        return new ResponseEntity<>(updatedMovie, HttpStatus.OK);
//    }
	 @PutMapping("/update/{id}")
	    public ResponseEntity<Movie> updateMovie(@PathVariable("id") int movieId, @RequestBody Movie movieDetails) {
	        Movie updatedMovie = movieSevice.updateMovie(movieId, movieDetails);
	        return new ResponseEntity<>(updatedMovie, HttpStatus.OK);
	    }
}

package com.project.booking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import com.project.booking.entity.Movie;
import com.project.booking.model.ResponseData;
import com.project.booking.repository.MovieRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class MovieSevice {
    @Autowired
    MovieRepository movieRepository;
    private static final String UPLOAD_DIR = "uploads/";

    public ResponseData<Movie> getAllMovie(){
        List<Movie> rs = movieRepository.getAllMovies();
        if(CollectionUtils.isEmpty(rs)){
            return new ResponseData(HttpStatus.NOT_FOUND, "failed", null);
        }else{
            return new ResponseData(HttpStatus.OK, "success",rs);
        }
    }

    public ResponseData<Movie> getMoviesNow(){
        List<Movie> rs = movieRepository.getMoviesNow();
        if(CollectionUtils.isEmpty(rs)){
            return new ResponseData(HttpStatus.NOT_FOUND, "failed", null);
        }else{
            return new ResponseData(HttpStatus.OK, "success",rs);
        }
    }

    public ResponseData<Movie> getMoviesFuture(){
        List<Movie> rs = movieRepository.getMoviesFuture();
        if(CollectionUtils.isEmpty(rs)){
            return new ResponseData(HttpStatus.NOT_FOUND, "failed", null);
        }else{
            return new ResponseData(HttpStatus.OK, "success", rs);
        }
    }
    public ResponseData<Movie> getMovieById(Integer movieId) {
//       Movie movie = new Movie(null, null, null, null, null, null, null, null, null);
    	 Movie movie = movieRepository.findMovieById(movieId);
        if (movie == null) {
            return new ResponseData<>(HttpStatus.NOT_FOUND, "Movie not found", null);
        }
        return new ResponseData<>(HttpStatus.OK, "success", movie);
    }
    //tim kiem phim
    public ResponseData<Movie> searchMovieByName(String keyword) {
        List<Movie> rs = movieRepository.searchByMovieName(keyword);
        if (CollectionUtils.isEmpty(rs)) {
            return new ResponseData(HttpStatus.NOT_FOUND, "No movies found with the given keyword", null);
        } else {
            return new ResponseData(HttpStatus.OK, "success", rs);
        }
    }
    
//    public Movie createMovie(String movieName, String movieDescription, String movieCens, String movieGenres,
//			String movieRelease, String movieLength, String movieFormat, MultipartFile poster, MultipartFile trailer) {
//
//		String formattedMovieLength = formatMovieLength(movieLength);
//		Movie movie = new Movie();
//		movie.setMovieName(movieName);
//		movie.setMovieDescription(movieDescription);
//		movie.setMovieCens(movieCens);
//		movie.setMovieGenres(movieGenres);
//		movie.setMovieRelease(movieRelease);
//		movie.setMovieLength(formattedMovieLength);
//		movie.setMovieFormat(movieFormat);
//
//		// Save poster file
//		if (poster != null && !poster.isEmpty()) {
//			String posterPath;
//			try {
//				posterPath = saveFile(poster);
//				movie.setMoviePoster(posterPath);
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//			
//		}
//
//		// Save trailer file
//		if (trailer != null && !trailer.isEmpty()) {
//			String trailerPath;
//			try {
//				trailerPath = saveFile(trailer);
//				movie.setMovieTrailer(trailerPath);
//			} catch (IOException e) {
//				// TODO Auto-generated catch block
//				e.printStackTrace();
//			}
//			
//		}
//
//		return movieRepository.save(movie);
//	}
	
	public static String saveFile(MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            throw new IOException("Failed to store empty file.");
        }
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        String fileName = file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }
    private String formatMovieLength(String movieLength) {
        if (movieLength.matches("\\d+")) {
            int totalMinutes = Integer.parseInt(movieLength);
            int hours = totalMinutes / 60;
            int minutes = totalMinutes % 60;
            return String.format("%02d:%02d:00", hours, minutes);
        }
        return movieLength;
    }

	public void deleteMovie(Integer id) {
		if (movieRepository.existsById(id)) {
			movieRepository.deleteById(id);
		} else {
			throw new RuntimeException("Movie not found with id: " + id);
		}
	}

//	public Movie updateMovie(int movieId, MultipartFile poster, MultipartFile trailer, Movie movieDetails) {
//        Movie movie = movieRepository.findById(movieId)
//                                      .orElseThrow(() -> new RuntimeException("Movie not found with id: " + movieId));
//
//        movie.setMovieName(movieDetails.getMovieName());
//        movie.setMovieDescription(movieDetails.getMovieDescription());
//        movie.setMovieCens(movieDetails.getMovieCens());
//        movie.setMovieGenres(movieDetails.getMovieGenres());
//        movie.setMovieRelease(movieDetails.getMovieRelease());
//        movie.setMovieLength(movieDetails.getMovieLength());
//        movie.setMovieFormat(movieDetails.getMovieFormat());
//
//        if (poster != null && !poster.isEmpty()) {
//			String posterPath;
//			try {
//				posterPath = saveFile(poster);
//				movie.setMoviePoster(posterPath);
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//			
//		}
//
//		// Save trailer file
//		if (trailer != null && !trailer.isEmpty()) {
//			String trailerPath;
//			try {
//				trailerPath = saveFile(trailer);
//				movie.setMovieTrailer(trailerPath);
//			} catch (IOException e) {
//				e.printStackTrace();
//			}
//			
//		}
//
//        return movieRepository.save(movie);
//    }
	 public Movie updateMovie(int movieId, Movie movieDetails) {
	        Movie movie = movieRepository.findById(movieId)
	                                      .orElseThrow(() -> new RuntimeException("Movie not found with id: " + movieId));

	        // Check and update fields if provided
	        if (movieDetails.getMovieName() != null)
	            movie.setMovieName(movieDetails.getMovieName());
	        if (movieDetails.getMovieDescription() != null)
	            movie.setMovieDescription(movieDetails.getMovieDescription());
	        if (movieDetails.getMovieCens() != null)
	            movie.setMovieCens(movieDetails.getMovieCens());
	        // similarly for other fields...

	        return movieRepository.save(movie);
	    }

	 
	 public Movie addMovie(Movie movie) {
	        // Logic to save the movie to database
	        return movieRepository.save(movie);
	    }
}

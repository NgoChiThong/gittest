package com.project.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.booking.entity.Movie;

import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    // get phim đang chiếu
    // SELECT * FROM `movies` WHERE `movie_release` = CURRENT_DATE OR `movie_release` < CURRENT_DATE
	// @Query(value = "SELECT `movie_id`,`movie_name`,`movie_description`,`movie_trailer`,`movie_cens`,`movie_genres`,DATE_FORMAT(`movie_release`, \"%d/%m/%Y\") as `movie_release`,`movie_lenght`,`movie_format`,`movie_poster` FROM `movies` WHERE `movie_release` = CURRENT_DATE OR `movie_release` < CURRENT_DATE", nativeQuery = true)
	@Query(value = "SELECT  m.movie_id,m.movie_name,m.movie_description,m.movie_trailer,m.movie_cens,m.movie_genres,DATE_FORMAT(m.movie_release, \"%d/%m/%Y\") as movie_release,m.movie_lenght,m.movie_format,m.movie_poster FROM movies m JOIN schedule s ON m.movie_id = s.movie_id WHERE (m.movie_release = CURRENT_DATE OR m.movie_release < CURRENT_DATE) AND s.schedule_date = (SELECT MIN(s1.schedule_date) FROM schedule s1 WHERE s1.movie_id = m.movie_id AND s1.schedule_date >= CURRENT_DATE );", nativeQuery = true)
	List<Movie> getMoviesNow();

	// get phim sắp chiếu
	// SELECT * FROM `movies` WHERE `movie_release` > CURRENT_DATE
	@Query(value = "SELECT `movie_id`,`movie_name`,`movie_description`,`movie_trailer`,`movie_cens`,`movie_genres`,DATE_FORMAT(`movie_release`, \"%d/%m/%Y\") as `movie_release`,`movie_lenght`,`movie_format`,`movie_poster` FROM `movies` WHERE `movie_release` > CURRENT_DATE", nativeQuery = true)
	List<Movie> getMoviesFuture();

	// lay phim theo id
	@Query(value = "SELECT * FROM movies WHERE movie_id = :movieId", nativeQuery = true)
	Movie findMovieById(@Param("movieId") Integer movieId);

	// lay toan bo phim
	@Query(value = "SELECT `movie_id`,`movie_name`,`movie_description`,`movie_trailer`,`movie_cens`,`movie_genres`,DATE_FORMAT(`movie_release`, \"%d/%m/%Y\") as `movie_release`,`movie_lenght`,`movie_format`,`movie_poster` FROM `movies` ORDER BY movie_id DESC", nativeQuery = true)
	List<Movie> getAllMovies();

	// tim kiem phim
	@Query(value = "SELECT * FROM movies WHERE movie_name LIKE %:keyword%", nativeQuery = true)
	List<Movie> searchByMovieName(@Param("keyword") String keyword);
}

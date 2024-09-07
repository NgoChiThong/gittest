package com.project.booking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.booking.entity.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

	@Transactional
	@Modifying
	@Query(value = "UPDATE `orders` SET `status`= 1 WHERE `user_id`= ?1 AND `order_id`= ?2", nativeQuery = true)
	Integer updateStatus(Integer user_id, Integer booking_id);

	@Transactional
	@Modifying
	@Query(value = "INSERT INTO `booking`(`user_id`, `schedule_id`, `seat_id`, `price`, `seat_status`) VALUES (?1, ?2, ?3, ?4, ?5)", nativeQuery = true)
	Integer bookTicket(Integer user_id, Integer schedule_id, Integer seat_id, Double price, Integer seat_status);

	// lay danh sach ve
	@Query(value = "SELECT " + "o.order_id, " + "o.order_code," + "o.order_date, " + "m.movie_name, "
			+ "m.movie_poster, " + "s.schedule_date, " + "s.schedule_start, " + "c.cinema_name, " + "r.room_name, "
			+ "GROUP_CONCAT(CONCAT(seat.seat_row, seat.seat_number) SEPARATOR ', ') AS seats " + ", o.total_price "
			+ "FROM orders o " + "JOIN order_details od ON o.order_id = od.order_id "
			+ "JOIN schedule s ON od.schedule_id = s.schedule_id " + "JOIN movies m ON s.movie_id = m.movie_id "
			+ "JOIN room r ON s.room_id = r.room_id " + "JOIN cinemas c ON r.cinema_id = c.cinema_id "
			+ "JOIN seats seat ON od.seat_id = seat.seat_id " + "WHERE o.user_id = :userId "
			+ "GROUP BY o.order_id, o.order_code, o.order_date, m.movie_name, m.movie_poster, s.schedule_date, s.schedule_start, c.cinema_name, r.room_name, o.total_price ORDER BY  o.order_id DESC", nativeQuery = true)
	List<Object[]> findOrdersByUserId(@Param("userId") Integer userId);

	// lay ve theo id
	@Query(value = "SELECT " + "o.order_id, " + "o.order_code," + "o.order_date, " + "m.movie_name, "
			+ "m.movie_poster, " + "s.schedule_date, " + "s.schedule_start, " + "c.cinema_name, " + "r.room_name, "
			+ "GROUP_CONCAT(CONCAT(seat.seat_row, seat.seat_number) SEPARATOR ', ') AS seats " + ", o.total_price "
			+ "FROM orders o " + "JOIN order_details od ON o.order_id = od.order_id "
			+ "JOIN schedule s ON od.schedule_id = s.schedule_id " + "JOIN movies m ON s.movie_id = m.movie_id "
			+ "JOIN room r ON s.room_id = r.room_id " + "JOIN cinemas c ON r.cinema_id = c.cinema_id "
			+ "JOIN seats seat ON od.seat_id = seat.seat_id " + "WHERE o.order_id = :idOrder "
			+ "GROUP BY o.order_id, o.order_code, o.order_date, m.movie_name, m.movie_poster, s.schedule_date, s.schedule_start, c.cinema_name, r.room_name, o.total_price ORDER BY  o.order_id DESC", nativeQuery = true)
	List<Object[]> findOrdersById(@Param("idOrder") Integer idOrder);
	
	

}

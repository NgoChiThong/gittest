package com.project.booking.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.project.booking.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {

	@Query("SELECT SUM(o.total_price) FROM Order o WHERE o.order_date BETWEEN :startDate AND :endDate")
	Optional<BigDecimal> findTotalPriceByOrderDateBetween(LocalDateTime startDate, LocalDateTime endDate);

	 @Query("SELECT o FROM Order o WHERE DATE(o.order_date) = CURRENT_DATE")
	    List<Order> findOrdersForToday();
	
	

}
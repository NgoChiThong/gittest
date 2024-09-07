package com.project.booking.service;

import java.math.BigDecimal;
import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.project.booking.entity.Book;
import com.project.booking.entity.Order;
import com.project.booking.entity.OrderDetail;
import com.project.booking.model.OrderDTO;
import com.project.booking.model.ResponseData;
import com.project.booking.repository.BookRepository;
import com.project.booking.repository.OrderDetailRepository;
import com.project.booking.repository.OrderRepository;
import com.project.booking.repository.UserRepository;
import com.project.booking.request.BookingRequest;

@Service
public class BookService {

	@Autowired
	BookRepository bookRepository;

	@Autowired
	UserRepository userRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Autowired
	private OrderDetailRepository orderDetailRepository;
	
	


//    public ResponseData<Book> bookTicket(Authentication authentication, BookRequest bookRequest){
//        Integer userId = userRepository.findIdByUsername(authentication.getName());
//        if(bookRequest == null){
//            return new ResponseData(HttpStatus.FOUND, "book ticket fail", null);
//        }else{
//            return new ResponseData(HttpStatus.OK, "success", bookRepository.bookTicket(userId, bookRequest.getScheduleId(), bookRequest.getSeatId(), bookRequest.getPrice(), bookRequest.getSeatStatus()));
//        }
//    }

	@Transactional
	public Order bookTicket(Authentication authentication, BookingRequest bookRequest) {
		int userId = userRepository.findIdByUsername(authentication.getName());

		double totalPrice = bookRequest.getPrice();

		Order order = new Order();
		order.setUser_id(userId);
		order.setOrder_date(LocalDateTime.now());
		order.setTotal_price(totalPrice);
		order.setMovie_id(bookRequest.getMovieId());
		order.setSchedule_id(bookRequest.getScheduleId());
		order.setStatus(bookRequest.getStatus());
		order.setOrder_code(bookRequest.getOrder_code());
		order = orderRepository.save(order);

		Order finalOrder = order; // Dùng holder object để lưu trữ giá trị của order
		List<OrderDetail> orderDetails = bookRequest.getSeatIds().stream().map(seatId -> {
			OrderDetail detail = new OrderDetail();
			detail.setOrder(finalOrder);
			detail.setSchedule_id(bookRequest.getScheduleId());
			detail.setSeat_id(seatId);
			detail.setPrice(bookRequest.getPrice());
			detail.setSeat_status(bookRequest.getSeatStatus());
			return detail;
		}).collect(Collectors.toList());

		orderDetailRepository.saveAll(orderDetails);

		// Update the status and add points to the user
		updateStatus(authentication, order.getUser_id(), totalPrice);

		return order;
	}

	public ResponseData<Integer> updateStatus(Authentication authentication, Integer book_id, double total) {
		Integer userId = userRepository.findIdByUsername(authentication.getName());
		Double point = userRepository.getPoint(userId);
		userRepository.addPoint(point + (total * 0.0002), userId);
		return new ResponseData(HttpStatus.OK, "book running", bookRepository.updateStatus(userId, book_id));
	}

	// lay danh sach ve
	public List<OrderDTO> getOrdersByUserId(Authentication authentication) {
		Integer userId = userRepository.findIdByUsername(authentication.getName());
		List<Object[]> results = bookRepository.findOrdersByUserId(userId);
		List<OrderDTO> orders = new ArrayList<>();

		for (Object[] result : results) {
			Integer orderId = (Integer) result[0];
			String order_code = (String) result[1];
			Timestamp order_date = (Timestamp) result[2];
			String movieName = (String) result[3];
			String movie_poster = (String) result[4];
			Date scheduleDate = (Date) result[5];
			Time scheduleStart = (Time) result[6];
			String cinemaName = (String) result[7];
			String roomName = (String) result[8];
			String seats = (String) result[9];
			double total_price = (Double) result[10];
			OrderDTO orderDTO = new OrderDTO(orderId, order_code, order_date, movieName, movie_poster, scheduleDate,
					scheduleStart, cinemaName, roomName, seats, total_price);
			orders.add(orderDTO);
		}

		return orders;
	}

	public List<Order> getAllOrders() {
		return orderRepository.findAll();
	}

	// lay thong tin ve
	public OrderDTO getOrdersById(Integer id) {
		List<Object[]> results = bookRepository.findOrdersById(id);
		OrderDTO orderDTO = new OrderDTO();

		for (Object[] result : results) {
			Integer orderId = (Integer) result[0];
			String order_code = (String) result[1];
			Timestamp order_date = (Timestamp) result[2];
			String movieName = (String) result[3];
			String movie_poster = (String) result[4];
			Date scheduleDate = (Date) result[5];
			Time scheduleStart = (Time) result[6];
			String cinemaName = (String) result[7];
			String roomName = (String) result[8];
			String seats = (String) result[9];
			double total_price = (Double) result[10];
			orderDTO = new OrderDTO(orderId, order_code, order_date, movieName, movie_poster, scheduleDate,
					scheduleStart, cinemaName, roomName, seats, total_price);
			
		}

		return orderDTO;
	}

	public List<BigDecimal> getMonthlyRevenue(int year) {
        return IntStream.rangeClosed(1, 12)
                .mapToObj(month -> {
                    LocalDateTime startDate = YearMonth.of(year, month).atDay(1).atStartOfDay();
                    LocalDateTime endDate = YearMonth.of(year, month).atEndOfMonth().atTime(23, 59, 59);
                    return orderRepository.findTotalPriceByOrderDateBetween(startDate, endDate)
                            .orElse(BigDecimal.ZERO);
                })
                .collect(Collectors.toList());
    }

	 public List<Order> getOrdersForToday() {
	        return orderRepository.findOrdersForToday();
	    }

}

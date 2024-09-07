package com.project.booking.controllerAdmin;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.booking.entity.Order;
import com.project.booking.model.OrderDTO;
import com.project.booking.service.BookService;

@RestController
@RequestMapping("/admin/orders")
public class OrderControllerAd {

	@Autowired
	BookService bookService;

//	@GetMapping("")
//	public List<Order> getAllOrders() {
//		return bookService.getAllOrders();
//	}

	@GetMapping("")
	public ResponseEntity<List<Order>> getAllOrders() {
		List<Order> orders = bookService.getAllOrders();
		if (orders.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(orders, HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<OrderDTO> getOrderById(@PathVariable Integer id){
		OrderDTO orderDTO = bookService.getOrdersById(id);
		return new ResponseEntity<>(orderDTO, HttpStatus.OK);
		
	}
	
	 @GetMapping("/monthly-revenue/{year}")
	    public Map<String, Object> getMonthlyRevenue(@PathVariable Integer year) {
	        List<BigDecimal> revenues = bookService.getMonthlyRevenue(year);
	        Map<String, Object> response = new HashMap<>();
	        response.put("datasets", List.of(Map.of(
	                "data", revenues
	        )));
	        return response;
	    }
	
	 @GetMapping("/today")
	    public List<Order> getTodayOrders() {
	        return bookService.getOrdersForToday();
	    }
	
}

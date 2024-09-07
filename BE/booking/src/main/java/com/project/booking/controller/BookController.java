package com.project.booking.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.project.booking.model.OrderDTO;
import com.project.booking.request.BookingRequest;
import com.project.booking.service.BookService;

import java.util.HashMap;
import java.util.List;

@RestController
@Api(description = "Api booking")
@RequestMapping("/book_gi_ma_book_haha")
public class BookController {
	@Autowired
	BookService bookService;

//    @ApiOperation(value = "Book vé xem phim")
//    @RequestMapping(method = RequestMethod.POST, value = "/create")
//    public ResponseEntity<?> bookTick(Authentication authentication,  @RequestBody BookRequest bookRequest){
//        return ResponseEntity.ok(bookService.bookTicket(authentication, bookRequest));
//    }
	@ApiOperation(value = "Thay đổi trang thái ghế theo vé")
	@PostMapping(value = "/confirm")
	public ResponseEntity<?> confirmTick(Authentication authentication, @RequestBody HashMap<String, Integer> request) {
		return ResponseEntity.ok(bookService.updateStatus(authentication, request.get("bookId"), 0));
	}

	@ApiOperation(value = "Book vé xem phim")
	@RequestMapping(method = RequestMethod.POST, value = "/create")
	public ResponseEntity<?> bookTicket(Authentication authentication, @RequestBody BookingRequest bookRequest) {
		return ResponseEntity.ok(bookService.bookTicket(authentication, bookRequest));
	}

	@GetMapping("/user")
	public ResponseEntity<List<OrderDTO>> getOrdersByUserId(Authentication authentication) {
		List<OrderDTO> orders = bookService.getOrdersByUserId(authentication);
		return ResponseEntity.ok(orders);
	}

}

package com.project.booking.model;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;

public class OrderDTO {
	private Integer orderId;
	private String order_code;
	private Timestamp order_date;
	private String movieName;
	private String moviePoster;
	private Date scheduleDate;
	private Time scheduleStart;
	private String cinemaName;
	private String roomName;
	private String seats;
	private double total_price;

	public OrderDTO(Integer orderId, String order_code, Timestamp order_date, String movieName, String moviePoster,
			Date scheduleDate, Time scheduleStart, String cinemaName, String roomName, String seats,
			double total_price) {
		super();
		this.orderId = orderId;
		this.order_code = order_code;
		this.order_date = order_date;
		this.movieName = movieName;
		this.moviePoster = moviePoster;
		this.scheduleDate = scheduleDate;
		this.scheduleStart = scheduleStart;
		this.cinemaName = cinemaName;
		this.roomName = roomName;
		this.seats = seats;
		this.total_price = total_price;
	}

	public OrderDTO() {
		// TODO Auto-generated constructor stub
	}

	public Integer getOrderId() {
		return orderId;
	}

	public void setOrderId(Integer orderId) {
		this.orderId = orderId;
	}

	public String getOrder_code() {
		return order_code;
	}

	public void setOrder_code(String order_code) {
		this.order_code = order_code;
	}

	public Timestamp getOrder_date() {
		return order_date;
	}

	public void setOrder_date(Timestamp order_date) {
		this.order_date = order_date;
	}

	public String getMovieName() {
		return movieName;
	}

	public void setMovieName(String movieName) {
		this.movieName = movieName;
	}

	public String getMoviePoster() {
		return moviePoster;
	}

	public void setMoviePoster(String moviePoster) {
		this.moviePoster = moviePoster;
	}

	public Date getScheduleDate() {
		return scheduleDate;
	}

	public void setScheduleDate(Date scheduleDate) {
		this.scheduleDate = scheduleDate;
	}

	public Time getScheduleStart() {
		return scheduleStart;
	}

	public void setScheduleStart(Time scheduleStart) {
		this.scheduleStart = scheduleStart;
	}

	public String getCinemaName() {
		return cinemaName;
	}

	public void setCinemaName(String cinemaName) {
		this.cinemaName = cinemaName;
	}

	public String getRoomName() {
		return roomName;
	}

	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}

	public String getSeats() {
		return seats;
	}

	public void setSeats(String seats) {
		this.seats = seats;
	}

	public double getTotal_price() {
		return total_price;
	}

	public void setTotal_price(double total_price) {
		this.total_price = total_price;
	}

}
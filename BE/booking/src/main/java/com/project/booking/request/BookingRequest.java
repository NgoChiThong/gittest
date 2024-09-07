package com.project.booking.request;

import java.util.List;

import javax.validation.constraints.NotNull;

public class BookingRequest {
    @NotNull(message = "Thiếu id suất chiếu")
    private int scheduleId;

    @NotNull(message = "Thiếu id ghế")
    private List<Integer> seatIds;

    @NotNull(message = "Thiếu giá")
    private Double price;

    @NotNull(message = "Thiếu trạng thái ghế")
    private int seatStatus;

    @NotNull(message = "Thiếu id phim")
    private int movieId;

    @NotNull(message = "Thiếu trạng thái đơn hàng")
    private int status;
    
    @NotNull(message = "Thiếu mã đặt vé")
    private String order_code;

    // Getters and setters

    public int getScheduleId() {
        return scheduleId;
    }

    public void setScheduleId(int scheduleId) {
        this.scheduleId = scheduleId;
    }

    public List<Integer> getSeatIds() {
        return seatIds;
    }

    public void setSeatIds(List<Integer> seatIds) {
        this.seatIds = seatIds;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public int getSeatStatus() {
        return seatStatus;
    }

    public void setSeatStatus(int seatStatus) {
        this.seatStatus = seatStatus;
    }

    public int getMovieId() {
        return movieId;
    }

    public void setMovieId(int movieId) {
        this.movieId = movieId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

	public String getOrder_code() {
		return order_code;
	}

	public void setOrder_code(String order_code) {
		this.order_code = order_code;
	}
    
}
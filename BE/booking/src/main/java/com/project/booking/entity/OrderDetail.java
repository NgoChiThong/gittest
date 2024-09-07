package com.project.booking.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "order_details")
public class OrderDetail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int detail_id;

	@ManyToOne
	@JoinColumn(name = "order_id", nullable = false)
	@JsonIgnore
	private Order order;

	@Column(nullable = false)
	private int schedule_id;

	@Column(nullable = false)
	private int seat_id;

	@Column(nullable = false)
	private Double price;

	@Column(nullable = false)
	private int seat_status;

	

	public OrderDetail(int detail_id, Order order, int schedule_id, int seat_id, Double price, int seat_status) {
		super();
		this.detail_id = detail_id;
		this.order = order;
		this.schedule_id = schedule_id;
		this.seat_id = seat_id;
		this.price = price;
		this.seat_status = seat_status;
	}

	public OrderDetail() {
		// TODO Auto-generated constructor stub
	}

	public int getDetail_id() {
		return detail_id;
	}

	public void setDetail_id(int detail_id) {
		this.detail_id = detail_id;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public int getSchedule_id() {
		return schedule_id;
	}

	public void setSchedule_id(int schedule_id) {
		this.schedule_id = schedule_id;
	}

	public int getSeat_id() {
		return seat_id;
	}

	public void setSeat_id(int seat_id) {
		this.seat_id = seat_id;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public int getSeat_status() {
		return seat_status;
	}

	public void setSeat_status(int seat_status) {
		this.seat_status = seat_status;
	}


}
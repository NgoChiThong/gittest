package com.project.booking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project.booking.entity.OrderDetail;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer> {
}
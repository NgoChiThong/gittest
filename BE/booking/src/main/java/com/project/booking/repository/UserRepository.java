package com.project.booking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.project.booking.entity.Movie;
import com.project.booking.entity.User;
import com.project.booking.model.UserNameProfile;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
//
//    // Custom query to get all users with their profiles
//    @Query("SELECT new com.project.booking.model.UserNameProfile(u.userId, u.username, u.userAvatar, u.userFullname, " +
//           "u.userBirthday, u.userGender, u.userEmail, u.userCity, u.userPhone, u.userPoint) " +
//           "FROM User u")
//    List<UserNameProfile> getAllUserProfiles();
    
	// Lấy thông tin user bằng id
	@Query(name = "User.getUserNameProfile", nativeQuery = true)
	UserNameProfile getUserById(Integer userId);

	// Thêm user vào dữ liệu
	@Transactional
	@Modifying
	@Query(value = "INSERT INTO users (username, password, user_avatar, user_fullname, user_birthday, user_gender, user_email, user_city, user_phone, user_point) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, 0)", nativeQuery = true)
	Integer registerUser(String username, String password, String userAvatar, String userFullname, String userBirthday,
			Integer userGender, String userEmail, String userCity, String userPhone);

	// Cập nhật thông tin user
	@Transactional
	@Modifying
	@Query(value = "UPDATE users SET username = ?1, user_fullname = ?2, user_birthday = ?3, user_gender = ?4, user_email = ?5, user_city = ?6, user_phone = ?7 WHERE user_id = ?8", nativeQuery = true)
	Integer updateUser(String username, String userFullname, String userBirthday, Integer userGender, String userEmail,
			String userCity, String userPhone, Integer userId);

	// Tìm user theo username
	User findByUsername(String username);

	// Tìm user theo email
	@Query(nativeQuery = true, value = "SELECT * FROM users WHERE user_email = ?1")
	User findByEmail(String email);

	// Tìm user theo số điện thoại
	@Query(nativeQuery = true, value = "SELECT * FROM users WHERE user_phone = ?1")
	User findByPhone(String phone);

	// Tìm ID của user theo username
	@Query(nativeQuery = true, value = "SELECT user_id FROM users WHERE username = ?1")
	Integer findIdByUsername(String username);

	// Lấy điểm của user theo user_id
	@Query(value = "SELECT user_point FROM users WHERE user_id = ?1", nativeQuery = true)
	Double getPoint(Integer userId);

	// Cập nhật điểm của user
	@Transactional
	@Modifying
	@Query(value = "UPDATE users SET user_point = ?1 WHERE user_id = ?2", nativeQuery = true)
	Integer addPoint(Double point, Integer userId);
	
	
	 User findByUserId(int userId);
}

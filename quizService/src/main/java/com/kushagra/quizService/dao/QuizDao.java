package com.kushagra.quizService.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kushagra.quizService.models.Quiz;

public interface QuizDao extends JpaRepository<Quiz, Integer> {
	
	

}

package com.kushagra.questionService.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.kushagra.questionService.model.Question;

public interface QuestionDao extends JpaRepository<Question, Integer> {
	
	List<Question> findByCategory(String category);

	
	@Query(value = "SELECT q.id FROM question q WHERE q.category = :category ORDER BY RAND() LIMIT :numQ", nativeQuery = true)
	List<Integer> getRandomQuestionsByCategory(String category, int numQ);

}

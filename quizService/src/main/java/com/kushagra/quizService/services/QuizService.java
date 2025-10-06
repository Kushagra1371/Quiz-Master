package com.kushagra.quizService.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.kushagra.quizService.dao.QuizDao;
import com.kushagra.quizService.feign.QuizInterface;
import com.kushagra.quizService.models.Question;
import com.kushagra.quizService.models.QuestionWrapper;
import com.kushagra.quizService.models.Quiz;
import com.kushagra.quizService.models.Response;


@Service
public class QuizService {
	
	
	@Autowired
	QuizDao quizDao;
	
	@Autowired
	QuizInterface quizInterface;

	public ResponseEntity<String> createQuiz(String category, int numQ, String title) {
		
		
		List<Integer>questionIds=quizInterface.getQuestionsForQuiz(category, numQ).getBody();
		
		Quiz quiz=new Quiz();
		
		quiz.setTitle(title);
		quiz.setQuestionIds(questionIds);
		
		quizDao.save(quiz);
		
		return new ResponseEntity<>("quizCreated",HttpStatus.OK);
	}
	
	
	public ResponseEntity<List<QuestionWrapper>> getQuiz(Integer id)
	{
		Quiz quiz=quizDao.findById(id).get();
		
		List<Integer>questionIds=quiz.getQuestionIds();
		ResponseEntity<List<QuestionWrapper>> questions=quizInterface.getQuestionsFromId(questionIds);
		
		return questions;
		
		
		
		
		
		
		
	}


	public ResponseEntity<Integer> calculateResult(List<Response> responses) {
		
	ResponseEntity<Integer> score=quizInterface.getScore(responses);
		
	return score;
	}


	
	
	
	

}

package com.kushagra.quizService.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.kushagra.quizService.dao.QuizDao;
import com.kushagra.quizService.models.QuestionWrapper;
import com.kushagra.quizService.models.Quiz;
import com.kushagra.quizService.models.QuizDto;
import com.kushagra.quizService.models.Response;
import com.kushagra.quizService.services.QuizService;

@RestController
@RequestMapping("/quiz")
public class QuizController {
	
	QuizService quizService;
	QuizDao quizDao;
	
	public QuizController(QuizService quizService, QuizDao quizDao)
	{this.quizService=quizService;
	this.quizDao=quizDao;}
	
	@PostMapping("/create")
	public ResponseEntity<String> createQuiz(@RequestBody QuizDto quizDto)
	{
		return quizService.createQuiz(quizDto.getCategoryName(),quizDto.getNumQuestions(),quizDto.getTitle());
	}

	
	@GetMapping("/quizQ/{id}")
	public ResponseEntity<List<QuestionWrapper>> getQuizQuestions(@PathVariable Integer id)
	{ return quizService.getQuiz(id);}
	
	
	@PostMapping("submit")
	public ResponseEntity<Integer> submitQuiz( @RequestBody List<Response> responses)
	{return quizService.calculateResult(responses);}
	
	
	@GetMapping("/all")
	public ResponseEntity<List<Quiz>> getAllQuizzes() {
	    List<Quiz> quizzes = quizDao.findAll();
	    return new ResponseEntity<>(quizzes, HttpStatus.OK);
	}

	
}

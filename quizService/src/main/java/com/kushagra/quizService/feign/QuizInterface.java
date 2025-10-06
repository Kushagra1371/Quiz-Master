package com.kushagra.quizService.feign;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.kushagra.quizService.models.Question;
import com.kushagra.quizService.models.QuestionWrapper;
import com.kushagra.quizService.models.Response;


@FeignClient("QUESTIONSERVICE")
public interface QuizInterface {
	
	
	
	  @GetMapping("/questions/generate")
	    public ResponseEntity<List<Integer>> getQuestionsForQuiz(@RequestParam String category, @RequestParam Integer numQ);
	   
	    
	    
	    
	    @PostMapping("/questions/getQuestions")
	    public ResponseEntity<List<QuestionWrapper>> getQuestionsFromId(@RequestBody List<Integer>questionIds);
	   
	    
	    @PostMapping("/questions/score")
		public ResponseEntity<Integer> getScore(@RequestBody List<Response> responses);
		

	
	
}

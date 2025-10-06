package com.kushagra.questionService.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.kushagra.questionService.model.Question;
import com.kushagra.questionService.model.QuestionWrapper;
import com.kushagra.questionService.model.Response;

import com.kushagra.questionService.service.QuestionService;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    
    private final QuestionService questionService;

    public QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Question>> getQuestions() {
        return ResponseEntity.ok(questionService.getAllQuestions());
    }

    @GetMapping("/category/{category}")
    public ResponseEntity<List<Question>> getQuestionsByCategory(@PathVariable String category) {
        return ResponseEntity.ok(questionService.getByCategory(category));
    }

    @PostMapping("add")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        return ResponseEntity.status(HttpStatus.CREATED).body(questionService.addQuestion(question));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Integer id, @RequestBody Question updatedQuestion) {
        return ResponseEntity.ok(questionService.updateQuestion(id, updatedQuestion));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Integer id) {
        questionService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
    
    
    @GetMapping("/generate")
    public ResponseEntity<List<Integer>> getQuestionsForQuiz(@RequestParam String category, @RequestParam Integer numQ)
    {
    	return questionService.getQuestionsForQuiz(category,numQ);
    }
    
    
    
    @PostMapping("/getQuestions")
    public ResponseEntity<List<QuestionWrapper>> getQuestionsFromId(@RequestBody List<Integer>questionIds)
    {
    	return questionService.getQuestionsFromId(questionIds);
    }
    
    
    @PostMapping("/score")
	public ResponseEntity<Integer> getScore(@RequestBody List<Response> responses)
	{return questionService.getScore(responses);}
}

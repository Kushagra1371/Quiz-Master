package com.kushagra.questionService.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.kushagra.questionService.model.QuestionWrapper;
import com.kushagra.questionService.model.Response;
import com.kushagra.questionService.dao.QuestionDao;
import com.kushagra.questionService.model.Question;



@Service
public class QuestionService {
    
    private final QuestionDao questionDao;

    public QuestionService(QuestionDao questionDao) {
        this.questionDao = questionDao;
    }

    public List<Question> getAllQuestions() {
        return questionDao.findAll();
    }

    public List<Question> getByCategory(String category) {
        return questionDao.findByCategory(category);
    }

    public Question addQuestion(Question question) {
        return questionDao.save(question);
    }

   
    public Question updateQuestion(Integer id, Question updatedQuestion) {
        return questionDao.findById(id)
                .map(existing -> {
                    existing.setQuestion(updatedQuestion.getQuestion());
                    existing.setCategory(updatedQuestion.getCategory());
                    existing.setDifficultylevel(updatedQuestion.getDifficultylevel());
                    existing.setOption1(updatedQuestion.getOption1());
                    existing.setOption2(updatedQuestion.getOption2());
                    existing.setOption3(updatedQuestion.getOption3());
                    existing.setOption4(updatedQuestion.getOption4());
                    existing.setRightOption(updatedQuestion.getRightOption());
                    return questionDao.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Question not found with id " + id));
    }

    public void deleteQuestion(Integer id) {
        if (!questionDao.existsById(id)) {
            throw new RuntimeException("Question not found with id " + id);
        }
        questionDao.deleteById(id);
    }

	public ResponseEntity<List<Integer>> getQuestionsForQuiz(String category, Integer numQ) {
		
		List<Integer>questions=questionDao.getRandomQuestionsByCategory(category, numQ);
		
		return new ResponseEntity<>(questions, HttpStatus.OK);
	}

	public ResponseEntity<List<QuestionWrapper>> getQuestionsFromId(List<Integer> questionIds) {
		
		List<QuestionWrapper> wrapper=new ArrayList<>();
		List<Question> questions=new ArrayList<>();
		
		for(Integer id: questionIds)
		{questions.add(questionDao.findById(id).get()); }
		
		
		for(Question q:questions)
		{QuestionWrapper qq=new QuestionWrapper();
		
		
		qq.setId(q.getId());
		qq.setOption1(q.getOption1());
		qq.setOption2(q.getOption2());
		qq.setOption3(q.getOption3());
		qq.setOption4(q.getOption4());
		qq.setQuestion(q.getQuestion());
		
		wrapper.add(qq);
		
		}
return new ResponseEntity<>(wrapper, HttpStatus.OK);
	}



	public ResponseEntity<Integer> getScore(List<Response> responses) {
			
		int right=0;
		
		
		
		for(Response r : responses)
		{
			Question question = questionDao.findById(r.getId())
				    .orElseThrow(() -> new RuntimeException("Question not found with id " + r.getId()));

			
			if(r.getResponse().equals(question.getRightOption()) )
				right++;
			
			
		}
		
		
		return new ResponseEntity<>(right,HttpStatus.OK);
		
	}
	
	
	
	
	
	
}

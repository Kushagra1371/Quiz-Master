package com.kushagra.quizService.models;

public class QuizDto {
	
	private String categoryName;
	private Integer numQuestions;
	private String Title;
	public String getCategoryName() {
		return categoryName;
	}
	
	
	
	public QuizDto()
	{}
	
	
	
	
	
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public Integer getNumQuestions() {
		return numQuestions;
	}
	public void setNumQuestions(Integer numQuestions) {
		this.numQuestions = numQuestions;
	}
	public String getTitle() {
		return Title;
	}
	public void setTitle(String title) {
		Title = title;
	}

}

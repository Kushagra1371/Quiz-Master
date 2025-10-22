package com.kushagra.springsec.controller;

import java.util.*;

import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.kushagra.springsec.model.Student;

import jakarta.servlet.http.HttpServletRequest;


@RestController
public class StudentController {
	
	
	 public List<Student>list;
	 
	 StudentController()
	 {list=new ArrayList<>();}
	 
	 
	 
	 @GetMapping("/students")
	 public List<Student> getStudents()
	 {
		 return list;
		 }
	 
	 
	 @GetMapping("/csrf-token")
	    public CsrfToken getCsrfToken(HttpServletRequest request) {
	        return (CsrfToken) request.getAttribute(CsrfToken.class.getName());
	    }
	 
	 
	 
	 @PostMapping("/students/add")
	 public Student add(@RequestBody Student student)
	 {
		 list.add(new Student(student.getId(),student.getName(),student.getMarks()));
		 return student;
	 }
	 
	 @PostMapping("/students/update")
	 public Student update(@RequestBody Student student)
	 {
		for(int i=0;i<list.size();i++)
			if(list.get(i).getId()==student.getId())
			{
				list.get(i).setId(student.getId());
			list.get(i).setMarks(student.getMarks());
			list.get(i).setName(student.getName());
			break;
			}
			
			return student;
	 }
	 
	 
	 
	 
	 

}

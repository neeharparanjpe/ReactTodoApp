var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var ToDoApp = require('ToDoApp');

describe('ToDoApp', () =>{
	it('should exist',()=>{
		expect(ToDoApp).toExist();
	});
	
	it('should add todo to the todos state on handleAddTodo',() => {
		var todoText = 'TestText';
		var todoApp = TestUtils.renderIntoDocument(<ToDoApp/>);
		
		todoApp.setState({
			todos:[]
		});
		todoApp.handleAddTodo(todoText);
		
		expect(todoApp.state.todos[0].text).toBe(todoText);
		
		//expect createdAt to be a number
		expect(todoApp.state.todos[0].createdAt).toBeA('number');
	});
	
	it('should toggle updated value when handleToggle is called',() => {
		var todoData ={
			id:11,
			text: 'TestText',
			completed:false,
			createdAt: 0,
			completedAt: undefined
		}
		var todoApp = TestUtils.renderIntoDocument(<ToDoApp/>);
		todoApp.setState({todos:[todoData]});
		
		//check that todos first item has completed value of false
		expect(todoApp.state.todos[0].completed).toBe(false);
		
		//call handleToggle with 11
		todoApp.handleToggle(11);
		
		//verify that value changed
		expect(todoApp.state.todos[0].completed).toBe(true);
		
		//expect completedAt to be a number
		expect(todoApp.state.todos[0].completedAt).toBeA('number');
	});
	
	//test that when toggled from true to false, completedAt gets removed
	it('should toggle todo from completed to incompleted',() => {
		var todoData ={
			id:11,
			text: 'TestText',
			completed:true,
			createdAt: 0,
			completedAt: 123
		}
		var todoApp = TestUtils.renderIntoDocument(<ToDoApp/>);
		todoApp.setState({todos:[todoData]});
		
		//check that todos first item has completed value of false
		expect(todoApp.state.todos[0].completed).toBe(true);
		
		//call handleToggle with 11
		todoApp.handleToggle(11);
		
		//verify that value changed
		expect(todoApp.state.todos[0].completed).toBe(false);
		
		//expect completedAt to be a number
		expect(todoApp.state.todos[0].completedAt).toNotExist();
	});
});
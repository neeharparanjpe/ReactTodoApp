var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jQuery');
var TestUtils = require('react-addons-test-utils');

var AddToDo = require('AddToDo');

describe('AddToDo', () =>{
	it('should exist',()=>{
		expect(AddToDo).toExist();
	});
	
	it('should call onAddToDo prop with valid data', () =>{
		var todoText = 'Check Mail';
		var spy = expect.createSpy();
		var addTodo = TestUtils.renderIntoDocument(<AddToDo onAddTodo={spy}/>);
		var $el = $(ReactDOM.findDOMNode(addTodo));
		
		addTodo.refs.todoText.value = todoText;
		TestUtils.Simulate.submit($el.find('form')[0]);
		
		expect(spy).toHaveBeenCalledWith(todoText);
	});
	
	it('should not call onAddToDo prop with invalid data', () =>{
		var todoText = '';
		var spy = expect.createSpy();
		var addTodo = TestUtils.renderIntoDocument(<AddToDo onAddTodo={spy}/>);
		var $el = $(ReactDOM.findDOMNode(addTodo));
		
		addTodo.refs.todoText.value = todoText;
		TestUtils.Simulate.submit($el.find('form')[0]);
		
		expect(spy).toNotHaveBeenCalled(todoText);
	});
});
var expect = require('expect');

var ToDoAPI = require('ToDoAPI');

describe('ToDoAPI',() => {
	beforeEach(() =>{
		localStorage.removeItem('todos');
	});
	
	it('should exist', () => {
		expect(ToDoAPI).toExist();
	});
	
	describe('setTodos', () => {
		it('should set valid todos array',() =>{
			var todos = [{
				id:23,
				text:'test',
				completed:false
			}];
			ToDoAPI.setTodos(todos);
			
			var actualTodos = JSON.parse(localStorage.getItem('todos'));
			
			expect(actualTodos).toEqual(todos);
		});
		
		it('should not set invalid todos array',() =>{
			var badTodos = {a: 'b'};
			ToDoAPI.setTodos(badTodos);
			
			expect(localStorage.getItem('todos')).toBe(null);
		});
	});
	
	describe('getTodos', () => {
		it('should return empty array for bad localStorage data',() =>{
			var actualTodos = ToDoAPI.getTodos();
			expect(actualTodos).toEqual([]);
		});
		it('should return todos if valid array in localStorage',() =>{
			var todos = [{
				id:23,
				text:'test',
				completed:false
			}];
			localStorage.setItem('todos',JSON.stringify(todos));
			var actualTodos = ToDoAPI.getTodos();
			expect(actualTodos).toEqual(todos);			
		});
	});
	
	describe('filterTodos',() => {
		var todos = [{
			id:1,
			text:'some text',
			completed: true
		},
		{
			id:2,
			text:'Other text',
			completed: false
		},
		{
			id:3,
			text:'some other text',
			completed: true
		}];
		
		it('should return all items if showCompleted is true',() => {
			var filteredTodos = ToDoAPI.filterTodos(todos, true, '');
			expect(filteredTodos.length).toBe(3);
		});
		
		it('should return incomplete items if showCompleted is false',() => {
			var filteredTodos = ToDoAPI.filterTodos(todos, false, '');
			expect(filteredTodos.length).toBe(1);
		});
		
		it('should sort by completed status', () => {
			var filteredTodos = ToDoAPI.filterTodos(todos, true, '');
			expect(filteredTodos[0].completed).toBe(false);
		});
		
		it('should filter todos by search text',() => {
			var filteredTodos = ToDoAPI.filterTodos(todos, true, 'some');
			expect(filteredTodos.length).toBe(2);
		});
		
		it('should return all todos if searchText is empty',() => {
			var filteredTodos = ToDoAPI.filterTodos(todos, true, '');
			expect(filteredTodos.length).toBe(3);
		});
	});
});
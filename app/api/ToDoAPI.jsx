var $ = require('jquery');
module.exports = {
	setTodos: function(todos){
		if($.isArray(todos)){
			//store array if valid into localStorage
			localStorage.setItem('todos', JSON.stringify(todos));
			return todos;
		}
	},
	getTodos: function(){
		var stringTodos = localStorage.getItem('todos');
		
		var todos = [];
		try{
			todos = JSON.parse(stringTodos);
		}catch(e){
		
		}
		
		return $.isArray(todos) ? todos: [];
		
		//if($.isArray(todos)){
		//	return todos;
		//}
		//else{
		//	return [];
		//}
	},
	filterTodos: function(todos, showCompleted, searchText){
		var filteredTodos = todos;
		
		//filter by showCompleted
		filteredTodos = filteredTodos.filter((todo) => {
			return !todo.completed || showCompleted;
		});
		
		//filter by searchText
		filteredTodos = filteredTodos.filter((todo) =>{
			var text = todo.text.toLowerCase();
			return searchText.length === 0 || text.indexOf(searchText) > -1;
		});
		
		//sort todos with non completed first
		filteredTodos.sort((a,b) =>{
			//if -1 is returned, a should come before b.
			//if 1 is returned, b should come before a.
			//if 0 is returned, a and b are equal
			if(!a.completed && b.completed){
				return -1;
			}
			else if(a.completed && !b.completed){
				return 1;
			}
			else{
				return 0;
			}
		});
		
		return filteredTodos;
	}
};
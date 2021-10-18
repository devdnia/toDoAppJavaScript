import './styles.css';

import { Todo, TodoList } from './classes';
import { crearTodoHtml, contadorPendientes } from './js/componentes';

export const todoList = new TodoList();


// Insercción de TODO:
// const tarea = new Todo( 'Aprender JavaScript!' );
// todoList.nuevoTodo( tarea );
// crearTodoHtml( tarea );

todoList.todos.forEach( crearTodoHtml );
console.log( 'todos: ', todoList.todos );


contadorPendientes( todoList );

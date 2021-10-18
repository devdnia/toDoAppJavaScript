import { Todo } from "../classes";
import {  todoList } from "../index";


// Referenicas en el HTML
const divTodoList     = document.querySelector( '.todo-list' );
const txtInput        = document.querySelector( '.new-todo');
const btnBorrar       = document.querySelector( '.clear-completed');
const ulFiltros       = document.querySelector( '.filters' ); 
const anchorFiltros   = document.querySelectorAll( '.filtro' ); 
// const labelDes        = document.querySelector( '#toggle-all');

const spanContador    = document.querySelector( '.footer');



export const crearTodoHtml = ( todo ) => {

        const htmlTodo =
            `<li class= "${ ( todo.completado ) ? 'completed' : ''}"  data-id="${ todo.id }">
                <div class="view">
                <input class="toggle" type="checkbox" ${ ( todo.completado) ? 'checked' : ''}>
                <label>${ todo.tarea }</label>
                <button class="destroy"></button>
            </div>
        <input class="edit" value="Create a TodoMVC template">
    </li>`

    const div = document.createElement( 'div' );
    div.innerHTML = htmlTodo;
 
    // Insertamos el primer hijo del div
    divTodoList.append( div.firstElementChild );


    return div.firstElementChild;

}

export const contadorPendientes = ( todoList  )=>{

     let contador = 0 ;
     for (const todo of todoList.todos ) {
         if ( todo.completado === false ) {
             contador ++;
         }
     }



    return crearFooterHtml( contador );

}
const crearFooterHtml = ( contador )=>{


            const htmlFooter = `
            <span class="todo-count" id="contador"><strong>${ contador }</strong> pendiente(s)</span>
            `   
            const span = document.createElement( 'span' );
            span.innerHTML = htmlFooter;
         
            spanContador.append( span.firstElementChild );
    
            
            return span.firstElementChild ;

}



// Eventos
txtInput.addEventListener( 'keyup', ( event ) =>{

    // El 13 es el Enter
   if ( event.keyCode === 13 && txtInput.value.length > 0 ) {
       
    console.log( txtInput.value );
    const nuevoTodo = new Todo( txtInput.value );
    todoList.nuevoTodo( nuevoTodo );

    crearTodoHtml( nuevoTodo );
    txtInput.value = '';

   }

} );

divTodoList.addEventListener( 'click', ( event ) => {

    // Averiguar en que punto de <li> está pulsando
    // console.log('click');
    // console.log( event.target.localName );

    const nombreElemento = event.target.localName; // input, label, button
    const todoElemento   = event.target.parentElement.parentElement;
    const todoId         = todoElemento.getAttribute( 'data-id');


   if ( nombreElemento.includes('input')) { // click en el check
       
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle( 'completed' );

        // Actualización de pendiente(s)
        let span = spanContador.lastChild;
        spanContador.removeChild( span);
        span = contadorPendientes( todoList );


        
   
    } else if ( nombreElemento.includes( 'button' ) ){

        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );

    } 

});

btnBorrar.addEventListener( 'click', ()=>{

    todoList.eliminarCompletados();

    for ( let i = divTodoList.children.length -1; i>=0; i-- ) {

        const elemento = divTodoList.children[i];

        if ( elemento.classList.contains( 'completed' )) {
            divTodoList.removeChild( elemento );
        }
    }

});

ulFiltros.addEventListener( 'click', (event ) => {

    // console.log( event.target.text );

    const filtro = event.target.text;
    if ( !filtro ) { return; };

    anchorFiltros.forEach( elem => elem.classList.remove( 'selected' ) );
    event.target.classList.add( 'selected' )

    console.log( anchorFiltros );

    for (const elemento of divTodoList.children ) {
 
        elemento.classList.remove( 'hidden' );
        const completado = elemento.classList.contains( 'completed' );

        switch ( filtro ) {
            case 'Pendientes':
                if( completado ){ elemento.classList.add( 'hidden' )}

            break;

            case 'Completados':
                if( !completado ){ elemento.classList.add( 'hidden' )}
            break;
        
        }

    }



});


/*
labelDes.addEventListener('click', ( event )=>{

    console.log( event );
    borrarTodoHtml();

});
*/


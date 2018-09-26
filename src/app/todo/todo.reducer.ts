import * as fromTodo from './todo.actions';
import { Todo } from './model/todo.model';

const todo1 = new Todo('Comr');
const todo2 = new Todo('Dormir');
todo2.completado = true;

const estadoInicial: Todo[] = [todo1, todo2];

export function todoReducer(state = estadoInicial, action: fromTodo.Acciones): Todo[] {
    switch (action.type) {
        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            // https://desarrolloweb.com/articulos/operador-spread-es6.html
            return [...state, todo]; // [clonamos todos los elementos del arreglo, agregamos uno nuevo] y regresamos un nuevo arreglo


        case fromTodo.TOGGLE_TODO:
            return state.map(todoEdit => { // map es como si fuese un for-each
                /**
                 * dentro del operador map, todos los return son los elementos que van a conformar el nuevo estado (state),
                 * por eso siempre debe retornar sea que encuentre el TODO a modificar o no
                 * para que el operador map construya un nuevo arreglo
                 */
                if (todoEdit.id === action.id) { // busco el TODO con un id en particular
                    return { // retorno un nuevo objeto de tipo TODO
                        ...todoEdit, // el operador spread clona todas las propiedades
                        completado: !todoEdit.completado // pero cambia las que explicitamente se escriben
                    };
                } else {
                    return todoEdit; // retorna el mismo elemento porque no va a cambiar
                }
            });


        case fromTodo.EDITAR_TODO:
            return state.map(todoEdit => {

                if (todoEdit.id === action.id) {
                    return {
                        ...todoEdit,
                        texto: action.texto
                    };
                } else {
                    return todoEdit;
                }
            });


        case fromTodo.BORRAR_TODO:
            // va a regresar un arreglo con todos los elementos que el id sea distinto del id que se está enviando
            return state.filter(todoEdit => todoEdit.id !== action.id);


        case fromTodo.TOGGLE_ALL_TODO:
            return state.map(todoEdit => {
                return {
                    ...todoEdit,
                    completado: action.completado
                };
            });


        case fromTodo.BORRAR_COMPLETADOS_TODO:
            return state.filter(todoEdit => !todoEdit.completado);


        default:
            return state;
    }
}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducers';
import { filtrosValidos, SetFiltroAction } from '../../filter/filter.actions';
import { Todo } from '../model/todo.model';
import { BorrarTodoCompletadosAction } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  filtrosValido: filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: filtrosValidos;
  pendientes: number;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.contarPendientes(state.todos);
      this.filtroActual = state.filtro;
    });
  }

  cambiarFiltro(filtroSeleccinoado: filtrosValidos) {
    const accion = new SetFiltroAction(filtroSeleccinoado);
    this.store.dispatch(accion);
  }

  contarPendientes(todos: Todo[]) {
    this.pendientes = todos.filter(todo => !todo.completado).length;
  }

  borrarCompletados() {
    const accion = new BorrarTodoCompletadosAction();
    this.store.dispatch(accion);
  }

}

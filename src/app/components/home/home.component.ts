import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {TodoService} from "../../services/todo.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  data = {
    pendings :[],
    inProgress :[],
    done :[]
  };

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex)
    }
  }


  addTodo(todo:any) {
    const obj = {todo: todo.value};
    this.todoService.addTodo(obj).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }
}

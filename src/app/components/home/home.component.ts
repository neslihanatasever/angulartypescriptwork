import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {TodoService} from "../../services/todo.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  data: any = {};

  constructor(private todoService: TodoService, public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getAllTodo();
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    this.updatetodo();
  }


  addTodo(todo: any) {
    const obj = {todo: todo.value};
    this.todoService.addTodo(obj).subscribe(res => {
      this.openSnackBar('Todo başarıyla eklendi');
      this.getAllTodo();
      todo.value= '';
    }, err => {
      console.log(err);
    });
  }

  getAllTodo() {
    this.todoService.getAllTodo().subscribe(res => {
      Object.keys(res).forEach(key => {
        this.data[key] = res[key as keyof Object];
      });
    }, err => {
      console.log(err);
    });
  }

  updatetodo() {
    this.todoService.updatetodo(this.data).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  }

  removetodo(id: any) {
    if (confirm('Todo silinsin mi?')) {
      this.todoService.removetodo(id).subscribe(res => {
        console.log(res);
        this.getAllTodo();
      }, err => {
        console.log(err);
      });
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'tamam',{
      duration: 2000,
    });
  }
}

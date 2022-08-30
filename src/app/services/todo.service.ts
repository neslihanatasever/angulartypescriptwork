import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  apiUrl: string = 'https://api.limantech.com/todo';

  addTodo(obj: any){
    return this.http.post( this.apiUrl + '/todo', obj);
  }

  getAllTodo(){
    return this.http.get(this.apiUrl +'/todo');
  }

  updatetodo(obj: any){
    return this.http.put(this.apiUrl +'/todo', obj);
  }

  removetodo(id:number){
    return this.http.delete(this.apiUrl +'/todo/' + id);
  }
}

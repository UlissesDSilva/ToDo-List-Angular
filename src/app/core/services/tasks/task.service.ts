import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../base-service.service';
import { TaskViewModel } from '../../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends BaseService {
  constructor(private httpClient: HttpClient) {
    super(httpClient)
  }

  getTasks<T>(): Observable<T> {
    return this.get<T>('tasks');
  }

  postTask<T>(body: T): Observable<T> {
    return this.post<T>('tasks', body)
  }

  putTask<T>(id: number, body: T): Observable<T> {
    return this.put<T>(`tasks/${id}`, body);
  }

  remove<T>(index: number): Observable<T> {
    return this.delete<T>(`tasks/${index}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/services/tasks/task.service';
import { TaskViewModel } from 'src/app/core/models/task.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  public tasks: TaskViewModel[] = [];
  public showList: boolean = false;
  public task: TaskViewModel = {name: "", done: false};

  constructor(private taskService: TaskService) {
  }

  ngOnInit(): void {
    this.getAllTask();
  }

  getAllTask(): void {
    this.taskService.getTasks<TaskViewModel[]>().subscribe({
      next: (next) => this.tasks = next,
      complete: () => this.tasks.length > 0 ? this.showList = true : this.showList = false
    })
  }

  addTask(): void {
    const bodyRequest: TaskViewModel = {
      name: this.task.name,
      done: false
    }
    this.taskService.postTask<TaskViewModel>(bodyRequest).subscribe({
      next: next => {
        this.task = next
      },
      complete: () => {
        this.getAllTask();
        this.task.name = "";
      }
    })
  }

  removeTask(event: number | undefined): void {
    if(event) {
      this.taskService.remove(event).subscribe({
        next: () => {},
        complete: () => this.getAllTask()
      })
    } else {
      alert("Não foi encontrado o identificador da tarefa");
    }
  }

  markAsDone(name: string, id: number| undefined): void{
    const bodyRequest: TaskViewModel = {
      name: name,
      done: true
    }

    if (id) {
      this.taskService.putTask<TaskViewModel>(id, bodyRequest).subscribe({
        next: next => { },
        complete: () => { this.getAllTask() }
      })
    } else {
      alert("Não foi encontrado o identificador da tarefa")
    }
  }
}

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/app/envoriament/env";


export class BaseService {
  protected readonly baseUrl = environment.baseApiUrl;

  protected constructor(private http: HttpClient) {
    this.http = http;
  }

  get<T>(path: string){
    return this.http.get<T>(`${this.baseUrl}/${path}`);
  }

  post<T>(path: string, body: T): Observable<T> {
    // return this.http.post<T>(`${this.baseUrl}/${path}`, body, {headers: { 'Content-Type': 'application/json;' }});
    return this.http.post<T>(`${this.baseUrl}/${path}`, body);
  }

  put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${path}`, body);
  }

  delete<T>(path: string) {
    return this.http.delete<T>(`${this.baseUrl}/${path}`);
  }

}

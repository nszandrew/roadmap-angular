import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) {}



  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { email, password });
  }

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, { name, email, password });
  }

  refreshToken(refreshToken: string): Observable<any> {
    const params = new HttpParams().set('refreshToken', refreshToken);
    return this.http.post(`${this.baseUrl}/refresh-token`, {}, { params });
  }

  getUserInfo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/user/info`);
  }

  verifyToken(token: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/verify-token`, { token });
  }
}

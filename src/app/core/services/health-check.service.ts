import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HealthCheckService {
  private isBackendHealthy = new BehaviorSubject<boolean>(true);
  private checkInterval: any;

  constructor(private http: HttpClient) {
    this.startHealthCheck();
  }

  private startHealthCheck() {
    // Check immediately
    this.checkHealth();
    
    // Then check every 30 seconds
    this.checkInterval = setInterval(() => {
      this.checkHealth();
    }, 30000);
  }

  private checkHealth() {
    this.http.get('https://ecommerce-app-backend-j51c.onrender.com/health', { observe: 'response' })
      .subscribe({
        next: (response) => {
          this.isBackendHealthy.next(response.status === 200);
        },
        error: () => {
          this.isBackendHealthy.next(false);
        }
      });
  }

  getHealthStatus(): Observable<boolean> {
    return this.isBackendHealthy.asObservable();
  }

  ngOnDestroy() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }
} 
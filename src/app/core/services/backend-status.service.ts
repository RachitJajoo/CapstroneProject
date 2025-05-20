import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendStatusService {
  private isBackendAvailable = new BehaviorSubject<boolean>(true);
  private checkInterval: any;

  constructor(private http: HttpClient) {
    this.startCheckingBackend();
  }

  private startCheckingBackend() {
    // Check immediately
    this.checkBackendStatus();
    
    // Then check every 30 seconds
    this.checkInterval = setInterval(() => {
      this.checkBackendStatus();
    }, 30000);
  }

  private checkBackendStatus() {
    this.http.get(`${environment.apiUrl}/health-check`).subscribe({
      next: () => {
        this.isBackendAvailable.next(true);
      },
      error: () => {
        this.isBackendAvailable.next(false);
      }
    });
  }

  getBackendStatus(): Observable<boolean> {
    return this.isBackendAvailable.asObservable();
  }

  ngOnDestroy() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  }
} 
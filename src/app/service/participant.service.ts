import { participant } from './../Data/Participant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(private http: HttpClient) { }
  private apiUrl = 'your/api/endpoint';

  getParticipants(): Observable<participant[]> {
    return this.http.get<participant[]>(this.apiUrl);
  }

  getCustomersMini(): Promise<participant[]> {
    return new Promise<participant[]>((resolve, reject) => {
      // Simulating a response for demonstration purposes
      const participants: participant[] = [
        {
          id: 1,
          Name: "Omnia",
          school: 'Naser',
          gender: 'F',
          age: 12,
          progress: 'pending'
        },
        {
          id: 2,
          Name: "nada",
          school: 'aser',
          gender: 'F',
          age: 12,
          progress: 'completed'
        },
        {
          id: 3,
          Name: "abdo",
          school: 'freedom',
          gender: 'M',
          age: 12,
          progress: 'rejected'
        },
        {
          id: 4,
          Name: "Omnia",
          school: 'Naser',
          gender: 'F',
          age: 12,
          progress: 'pending'
        },
        {
          id: 5,
          Name: "soso",
          school: 'queen',
          gender: 'F',
          age: 14,
          progress: 'completed'
        },
        {
          id: 6,
          Name: "noura",
          school: 'wer',
          gender: 'F',
          age: 15,
          progress: 'rejected'
        },
      ];
      resolve(participants);
    });
  }

  addParticipant(newParticipant: participant): Promise<participant[]> {
    return new Promise<participant[]>((resolve, reject) => {
      this.getCustomersMini().then((participants) => {
        participants.push(newParticipant);
        resolve(participants);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  deleteParticipant(id: number): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.getCustomersMini().then((participants) => {
        const index = participants.findIndex(participant => participant.id === id);
        if (index !== -1) {
          participants.splice(index, 1);
          resolve();
        } else {
          reject(new Error('Participant not found'));
        }
      }).catch((error) => {
        reject(error);
      });
    });
  }
}

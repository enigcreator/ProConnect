import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';


@Injectable()
export class SocketService {
    private socket;
    sessionID: any;
    public initSocket(): void {


      
      this.socket = socketIo(SERVER_URL);
        
    }

    public send( message): void {
        this.socket.emit('insert', message);
    }

    public onMessage(): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on('message', (data: any) => observer.next(data));
        });
    }

    public request_all_chat(data): void {
        console.log(JSON.stringify(this.socket.handshake));
        this.socket.emit('chat', (data));
    }

  public receive_all_chat(): Observable<any> {
    return new Observable<any>(observer => {
        this.socket.on('chat', (data: any) => observer.next(data));
    });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }

    public updateSockets(data) {

      console.log(data);
      this.socket.emit("updateSockets", {"id": data});

    }



  public handshake_1(): Observable<any> {
    return new Observable<any>(observer => {
        this.socket.on('handshake_1', (data: any) => observer.next(data));
    });
    }
}
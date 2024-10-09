import { Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { Inject } from '@nestjs/common';

interface HelloService {
  sayHello(data: { name: string }): Observable<{ message: string }>;
  sayHi(data: { name: string }): Observable<{ message: string }>;
}

@Injectable()
export class AppService {
  private helloService: HelloService;

  constructor(@Inject('HELLO_PACKAGE') private client: ClientGrpc) {
    this.helloService = this.client.getService<HelloService>('HelloService');
  }

  getHello(name: string): Observable<{ message: string }> {
    return this.helloService.sayHello({ name });
  }
  getHi(name: string): Observable<{ message: string }> {
    return this.helloService.sayHi({ name });
  }
}

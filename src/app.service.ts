import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(process.env.DB_USERNAME)
    console.log('yeah')
    return 'hELLO';
  }
}

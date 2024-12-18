import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfig {
  static service: ConfigService;
  constructor(service: ConfigService) {
    AppConfig.service = service;
  }

  static get(key: string): any {
    return AppConfig.service.get(key);
  }
}

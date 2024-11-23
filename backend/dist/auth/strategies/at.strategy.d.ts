import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../types';
declare const AtStrategy_base: new (...args: any[]) => any;
export declare class AtStrategy extends AtStrategy_base {
    constructor(config: ConfigService);
    validate(payload: JwtPayload): JwtPayload;
}
export {};

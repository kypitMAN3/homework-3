import { SetMetadata } from '@nestjs/common';

export interface SelfDecoratorParams {
    userIDParam: string;
    allowAdmins?: boolean;
}

const SELF_KEY = 'selfParams'

export const Self = (params: SelfDecoratorParams | string) =>
    SetMetadata(
        SELF_KEY,
        typeof params == 'string' ? { userIDParam: params } : params,
    );
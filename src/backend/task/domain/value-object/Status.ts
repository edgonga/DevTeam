/*  eslint-disable */
export enum STATUS {
    PENDING = 0,
    ON_GOING = 1,
    DONE = 2
}

export class Status {

    private status: STATUS

    constructor(status: STATUS) {
        this.status = status
    }

    public setStatus(status: STATUS): void {
        this.status = status
    }
    
    getStatus(): STATUS {
        return this.status
    }
}
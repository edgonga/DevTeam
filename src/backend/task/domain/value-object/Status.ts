/*  eslint-disable */
export enum STATUS {
    PENDING = "PENDING",
    ON_GOING = "ON_GOING",
    DONE = "DONE"
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
/*  eslint-disable */

export class Status {

    private readonly status!: string | number

    constructor(status: number) {
        switch(status) {
            case 0:
                this.status = "pending"
                break
            
            case 1: 
                this.status = "on-going"
                break

            case 2:
                this.status = "done"
                break
        
        }
    }
}
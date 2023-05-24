class CreateTaskController {
    constructor (createTaskService: CreateTaskService){

    }

    run(/* request */) {
        this.createTaskService.create(/* request */)
    }
}
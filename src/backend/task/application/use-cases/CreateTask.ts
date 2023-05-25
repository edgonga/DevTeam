

export class CreateTask {
    private taskRepository: tASKREPOSITORY DE ODIMNI

    constructor( taskRepository) {
        this.taskRepository = taskRepository
    }
    execute(dataTask) {
       const newTask =  taskRepository.save(dataTask)
        // call TaskRepository and save it

    }
}
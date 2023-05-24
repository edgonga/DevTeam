class CreateTaskService {
    constructor (taskRepository: TaskRepository, dateGenerator: DateGenerator, idGenerator: IdGenerator) {

    }

    create(/* request */) {
        const id = idGenerator.generate()
        const date = dateGenerator.generate()
        const task = new Task(/* request.description */)
        taskRepository.save(task)
    }
}
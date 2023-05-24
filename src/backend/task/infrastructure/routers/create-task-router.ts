/* eslint-disable */

const taskRepository = new TaskRepository()
const createTaskService = new CreateTaskService(taskRepository, dateGenrator, idGenerator)
const createTaskController = new CreateTaskController(createTaskService)

// app.post('/task', createTaskController)
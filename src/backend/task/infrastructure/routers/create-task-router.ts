/* eslint-disable */
const DBSelected = 'mongo'
let taskRepository = ''

if (  DBSelected === 'json') taskRepository = new TaskJsonDBRepository()
if (  DBSelected === 'mysql') taskRepository = new TaskMySqlDBRepository()
if (  DBSelected === 'mongo') taskRepository = new TaskMongoDBRepository()

const createTask = new CreateTask(taskRepository, dateGenrator, idGenerator)
const createTaskController = new CreateTaskController(createTask)

// app.post('/task', createTaskController)
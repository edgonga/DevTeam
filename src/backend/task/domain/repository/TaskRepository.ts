export interface TaskRepository {
    save(): Promise<void>
    getAll(): Promise<Task[]>
}
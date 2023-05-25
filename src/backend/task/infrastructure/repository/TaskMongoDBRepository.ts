import { TaskRepository } from "../../domain/repository/TaskRepository";

export class TaskMongoDBRepository implements TaskRepository {
    save(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<Task[]> {
        throw new Error("Method not implemented.");
    }
    
}
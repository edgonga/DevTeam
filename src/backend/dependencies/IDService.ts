/* eslint-disable */

import { v4 as uuidv4 } from "uuid"

export class IDService {
    IDgenerator(): string {
        const id = uuidv4()

        return id
    }
}
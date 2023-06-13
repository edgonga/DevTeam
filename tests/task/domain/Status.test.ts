import { STATUS, Status } from "../../../src/backend/task/domain/value-object/Status";

test("tests that a new instance of Status is created with a valid STATUS value", () => {
	const status = new Status(STATUS.PENDING);
	expect(status).toBeInstanceOf(Status);
});

const request = require("supertest");
const app = require("../../server");

describe("Routes", () => {
	it('should handle GET request to "/"', async () => {
		const response = await request(app).get("/");
		expect(response.status).toBe(200);
	});

	it('should handle POST request to "/" with invalid data', async () => {
		const response = await request(app).post("/").send({});
		expect(response.status).toBe(400);
	});
});

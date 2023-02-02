import app from "index";
import supertest from "supertest";
import { Response } from "supertest";

const testServer = supertest(app);

describe("Get Tests", () => {
  it("get all fruits", async () => {
    const result = await testServer.get("/fruits");
    if (result.body.length === 0) {
      expect(result.body).toEqual([]);
    } else {
      expect(result.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            price: expect.any(Number),
          }),
        ])
      );
    }
  });

  it("get specific fruit", async () => {
    const result: Response = await testServer.get("/fruits/1");
    if (result.error) {
      expect(result.status).toBe(404);
    } else {
      expect(result.body).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          price: expect.any(Number),
        })
      );
    }
  });
});

describe("Post Tests", () => {
  it("post fruit", async () => {
    const newFruit = { name: "Fruta do Conde", price: 10 };
    const result = await testServer.post("/fruits").send(newFruit);
    if (result.error && result.text === "Conflict") {
      expect(result.status).toBe(409);
    }

    expect(result.status).toBe(201);
  });
});

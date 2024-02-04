import { addPost } from "./postController";
import makeApp from "../app.js"
import { jest } from "@jest/globals";


    
  

    const createUser = jest.fn()
    const app = makeApp({createUser})
    
    describe('POST /posts/add', () => {
        
        beforeEach(() => {
            createUser.mockReset()
        })


        describe("when passed a title, content, author", async () => {
            // should save the title content and author into the db 
            // should contain the userId

            const body = {
                title: "title",
                content: "content",
                author: "author"
            }
            const response = await request(app).post("/posts/add").send(body)
            expect(createUser.mock.calls[0][0]).toBe(body.title)
            expect(createUser.mock.calls[0][1]).toBe(body.content)
            expect(createUser.mock.calls[0][2]).toBe(body.author)
        })
    });

    // Add tests for other functions like 'Get User Post' and 'Get Post' here
    

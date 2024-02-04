import { addPost } from "./postController";
import { jest } from "@jest/globals";

describe('Post controller', () => {
    describe('Add Post', () => {
        it('should add a new post', () => {
            const req = {
                body: {
                    title: 'Test Post',
                    content: 'Test Content',
                    author: 'Test Author'
                }
            };

            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
                end: jest.fn()
            };

            addPost(req, res);

            // Assuming your implementation saves the post and returns some result
            expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
                title: 'Test Post',
                content: 'Test Content',
                author: 'Test Author'
            }));
        });
    });

    // Add tests for other functions like 'Get User Post' and 'Get Post' here
    describe('Get User Post', () => {
        
    });

    describe('Get Post', () => {
         
    })
})
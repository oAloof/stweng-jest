import postController from "./postController";
const postModel = require('../models/post');

jest.mock('../models/post', () => ({
    create: jest.fn(),
}));

describe('Post controller', () => {
    let req = {
        body: {},
        flash: jest.fn(),
        session: { user: 'Test Author' },
    };

    let res = {redirect: jest.fn()}


    describe('Add Post', () => {
        it('redirects to "/posts" on successful post creation', async () => {
            // Arrange
            const postDetails = { title: 'Test Title', content: 'Test Content', author: 'Test Author' };

            req.body = postDetails;
            postModel.create.mockImplementation((data, callback) => callback(null, data)); // Simulate success
            
            // Act
            await postController.addPost(req, res);
          
            // Assert
            expect(postModel.create).toHaveBeenCalledWith(postDetails, expect.any(Function));
            expect(res.redirect).toHaveBeenCalledWith('/posts');
          });
    });

    // Add tests for other functions like 'Get User Post' and 'Get Post' here
    

import postController from "./postController";
// const postModel = require('../models/post');
import postModel from "../models/post";

jest.mock('../models/post', () => ({
    create: jest.fn(),
    getByUser: jest.fn()
}));

describe('Post controller', () => {
    let req = {
        body: {},
        flash: jest.fn(),
        session: { user: 'Test Author' },
    };

    let res = {redirect: jest.fn(), render: jest.fn(), send: jest.fn()}


    describe('Add Post', () => {
        it('redirects to "/posts" on successful post creation', () => {
            // Arrange
            const postDetails = { title: 'Test Title', content: 'Test Content', author: 'Test Author' };

            req.body = postDetails;
            postModel.create.mockImplementation((data, callback) => callback(null, data)); // Simulate success
            
            // Act
            postController.addPost(req, res);
          
            // Assert
            expect(postModel.create).toHaveBeenCalledWith(postDetails, expect.any(Function));
            expect(res.redirect).toHaveBeenCalledWith('/posts');
          });
    });

    // Add tests for other functions like 'Get User Post' and 'Get Post' here   
    describe('Get By User', () => {
        it('should return all user posts made by user', () =>  {
            //Arrange 
            const userPosts = [
                { _id: 1, title: "title 1", content: "content 1", author: "author 1"},
                { _id: 2, title: "title 2", content: "content 2", author: "author 1"}
            ]
            
            postModel.getByUser.mockImplementation((user, callback) => callback(null, userPosts));

            postController.getUserPosts(req.session.user, res);

            expect(postModel.getByUser).toHaveBeenCalledWith(req.session.user, expect.any(Function));
            expect(res.send).toHaveBeenCalledWith(userPosts);

        });
    })


    describe('Get Post', () => { 
        it("should return a single post", () => {
            //Arrange
          
        })
    })

});
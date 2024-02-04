const sinon = require('sinon');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');
const mongoose = require('../models/connection');

describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content',
        },
        params: {
            id: '5aa06bb80738152cfd536fdc',
        }
    };

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;

     // This runs after all tests in this block
     afterAll(() => {
        // Close the database connection
        mongoose.connection.close();
    });

    
    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
            createPostStub = sinon.stub(PostModel, 'createPost').yields(error);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

    describe('update', () => {

        var createUpdateStub;
        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
            expectedResult = req.body
        })

        afterEach(() => {
            createUpdateStub.restore();
        })
        

        it('should return updated post object', () => {
            createUpdateStub = sinon.stub(PostModel, 'updatePost').yields(null, expectedResult);
            

            PostController.update(req, res);
            
            
            sinon.assert.calledWith(PostModel.updatePost, req.params.id, req.body, {new: true});
            sinon.assert.calledWith(res.json, sinon.match({title: req.body.title}));
            sinon.assert.calledWith(res.json, sinon.match({content: req.body.content}));
            sinon.assert.calledWith(res.json, sinon.match({author: req.body.author}));
            sinon.assert.calledWith(res.json, sinon.match({date: req.body.date}));
        })

        it('should return status 500 on server error', () => {
            createUpdateStub = sinon.stub(PostModel, 'updatePost').yields(error) 

            PostController.update(req, res);

            sinon.assert.calledWith(PostModel.updatePost, req.params.id, req.body, {new: true});
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        })
    });

    describe('findPost', () => {
        let findPostStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            findPostStub.restore();
        });

        it('should return the found post object', () => {
            expectedResult = {
                _id: '5aa06bb80738152cfd536fdc',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };

            findPostStub = sinon.stub(PostModel, 'findPost').yields(null, expectedResult);

            PostController.findPost(req, res);

            sinon.assert.calledWith(PostModel.findPost, req.params.id);
            sinon.assert.calledWith(res.json, sinon.match({_id : req.params.id}))
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));
        });

        it('should return status 500 on server error', () => {
            findPostStub = sinon.stub(PostModel, 'findPost').yields(error) 

            PostController.findPost(req, res);

            sinon.assert.calledWith(PostModel.findPost, req.params.id);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        })
    })

    describe('getAll', () => {
        let findAllStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
            expectedResult = [{}, {}, {}]
        });

        afterEach(() => {
            findAllStub.restore();
        });

        it('should return array of post objects or empty array', () => {
            findAllStub = sinon.stub(PostModel, 'getAllPost').yields(null, expectedResult);

            PostController.getAllPosts(req, res);

            sinon.assert.calledWith(PostModel.getAllPost, {});
            sinon.assert.calledWith(res.json, sinon.match.array);
        })

        it('should return status 500 on server error', () => {
            findAllStub = sinon.stub(PostModel, 'getAllPost').yields(error) 

            PostController.getAllPosts(req, res);

            sinon.assert.calledWith(PostModel.getAllPost, {});
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        })
    })
});

import commentCtrl from '../../controllers/comment.controller';
import Comment from '../../models/comment.model';
import httpMocks from 'node-mocks-http';

// Use mocked version of comment model
jest.mock('../../models/comment.model');

describe('Comment Controller tests', () => {
    let req, res, next;
    beforeEach(() => {
        req = httpMocks.createRequest();
        res = httpMocks.createResponse();
        next = jest.fn();

        // reset all mocks after each test
        Comment.create.mockClear();
        Comment.list.mockClear();
        Comment.remove.mockClear();
    });

    describe('create', () => {
        it('should have a create function', () => {
            expect(typeof commentCtrl.create).toBe('function');
        });
        it('should call Comment.create', async () => {
            req.body = {
                text: 'text comment',
                book: '12345',
                author: '67890',
            };
            Comment.create.mockResolvedValue(req.body);
            await commentCtrl.create(req, res, next);
            expect(Comment.create).toBeCalledWith(req.body);
        });
        it('should return 200 response code', async () => {
            // Setup request body
            req.body = {
                text: 'text comment',
                book: '12345',
                author: '67890',
            };

            const savedComment = { ...req.body };
            Comment.create.mockReturnValue(savedComment);

            // Call controller method
            await commentCtrl.create(req, res, next);

            expect(Comment.create).toBeCalledWith(req.body);

            expect(res.statusCode).toBe(200);
            expect(res._getJSONData()).toEqual({
                message: "Comment created",
                comment: savedComment
            })
        });
        it('should handle errors', async () => {
            const errorMessage = { message: 'Error creating comment' };

            req.body = {
                author: null,
                book: '67890',
                text: 'text comment',
            };

            Comment.create.mockRejectedValue(new Error(errorMessage.message));

            await commentCtrl.create(req, res, next);

            expect(commentCtrl.create).toThrowError(errorMessage.message);
        });

    });
    describe('list', () => {
        it('should have a list function', () => {
            expect(typeof commentCtrl.list).toBe('function');
        });
        it('should call Comment.find', async () => {
            await commentCtrl.list(req, res, next);
            expect(Comment.find).toHaveBeenCalled();
        });
        it('should return an array of comments', async () => {
            const savedComments = [ {text: 'test comment 1'}, {text: 'test comment 2'} ];
            Comment.find.mockResolvedValue(savedComments);

            req = httpMocks.createRequest();
            res = httpMocks.createResponse();

            await commentCtrl.list(req, res, next);
            
            expect(res.statusCode).toBe(200);
            const data = res._getJSONData();
            expect(data).toEqual(savedComments);
        });
        it('should return 200 response code', async () => {
            // to do
        });
        it('should handle errors', async () => {
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            const req = {};
            const next = jest.fn();

            const errorMessage = { message: 'Error listing comments' };

            await commentCtrl.list(req, res, next);
            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toThrowError(errorMessage.message);
        })
    });
});
CREATE PROCEDURE [dbo].[AddRetroPointComment]
	@userId int,
	@creationDate datetime,
	@retroPointId int,
	@retroColumnId int,
	@commentText varchar(500)
AS
	INSERT INTO RetroPointComments (RetroPointId, CommentOwnerId, CommentText, RetroColumnId, CreationDate)
	VALUES (@retroPointId, @userId, @commentText, @retroColumnId, @creationDate);

	SELECT C.*, U.UserEmail AS CommentOwnerEmail FROM RetroPointComments C
	JOIN Users U ON C.CommentOwnerId = U.Id
	WHERE C.CommentId = SCOPE_IDENTITY();
RETURN 0

CREATE PROCEDURE [dbo].[AddBoardPermission]
	@boardId int,
	@userId int
AS
	INSERT INTO RetroBoardPermissions (RetroBoardId, UserId)
	VALUES (@boardId, @userId)
RETURN 0

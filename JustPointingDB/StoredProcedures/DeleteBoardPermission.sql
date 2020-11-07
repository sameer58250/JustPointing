CREATE PROCEDURE [dbo].[DeleteBoardPermission]
	@boardId int,
	@userId int
AS
	DELETE FROM RetroBoardPermissions
	WHERE RetroBoardId = @boardId AND UserId = @userId
RETURN 0

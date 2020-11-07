CREATE PROCEDURE [dbo].[GetSharedBoards]
	@userId int
AS
	SELECT b.* FROM RetroBoards b
	JOIN RetroBoardPermissions p ON b.RetroBoardId = p.RetroBoardId
	WHERE p.UserId = @userId
RETURN 0

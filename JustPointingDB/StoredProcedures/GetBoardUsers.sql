CREATE PROCEDURE [dbo].[GetBoardUsers]
	@boardId int
AS
	SELECT u.UserEmail, u.Id from Users u
	JOIN RetroBoardPermissions p ON u.Id = p.UserId
	WHERE p.RetroBoardId = @boardId
RETURN 0

CREATE PROCEDURE [dbo].[GetAllBoardsWithUserId]
	@userId int = 0
AS
	SELECT * from RetroBoards where RetroBoardOwner = @userId
RETURN 0

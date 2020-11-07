CREATE PROCEDURE [dbo].[UpdateRetroBoard]
	@boardId int,
	@title VARCHAR(100)
AS
	UPDATE RetroBoards SET RetroBoardTitle = @title
	WHERE RetroBoardId = @boardId
RETURN 0

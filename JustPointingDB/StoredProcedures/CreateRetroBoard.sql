CREATE PROCEDURE [dbo].[CreateRetroBoard]
	@boardOwner int,
	@boardTitle VARCHAR(100)
AS
	INSERT INTO RetroBoards (RetroBoardTitle, RetroBoardOwner, CreationDate)
	VALUES (@boardTitle, @boardOwner, GETDATE())
RETURN 0

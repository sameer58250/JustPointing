CREATE PROCEDURE [dbo].[AddRetroColumns]
	@boardId int,
	@columnTitle VARCHAR(100)
AS
	INSERT INTO RetroColumnTypes (ColumnTitle, RetroBoardId, CreationDate)
	VALUES (@columnTitle, @boardId, GETDATE())
	SELECT SCOPE_IDENTITY()
RETURN 0

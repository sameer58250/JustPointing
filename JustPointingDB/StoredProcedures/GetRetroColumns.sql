CREATE PROCEDURE [dbo].[GetRetroColumns]
	@boardId int
AS
	SELECT * from RetroColumnTypes WHERE RetroBoardId = @boardId
RETURN 0

CREATE PROCEDURE [dbo].[GetRetroBoardDetails]
	@boardId int = 0
AS
	SELECT c.*, p.* FROM RetroColumnTypes c
	JOIN RetroPoints p on c.ColumnTypeId = p.RetroColumnTypeId
	WHERE c.RetroBoardId = @boardId
RETURN 0

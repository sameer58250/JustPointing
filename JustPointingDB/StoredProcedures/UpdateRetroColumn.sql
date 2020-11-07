CREATE PROCEDURE [dbo].[UpdateRetroColumn]
	@columnId int,
	@columnTitle VARCHAR(100)
AS
	UPDATE RetroColumnTypes SET ColumnTitle = @columnTitle
	WHERE ColumnTypeId = @columnId
RETURN 0

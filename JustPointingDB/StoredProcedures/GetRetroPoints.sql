CREATE PROCEDURE [dbo].[GetRetroPoints]
	@columnId int
AS
	SELECT * FROM RetroPoints WHERE RetroColumnTypeId = @columnId
RETURN 0

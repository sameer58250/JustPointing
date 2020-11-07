CREATE PROCEDURE [dbo].[DeleteRetroBoardTemplateColumn]
	@retroTemplateColumnId int
AS
	Delete from RetroTemplateColumns where RetroTemplateColumnId = @retroTemplateColumnId;
RETURN 0

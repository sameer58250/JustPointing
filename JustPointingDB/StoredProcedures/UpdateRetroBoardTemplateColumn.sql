CREATE PROCEDURE [dbo].[UpdateRetroBoardTemplateColumn]
	@retroTemplateColumnName varchar(200),
	@retroTemplateColumnId int
AS
	update RetroTemplateColumns set RetroTemplateColumnName = @retroTemplateColumnName
	where RetroTemplateColumnId = @retroTemplateColumnId;
RETURN 0

CREATE PROCEDURE [dbo].[AddRetroBoardTemplateColumn]
	@retroTemplateColumnName varchar(200),
	@retroBoardTemplateId int
AS
	Insert into RetroTemplateColumns (RetroTemplateColumnName, RetroBoardTemplateId)
	values (@retroTemplateColumnName, @retroBoardTemplateId);

	select * from RetroTemplateColumns where RetroTemplateColumnId = SCOPE_IDENTITY();
RETURN 0

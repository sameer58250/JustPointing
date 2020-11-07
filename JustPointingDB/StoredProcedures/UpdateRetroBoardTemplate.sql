CREATE PROCEDURE [dbo].[UpdateRetroBoardTemplate]
	@templateName varchar(200),
	@retroBoardTemplateId int
AS
	update RetroBoardTemplates set TemplateName = @templateName
	where RetroBoardTemplateId = @retroBoardTemplateId;
RETURN 0

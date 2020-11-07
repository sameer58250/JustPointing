CREATE PROCEDURE [dbo].[SetDefaultTemplate]
	@retroBoardTemplateId int,
	@userId int
AS
	Update RetroBoardTemplates set IsDefault = 0 where TemplateOwnerId = @userId;
	Update RetroBoardTemplates set IsDefault = 2 where RetroBoardTemplateId = @retroBoardTemplateId;
RETURN 0

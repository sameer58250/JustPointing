CREATE PROCEDURE [dbo].[GetRetroBoardTemplates]
	@templateOwnerId int
AS
	select * from RetroBoardTemplates where TemplateOwnerId = @templateOwnerId;
RETURN 0

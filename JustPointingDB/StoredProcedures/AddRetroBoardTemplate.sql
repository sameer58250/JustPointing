CREATE PROCEDURE [dbo].[AddRetroBoardTemplate]
	@templateOwnerId int,
	@templateName varchar(200),
	@creationDate datetime,
	@isDefault bit = 0
AS
	Insert into RetroBoardTemplates (TemplateOwnerId, TemplateName, CreationDate, IsDefault)
	values (@templateOwnerId, @templateName, @creationDate, @isDefault);

	select * from RetroBoardTemplates where RetroBoardTemplateId = SCOPE_IDENTITY();
RETURN 0

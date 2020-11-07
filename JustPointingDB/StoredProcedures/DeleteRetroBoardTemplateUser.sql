CREATE PROCEDURE [dbo].[DeleteRetroBoardTemplateUser]
	@id int
AS
	Delete from RetroBoardTemplateUsers where Id = @id;
RETURN 0

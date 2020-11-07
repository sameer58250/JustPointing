CREATE PROCEDURE [dbo].[GetRetroBoardTemplateDetails]
	@retroBoardTemplateId int
AS
	SELECT * from RetroTemplateColumns where RetroBoardTemplateId = @retroBoardTemplateId;
	SELECT t.*, u.UserEmail from RetroBoardTemplateUsers t 
	join Users u on t.UserId = u.Id where t.RetroBoardTemplateId = @retroBoardTemplateId;
RETURN 0

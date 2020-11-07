CREATE PROCEDURE [dbo].[AddRetroBoardTemplateUser]
	@userEmail varchar(100),
	@retroBoardTemplateId int
AS
	declare @userId int;
	select @userId = Id from Users where UserEmail = @userEmail;
	Insert into RetroBoardTemplateUsers (UserId, RetroBoardTemplateId)
	values (@userId, @retroBoardTemplateId);

	select *, @userEmail as userEmail from RetroBoardTemplateUsers where Id = SCOPE_IDENTITY();
RETURN 0

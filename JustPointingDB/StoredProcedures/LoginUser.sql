CREATE PROCEDURE [dbo].[LoginUser]
	@userEmail VARCHAR(100)
AS
	SELECT u.Id, u.UserEmail FROM Users u WHERE UserEmail = @userEmail
RETURN 0

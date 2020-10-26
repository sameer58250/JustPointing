CREATE PROCEDURE [dbo].[LoginUser]
	@userEmail VARCHAR(100),
	@password VARCHAR(256)
AS
	SELECT u.Id, u.UserEmail, u.CreationDate 
	FROM Users u 
	WHERE UserEmail = @userEmail and UserPassword = @password
RETURN 0

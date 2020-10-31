CREATE PROCEDURE [dbo].[LoginUser]
	@userEmail VARCHAR(100),
	@password VARCHAR(256)
AS
	SELECT u.Id, u.Name, u.UserEmail, u.CreationDate, u.Phone
	FROM Users u 
	WHERE UserEmail = @userEmail and UserPassword = @password
RETURN 0

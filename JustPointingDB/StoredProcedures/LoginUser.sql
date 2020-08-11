CREATE PROCEDURE [dbo].[LoginUser]
	@userEmail VARCHAR(100)
AS
	IF NOT EXISTS (SELECT * FROM Users WHERE UserEmail = @userEmail)
	BEGIN
		INSERT INTO Users (UserEmail)
		VALUES (@userEmail)
	END
	SELECT u.Id, u.UserEmail FROM Users u WHERE UserEmail = @userEmail
RETURN 0

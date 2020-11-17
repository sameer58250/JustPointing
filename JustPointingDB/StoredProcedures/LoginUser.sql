CREATE PROCEDURE [dbo].[LoginUser]
	@userEmail VARCHAR(100),
	@password VARCHAR(256),
	@userGuid VARCHAR(100)
AS
	SELECT u.Id, u.Name, u.UserEmail, u.CreationDate, u.Phone, u.IsRegistered
	FROM Users u 
	WHERE UserEmail = @userEmail and (UserPassword = @password or UserGuid = @userGuid)
RETURN 0

CREATE PROCEDURE [dbo].[AddBoardPermission]
	@boardId int,
	@userEmail varchar(100)
AS
	declare @userId as int;
	IF NOT EXISTS (SELECT * FROM Users WHERE UserEmail = @userEmail)
	BEGIN
		INSERT INTO Users (UserEmail)
		VALUES (@userEmail)
	END
	select @userId = Id from Users where UserEmail = @userEmail;
	If NOT EXISTS (select * from RetroBoardPermissions where RetroBoardId = @boardId and UserId = @userId)
	BEGIN
		INSERT INTO RetroBoardPermissions (RetroBoardId, UserId)
		VALUES (@boardId, @userId)
	END
RETURN 0

CREATE PROCEDURE [dbo].[AddBoardPermission]
	@boardId int,
	@userEmail varchar(100)
AS
	declare @userId as int;
	IF NOT EXISTS (SELECT * FROM Users WHERE UserEmail = @userEmail)
	BEGIN
		INSERT INTO Users (UserEmail, UserGuid, IsRegistered)
		VALUES (@userEmail, NEWID(), 0)
	END
	select @userId = Id from Users where UserEmail = @userEmail;
	If NOT EXISTS (select * from RetroBoardPermissions p join RetroBoards b
	on p.RetroBoardId=b.RetroBoardId where (p.RetroBoardId = @boardId and p.UserId = @userId)
	or (b.RetroBoardOwner = @userId and b.RetroBoardId = @boardId))
	BEGIN
		INSERT INTO RetroBoardPermissions (RetroBoardId, UserId)
		VALUES (@boardId, @userId)
	END
	SELECT UserGuid from Users where UserEmail = @userEmail;
RETURN 0

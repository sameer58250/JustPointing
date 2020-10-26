--create user if not exists
--@returnValue = 1 user already exists
CREATE PROCEDURE [dbo].[CreateUser]
	@email varchar(100),
	@password varchar(256),
	@creationDate Datetime
AS
	declare @returnValue int =0 ;
	If Not exists (select * from Users where UserEmail = @email)
	begin
		INSERT INTO Users (UserEmail, UserPassword, CreationDate)
		VALUES (@email, @password, @creationDate);
		select UserEmail, Id as UserId, CreationDate from Users
		where UserEmail = @email;
	end
	else
	begin
		set @returnValue = 1;
	end
RETURN @returnValue;

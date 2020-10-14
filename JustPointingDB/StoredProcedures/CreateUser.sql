--create user if not exists
--@returnValue = 1 user already exists
CREATE PROCEDURE [dbo].[CreateUser]
	@email varchar(100)
AS
	declare @returnValue int =0 ;
	If Not exists (select * from Users where UserEmail = @email)
	begin
		INSERT INTO Users (UserEmail)
		VALUES (@email);
		select UserEmail, Id as UserId from Users
		where UserEmail = @email;
	end
	else
	begin
		set @returnValue = 1;
	end
RETURN @returnValue;

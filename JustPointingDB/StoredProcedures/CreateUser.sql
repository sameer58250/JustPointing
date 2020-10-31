--create user if not exists
--@returnValue = 1 user already exists
CREATE PROCEDURE [dbo].[CreateUser]
	@name varchar(200),
	@email varchar(100),
	@password varchar(256),
	@phone varchar(13),
	@creationDate Datetime
AS
	declare @returnValue int =0 ;
	If Not exists (select * from Users where UserEmail = @email)
	begin
		INSERT INTO Users (Name, UserEmail, UserPassword, CreationDate, Phone)
		VALUES (@name, @email, @password, @creationDate, @phone);
		select Name, UserEmail, Id as UserId, CreationDate, Phone from Users
		where UserEmail = @email;
	end
	else
	begin
		set @returnValue = 1;
	end
RETURN @returnValue;

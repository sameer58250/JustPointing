--create user if not exists
--@returnValue = 1 user already exists
--@returnValue = 2 user already invited, require invitation token to register
CREATE PROCEDURE [dbo].[CreateUser]
	@name varchar(200),
	@email varchar(100),
	@password varchar(256),
	@phone varchar(13),
	@creationDate Datetime,
	@userGuid varchar(100)
AS
	declare @returnValue int =0, @isAlreadyRegistered bit = 0 ;
	If Not exists (select * from Users where UserEmail = @email)
	begin
		INSERT INTO Users (Name, UserEmail, UserPassword, CreationDate, Phone, UserGuid, IsRegistered)
		VALUES (@name, @email, @password, @creationDate, @phone, @userGuid, 1);
		select Name, UserEmail, Id as UserId, CreationDate, Phone, IsRegistered from Users
		where UserEmail = @email;
	end
	else
	begin
		select @isAlreadyRegistered = IsRegistered from Users where UserEmail = @email  and UserGuid = @userGuid;
		if @isAlreadyRegistered = 1
		begin
			set @returnValue = 1;
		end
		else
		begin
			update Users set UserPassword = @password, Phone = @phone, Name = @name, IsRegistered = 1
			where UserEmail = @email and UserGuid = @userGuid;
			select Name, UserEmail, Id as UserId, CreationDate, Phone, IsRegistered from Users
			where UserEmail = @email and UserGuid = @userGuid;
			if @@ROWCOUNT <= 0
			begin
				set @returnValue = 2;
			end
		end
	end
RETURN @returnValue;

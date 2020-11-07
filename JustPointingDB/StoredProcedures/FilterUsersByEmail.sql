CREATE PROCEDURE [dbo].[FilterUsersByEmail]
	@email varchar(100) = ''
AS
	if LEN(@email) > 2
	begin
		declare @searchText varchar(102);
		set @searchText = CONCAT('%',@email,'%');
		SELECT Id, Name, UserEmail, Phone from Users where UserEmail like @searchText;
	end
RETURN 0

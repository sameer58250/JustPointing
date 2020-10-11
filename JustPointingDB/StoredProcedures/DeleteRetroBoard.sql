CREATE PROCEDURE [dbo].[DeleteRetroBoard]
	@boardId int,
	@userId int
AS
	declare @boardOwenrId as int;
	declare @error as nvarchar(2048);
	select @boardOwenrId=RetroBoardOwner from RetroBoards where RetroBoardId=@boardId and RetroBoardOwner=@userId
	if @boardOwenrId is NULL
	begin
		RAISERROR('permission denied',1, 1);
	end
	else
	begin
		begin try
			begin tran
				DELETE FROM RetroBoardPermissions where RetroBoardId=@boardId;
				delete p from RetroPoints p inner join RetroColumnTypes c on p.RetroColumnTypeId=c.ColumnTypeId where c.RetroBoardId=@boardId;
				delete from RetroColumnTypes where RetroBoardId=@boardId;
				delete from RetroBoards where RetroBoardId=@boardId;
			commit;
		end try
		begin catch
			if @@TRANCOUNT > 0
				rollback tran;
			RAISERROR('Failed to delete the board',2,1)
		end catch
	end
RETURN 0

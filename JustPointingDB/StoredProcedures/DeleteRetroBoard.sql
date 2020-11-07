--@errorLevel = 1 (user does not have permission)
--@errorLevel = 2 (failed to delete the board)
CREATE PROCEDURE [dbo].[DeleteRetroBoard]
	@boardId int,
	@userId int
AS
	declare @boardOwenrId as int;
	declare @errorLevel as tinyint = 0;
	select @boardOwenrId=RetroBoardOwner from RetroBoards where RetroBoardId=@boardId and RetroBoardOwner=@userId
	if @boardOwenrId is NULL
	begin
		set @errorLevel = 1;
	end
	else
	begin
		begin try
			begin tran
				DELETE FROM RetroBoardPermissions where RetroBoardId=@boardId;
				delete p from RetroPoints p inner join RetroColumnTypes c on p.RetroColumnTypeId=c.ColumnTypeId where c.RetroBoardId=@boardId;
				delete com from RetroPointComments com inner join RetroColumnTypes col on com.RetroColumnId=col.ColumnTypeId where col.RetroBoardId=@boardId;
				delete from RetroColumnTypes where RetroBoardId=@boardId;
				delete from RetroBoards where RetroBoardId=@boardId;
			commit;
		end try
		begin catch
			if @@TRANCOUNT > 0
				rollback tran;
			set @errorLevel = 2;
		end catch
	end
RETURN @errorLevel

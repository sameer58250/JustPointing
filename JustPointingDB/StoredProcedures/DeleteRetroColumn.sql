--@errorLevel = 1 (user does not have permission)
--@errorLevel = 2 (failed to delete the board)
CREATE PROCEDURE [DeleteRetroColumn]
	@columnId int
AS
	declare @errorLevel as tinyint = 0;
	begin try
			begin tran
				delete from RetroPointComments where RetroColumnId = @columnId;
				delete from RetroPoints where RetroColumnTypeId = @columnId;
				delete from RetroColumnTypes where ColumnTypeId = @columnId;
			commit;
		end try
		begin catch
			if @@TRANCOUNT > 0
				rollback tran;
			set @errorLevel = 2;
		end catch
RETURN @errorLevel;

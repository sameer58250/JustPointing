--@errorLevel = 1 (user does not have permission)
--@errorLevel = 2 (failed to delete the board)
CREATE PROCEDURE [dbo].[DeleteRetroPoint]
	@pointId int
AS
	declare @errorLevel as tinyint = 0;
	begin try
			begin tran
				delete from RetroPointComments where RetroPointId = @pointId;
				delete from RetroPoints where RetroPointId = @pointId;
			commit;
		end try
		begin catch
			if @@TRANCOUNT > 0
				rollback tran;
			set @errorLevel = 2;
		end catch
RETURN @errorLevel

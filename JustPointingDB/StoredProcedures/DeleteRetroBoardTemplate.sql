--@errorLevel = 1 (user does not have permission)
--@errorLevel = 2 (failed to delete the board)
CREATE PROCEDURE [dbo].[DeleteRetroBoardTemplate]
	@retroBoardTemplateId int
AS
	declare @errorLevel as tinyint = 0;
	begin try
			begin tran
				delete from RetroBoardTemplateUsers where RetroBoardTemplateId = @retroBoardTemplateId;
				delete from RetroTemplateColumns where RetroBoardTemplateId = @retroBoardTemplateId;
				delete from RetroBoardTemplates where RetroBoardTemplateId = @retroBoardTemplateId;
			commit;
		end try
		begin catch
			if @@TRANCOUNT > 0
				rollback tran;
			set @errorLevel = 2;
		end catch
RETURN @errorLevel

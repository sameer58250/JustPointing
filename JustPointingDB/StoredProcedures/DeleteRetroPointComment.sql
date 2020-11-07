CREATE PROCEDURE [dbo].[DeleteRetroPointComment]
	@commentId int
AS
	DELETE FROM RetroPointComments WHERE CommentId = @commentId;
RETURN 0

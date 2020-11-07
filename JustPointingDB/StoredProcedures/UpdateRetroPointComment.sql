CREATE PROCEDURE [dbo].[UpdateRetroPointComment]
	@commentId INT,
	@commentText VARCHAR(500)
AS
	UPDATE RetroPointComments SET CommentText = @commentText
	WHERE CommentId = @commentId;
RETURN 0

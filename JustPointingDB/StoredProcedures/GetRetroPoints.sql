CREATE PROCEDURE [dbo].[GetRetroPoints]
	@columnId int
AS
	SELECT p.*, u.UserEmail FROM RetroPoints p JOIN Users u
	ON p.PointUserid = u.Id
	WHERE p.RetroColumnTypeId = @columnId;

	SELECT c.*, u.UserEmail as CommentOwnerEmail FROM RetroPointComments c JOIN Users u
	ON c.CommentOwnerId = u.Id
	WHERE c.RetroColumnId = @columnId;
RETURN 0

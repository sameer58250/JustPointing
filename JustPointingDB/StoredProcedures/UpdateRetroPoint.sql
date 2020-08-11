CREATE PROCEDURE [dbo].[UpdateRetroPoint]
	@retroPointId int,
	@pointText VARCHAR(500)
AS
	UPDATE RetroPoints SET RetroPointText = @pointText
	WHERE RetroPointId = @retroPointId
RETURN 0

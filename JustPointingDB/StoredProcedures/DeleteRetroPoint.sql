CREATE PROCEDURE [dbo].[DeleteRetroPoint]
	@pointId int
AS
	DELETE from RetroPoints where RetroPointId = @pointId
RETURN 0

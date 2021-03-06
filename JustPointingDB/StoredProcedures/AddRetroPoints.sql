﻿CREATE PROCEDURE [dbo].[AddRetroPoints]
	@userId int,
	@columnId int,
	@pointText VARCHAR(500),
	@pointId int = 0
AS
	INSERT INTO RetroPoints (RetroPointText, PointUserid, RetroColumnTypeId, CreationDate)
	VALUES (@pointText, @userId, @columnId, GETDATE());
	SELECT SCOPE_IDENTITY();
RETURN 0

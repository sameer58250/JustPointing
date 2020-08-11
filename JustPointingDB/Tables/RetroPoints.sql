CREATE TABLE [dbo].[RetroPoints]
(
	[RetroPointId] INT NOT NULL PRIMARY KEY IDENTITY,
	RetroPointText VARCHAR(500) NOT NULL,
	PointUserid INT FOREIGN KEY REFERENCES Users(Id),
	RetroColumnTypeId INT FOREIGN KEY REFERENCES RetroColumnTypes(ColumnTypeId),
	CreationDate DATETIME
)

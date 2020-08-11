CREATE TABLE [dbo].[RetroColumnTypes]
(
	[ColumnTypeId] INT NOT NULL PRIMARY KEY IDENTITY,
	ColumnTitle VARCHAR(100),
	CreationDate DATETIME,
	RetroBoardId INT FOREIGN KEY REFERENCES RetroBoards(RetroBoardId)
)

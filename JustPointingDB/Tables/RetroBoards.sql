CREATE TABLE [dbo].[RetroBoards]
(
	[RetroBoardId] INT NOT NULL PRIMARY KEY IDENTITY,
	RetroBoardTitle VARCHAR(100) NOT NULL,
	CreationDate DATETIME,
	[RetroBoardOwner] int FOREIGN KEY REFERENCES Users(Id),
	INDEX retro_board_owner_index NONCLUSTERED (RetroBoardOwner)
);

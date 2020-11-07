CREATE TABLE [dbo].[RetroBoardPermissions]
(
	[PermissiomId] INT NOT NULL PRIMARY KEY IDENTITY,
	RetroBoardId INT FOREIGN KEY REFERENCES RetroBoards(RetroBoardId) NOT NULL,
	UserId INT FOREIGN KEY REFERENCES Users(Id) NOT NULL,
	INDEX retro_permission_userid_boardid NONCLUSTERED (RetroBoardId, UserId)
)

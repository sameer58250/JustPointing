CREATE TABLE [dbo].[RetroPointComments]
(
	[CommentId] INT NOT NULL IDENTITY PRIMARY KEY, 
    [CommentText] VARCHAR(500) NOT NULL, 
    [RetroPointId] INT NOT NULL FOREIGN KEY REFERENCES RetroPoints(RetroPointId), 
    [CommentOwnerId] INT NOT NULL FOREIGN KEY REFERENCES Users(Id), 
    [RetroColumnId] INT NOT NULL FOREIGN KEY REFERENCES RetroColumnTypes(ColumnTypeId),
    [CreationDate] DATETIME NULL
)

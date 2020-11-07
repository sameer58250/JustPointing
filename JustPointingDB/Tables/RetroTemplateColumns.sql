CREATE TABLE [dbo].[RetroTemplateColumns]
(
	[RetroTemplateColumnId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [RetroTemplateColumnName] VARCHAR(100) NOT NULL, 
    [RetroBoardTemplateId] INT NOT NULL FOREIGN KEY REFERENCES RetroBoardTemplates(RetroBoardTemplateId),
    index retro_board_template nonclustered (RetroBoardTemplateId)
)
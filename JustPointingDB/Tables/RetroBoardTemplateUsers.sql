CREATE TABLE [dbo].[RetroBoardTemplateUsers]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [UserId] INT NOT NULL FOREIGN KEY REFERENCES Users(Id), 
    [RetroBoardTemplateId] INT NOT NULL FOREIGN KEY REFERENCES RetroBoardTemplates(RetroBoardTemplateId),	
)

CREATE TABLE [dbo].[RetroBoardTemplates]
(
	[RetroBoardTemplateId] INT NOT NULL PRIMARY KEY IDENTITY, 
    [TemplateOwnerId] INT NOT NULL foreign key references Users(Id), 
    [TemplateName] VARCHAR(200) NOT NULL, 
    [CreationDate] DATETIME NOT NULL, 
    [IsDefault] BIT NOT NULL

    Index retro_board_template_owner nonclustered (TemplateOwnerId)
)

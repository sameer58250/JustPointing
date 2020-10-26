CREATE TABLE [dbo].[Users]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY,
	UserEmail VARCHAR(100) NOT NULL UNIQUE,
	CreationDate DATETIME, 
    [UserPassword] VARCHAR(256) NULL,
	INDEX user_validate_credentials NONCLUSTERED(UserEmail, UserPassword)
)

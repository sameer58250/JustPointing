/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/

DECLARE @email VARCHAR(100);

SET @email = 'retroadmin@justpointing.com';
IF NOT EXISTS(SELECT * FROM Users WHERE UserEmail = @email)
BEGIN
    INSERT INTO Users (UserEmail, CreationDate)
    VALUES (@email, GETDATE())
END

--IF NOT EXISTS(SELECT * FROM RetroBoards WHERE RetroBoardOwner IN (SELECT Id FROM Users WHERE UserEmail = @email)
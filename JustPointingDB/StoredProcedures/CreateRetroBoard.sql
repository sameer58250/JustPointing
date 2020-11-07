CREATE PROCEDURE [dbo].[CreateRetroBoard]
	@boardOwner int,
	@boardTitle VARCHAR(100)
AS
	declare @boardId int;
	INSERT INTO RetroBoards (RetroBoardTitle, RetroBoardOwner, CreationDate)
	VALUES (@boardTitle, @boardOwner, GETDATE())
	set @boardId = SCOPE_IDENTITY();

	Insert into RetroColumnTypes (ColumnTitle, RetroBoardId, CreationDate)
	select c.RetroTemplateColumnName, @boardId, GETDATE()
	from RetroBoardTemplates t join RetroTemplateColumns c
	on t.RetroBoardTemplateId = c.RetroBoardTemplateId
	where t.TemplateOwnerId = @boardOwner and t.IsDefault = 1;

	Insert into RetroBoardPermissions(UserId, RetroBoardId)
	select u.UserId, @boardId
	from RetroBoardTemplates t join RetroBoardTemplateUsers u
	on t.RetroBoardTemplateId = u.RetroBoardTemplateId
	where t.TemplateOwnerId = @boardOwner and t.IsDefault = 1;

	select @boardId;
RETURN 0

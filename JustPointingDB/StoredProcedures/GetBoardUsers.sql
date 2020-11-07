CREATE PROCEDURE [dbo].[GetBoardUsers]
	@boardId int
AS
	drop table if exists #userTbl;
	create table #userTbl
	(
		Name varchar(200),
		UserEmail varchar(100),
		UserId int
	);

	Insert into #userTbl
	select u.Name, u.UserEmail, u.Id from Users u
	join RetroBoards b on u.Id=b.RetroBoardOwner
	where b.RetroBoardId=@boardId;

	Insert into #userTbl
	SELECT u.Name, u.UserEmail, u.Id from Users u
	JOIN RetroBoardPermissions p ON u.Id = p.UserId
	WHERE p.RetroBoardId = @boardId

	select distinct Name, UserEmail, UserId from #userTbl;
RETURN 0

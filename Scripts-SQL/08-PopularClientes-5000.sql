USE [DbTeste]
GO

declare @i int
set @i = 1 

while (@i <= 5000)
Begin
    INSERT INTO [dbo].[Cliente]
            ([Nome]
            ,[Email]
            ,[Telefone]
            ,[Data])
        VALUES
            (CONCAT('Teste', @i)
            ,CONCAT(@i, 'teste@mail.com')
            ,'99999999999'
            ,'13/10/2022')
    SET @i = @i + 1
END

USE [DbTeste]
GO

declare @i int
    set @i = 1 

    while (@i <= 5000)
	Begin
		INSERT INTO [dbo].[Imovel]
           ([ClienteId]
           ,[Cidade]
           ,[Bairro]
		   ,[Rua]
           ,[Numero]
		   ,[Complemento]
		   )
		 VALUES
		   (@i + 1
           ,CONCAT('Cidade ', @i)
		   ,CONCAT('Bairro ', @i)
           ,CONCAT('Rua ', @i)
           ,@i
		   ,CONCAT('Complemento ', @i))
		SET @i = @i + 1
	END

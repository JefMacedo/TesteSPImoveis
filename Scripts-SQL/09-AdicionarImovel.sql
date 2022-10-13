USE [DbTeste]
GO

INSERT INTO [dbo].[Imovel]
           ([ClienteId]
           ,[Cidade]
           ,[Bairro]
		   ,[Rua]
           ,[Numero]
		   ,[Complemento]
		   )
     VALUES
           (1
           ,'Cuiabá'
		   ,'Jardim Petrópolis'
           ,'Juscelino Reiners'
           ,245
		   ,'Edificio Petrópolis AP 104')
GO

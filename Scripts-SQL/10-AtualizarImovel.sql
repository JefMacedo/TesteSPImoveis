USE [DbTeste]
GO

UPDATE [dbo].[Imovel]
   SET [ClienteId] = 1
      ,[Cidade] = 'Cuiabá'
      ,[Bairro] = 'Jardim Petrópolis'
      ,[Rua] = 'Juscelino Reiners'
      ,[Numero] = 245
      ,[Complemento] = 'Edificio Petrópolis AP 104A'
 WHERE [ImovelId] = 1
GO

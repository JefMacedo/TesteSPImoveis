USE master;  
GO  

CREATE DATABASE DbTeste  
ON   
( NAME = DbTeste_dat,  
    FILENAME = 'C:\Database\Teste\DbTeste.mdf',  
    SIZE = 10MB,  
    MAXSIZE = UNLIMITED,  
    FILEGROWTH = 5MB )  
LOG ON  
( NAME = DbTeste_log,  
    FILENAME = 'C:\Database\Teste\DbTeste.ldf',  
    SIZE = 5MB,  
    MAXSIZE = 250MB,  
    FILEGROWTH = 5MB );  
GO  

using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace mongosetup
{
    internal class MongoService
    {
        // Статическая переменная для хранения единственного экземпляра сервиса
        private static MongoService _instance;

        // Поля для работы с MongoDB
        private readonly IMongoDatabase _database;



        // Приватный конструктор (никто не сможет написать new MongoService() снаружи)
        private MongoService()
        {
            var client = new MongoClient("mongodb://localhost:27017");
            _database = client.GetDatabase("College");
        }

        // Свойство для получения экземпляра класса (точка доступа)
        public static MongoService Instance => _instance ??= new MongoService();

        // Универсальный метод для получения любой коллекции
        public IMongoCollection<T> GetCollection<T>(string name)
        {
            return _database.GetCollection<T>(name);
        }
    }
}
using MongoDB.Driver;
using MongoDB.Bson;

namespace mongosetup
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();

            // 1. Создаем клиента (точка входа)
            var client = new MongoClient("mongodb://localhost:27017");

            // 2. Подключаемся к конкретной базе данных
            var database = client.GetDatabase("College");

            // 3. Получаем доступ к коллекции (таблице)
            // Пока используем BsonDocument (универсальный тип без привязки к классу)
            var collection = database.GetCollection<BsonDocument>("Students");

            // 4. Проверяем, что связь действительно есть
            // Получаем список имен баз данных
            using (var cursor = client.ListDatabaseNames())
            {
                var databaseNames = cursor.ToList();
                MessageBox.Show("Соединение установлено. Доступные базы: " + string.Join(", ", databaseNames));
            }
        }

    }
}
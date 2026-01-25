using MongoDB.Bson;
using MongoDB.Driver;
using System.Windows.Forms;

namespace mongosetup
{
    public partial class Form1 : Form
    {
        // Объявляем переменные на уровне класса (поля), чтобы они были доступны везде
        private IMongoCollection<BsonDocument> _collection;
        private IMongoDatabase _database;
        private MongoClient _client;

        public Form1()
        {
            InitializeComponent();

            // Сразу после инициализации компонентов пробуем подключиться
            ConnectToMongo();
        }

        private void ConnectToMongo()
        {
            // Устанавливаем начальное состояние
            toolStripStatusLabel1.Text = "Попытка подключения...";
            toolStripStatusLabel1.ForeColor = Color.Black;

            try
            {
                // Настройки клиента (добавляем таймаут, чтобы приложение не зависло надолго)
                var settings = MongoClientSettings.FromConnectionString("mongodb://localhost:27017");
                settings.ServerSelectionTimeout = TimeSpan.FromSeconds(3); // Ждем максимум 3 сек.

                _client = new MongoClient(settings);
                _database = _client.GetDatabase("College");
                _collection = _database.GetCollection<BsonDocument>("Students");

                // Выполняем реальную проверку (Ping)
                _database.RunCommand((Command<BsonDocument>)"{ping:1}");

                // Если Ping прошел успешно:
                toolStripStatusLabel1.Text = "Подключено к MongoDB: College";
                toolStripStatusLabel1.ForeColor = Color.DarkGreen;
            }
            catch (Exception ex)
            {
                // Если произошла ошибка:
                toolStripStatusLabel1.Text = "Ошибка соединения!";
                toolStripStatusLabel1.ForeColor = Color.Red;

                // Подробности ошибки можно оставить в ToolTip или Output
                System.Diagnostics.Debug.WriteLine(ex.Message);
            }
        }
    }
}
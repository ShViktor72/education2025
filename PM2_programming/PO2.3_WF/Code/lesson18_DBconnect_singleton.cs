using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System.Windows.Forms;

namespace mongosetup
{
    public partial class Form1 : Form
    {
        private IMongoCollection<Student> _students;

        public Form1()
        {
            InitializeComponent();

            try
            {
                // 1. Получаем коллекцию
                _students = MongoService.Instance.GetCollection<Student>("Students");

                // 2. Считаем документы (передаем пустой фильтр, т.е. "считать всё")
                long count = _students.CountDocuments(new BsonDocument());

                // 3. Выводим статус в StatusStrip
                if (count > 0)
                {
                    toolStripStatusLabel1.Text = $"Подключено. Студентов в базе: {count}";
                    toolStripStatusLabel1.ForeColor = Color.DarkGreen;
                }
                else
                {
                    toolStripStatusLabel1.Text = "Подключено. Коллекция Students пуста.";
                    toolStripStatusLabel1.ForeColor = Color.Orange;
                }
            }
            catch (Exception ex)
            {
                toolStripStatusLabel1.Text = "Ошибка подключения!";
                toolStripStatusLabel1.ForeColor = Color.Red;
                MessageBox.Show("Детали ошибки: " + ex.Message);
            }
        }

    }

    [BsonIgnoreExtraElements] // Важнейший атрибут: игнорирует поля в базе, которых нет в этом классе
    public class Student
    {
        [BsonId] // Помечает это поле как первичный ключ (_id)
        [BsonRepresentation(BsonType.ObjectId)] // Позволяет C# работать с ID как со строкой
        public string Id { get; set; }

        [BsonElement("name")] // Явно указываем имя поля в базе (если оно отличается от имени свойства)
        public string Name { get; set; }

        public int age { get; set; } // Если имена совпадают, атрибут [BsonElement] не нужен
    }
}
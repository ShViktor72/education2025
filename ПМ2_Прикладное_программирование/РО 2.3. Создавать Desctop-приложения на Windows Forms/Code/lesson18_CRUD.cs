using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System.ComponentModel;
using System.Windows.Forms;
using System.Xml.Linq;

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

        private async void btnAdd_Click(object sender, EventArgs e)
        {
            var newStudent = new Student
            {
                Name = txtName.Text,
                age = int.Parse(txtAge.Text),
            };

            await _students.InsertOneAsync(newStudent);
            toolStripStatusLabel1.Text = "Студент успешно добавлен!";
        }

        private async void btnLoad_Click(object sender, EventArgs e)
        {
            // Фильтр-пустышка (найти всё)
            var filter = Builders<Student>.Filter.Empty;

            // Получаем данные асинхронно
            var list = await _students.Find(filter).ToListAsync();

            // Привязываем список к таблице на форме
            dataGridView1.DataSource = list;
        }

        private async void btnUpdate_Click(object sender, EventArgs e)
        {
            // Допустим, мы меняем возраст студента по его имени
            var filter = Builders<Student>.Filter.Eq(s => s.Name, txtName.Text);
            var update = Builders<Student>.Update.Set(s => s.age, int.Parse(txtAge.Text));

            await _students.UpdateOneAsync(filter, update);
        }

        private async void btnDelete_Click(object sender, EventArgs e)
        {
            // Удаляем студента, у которого Id совпадает с выбранным в таблице
            var id = dataGridView1.CurrentRow.Cells["Id"].Value.ToString();
            var filter = Builders<Student>.Filter.Eq(s => s.Id, id);

            await _students.DeleteOneAsync(filter);
            toolStripStatusLabel1.Text = "Запись удалена";
        }
    }

    [BsonIgnoreExtraElements] // Важнейший атрибут: игнорирует поля в базе, которых нет в этом классе
    public class Student
    {
        [BsonId] // Помечает это поле как первичный ключ (_id)
        [BsonRepresentation(BsonType.ObjectId)] // Позволяет C# работать с ID как со строкой
        [DisplayName("ID записи")] // Заголовок для ID
        public string Id { get; set; }

        [BsonElement("name")] // Явно указываем имя поля в базе (если оно отличается от имени свойства)
        [DisplayName("ФИО студента")] // Вместо "Name"
        public string Name { get; set; }

        [DisplayName("Возраст")]
        public int age { get; set; } // Если имена совпадают, атрибут [BsonElement] не нужен
    }
}
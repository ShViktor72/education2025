using System;
using System.ComponentModel;
using System.Text.Json;
using System.Xml.Linq;

namespace serializeJson
{
    public partial class Form1 : Form
    {
        // Объявляем список здесь, чтобы он был доступен везде в этой форме
        BindingList<Student> students = new BindingList<Student>();

        public Form1()
        {
            InitializeComponent();
            LoadData();

            // Добавление элементов в ListBox
            listBox1.Items.Add("Element 1");
            listBox1.Items.Add("Element 2");
            listBox1.Items.Add("Element 3");
            listBox1.Items.Add("Element 4");
            listBox1.Items.Add("Element 5");
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            List<string> items = new List<string>();

            // Собираем данные из ListBox в список
            foreach (var item in listBox1.Items)
            {
                items.Add(item.ToString());
            }

            // Сериализуем и сохраняем
            string json = JsonSerializer.Serialize(items);
            File.WriteAllText("list_data.json", json);
        }

        private void LoadData()
        {
            // добавим объекты в список
            //students.Add(new Student { Id = 1, Name = "Bill", Age = 22 });
            //students.Add(new Student { Id = 2, Name = "John", Age = 30 });
            //students.Add(new Student { Id = 3, Name = "Alan", Age = 25 });

            // Привязка списка к DataGridView
            dataGridView1.DataSource = students;
        }

        private void btnSaveTable_Click(object sender, EventArgs e)
        {
            var options = new JsonSerializerOptions { WriteIndented = true };

            // Сериализуем весь список, который привязан к таблице
            string json = JsonSerializer.Serialize(students, options);
            File.WriteAllText("students.json", json);

            MessageBox.Show("Данные таблицы сохранены!");
        }

        private void btnLoadTable_Click(object sender, EventArgs e)
        {
            if (File.Exists("students.json"))
            {
                string json = File.ReadAllText("students.json");

                // Десериализуем в обычный список
                var loadedList = JsonSerializer.Deserialize<List<Student>>(json);

                // Очищаем старые данные и добавляем новые
                students.Clear();
                foreach (var s in loadedList) students.Add(s);
                MessageBox.Show("Данные таблицы изменены!");
            }
        }

        private void textBox3_TextChanged(object sender, EventArgs e)
        {

        }

        private void btnSaveData_Click(object sender, EventArgs e)
        {
            // 1. Создаём объект из TextBox'ов
            var profile = new UserProfile
            {
                Name = textBoxName.Text,
                Email = textBoxEmail.Text,
                Phone = textBoxPhone.Text,
            };

            // 2. Сериализуем в JSON
            string json = JsonSerializer.Serialize(profile,
                new JsonSerializerOptions { WriteIndented = true });

            // 3. Сохраняем в файл
            File.WriteAllText("user_profile.json", json);

            MessageBox.Show("Данные сохранены!");
        }

        // Кнопка "Загрузить"
        private void btnLoad_Click(object sender, EventArgs e)
        {
            if (!File.Exists("user_profile.json"))
            {
                MessageBox.Show("Файл с данными не найден");
                return;
            }

            // 1. Читаем JSON из файла
            string json = File.ReadAllText("user_profile.json");

            // 2. Десериализуем в объект
            var profile = JsonSerializer.Deserialize<UserProfile>(json);

            // 3. Заполняем TextBox'ы
            textBoxName.Text = profile.Name;
            textBoxEmail.Text = profile.Email;
            textBoxPhone.Text = profile.Phone;

            MessageBox.Show("Данные загружены!");
        }
    }

    // Класс для хранения данных
    public class UserProfile
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
    }
	
	public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Age { get; set; }
    }
}
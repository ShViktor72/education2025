using Newtonsoft.Json;

namespace converter
{
    public partial class Form1 : Form
    {

        public Form1()
        {
            InitializeComponent();
        }

        decimal usdkzt, usdeur, usdrub, usdgbp, moneyFrom, moneyTo;

        async Task LoadCurrencies()
        {
            string apiKey = "9513c678657f47ac51ce9594fcc2f28c";
            string url = $"http://api.currencylayer.com/live?access_key={apiKey}";
            DateTime currentDateTime = DateTime.Now;
            using (HttpClient client = new HttpClient())
            {
                try
                {
                    string response = await client.GetStringAsync(url);
                    var result = JsonConvert.DeserializeObject<CurrencyLayerResponse>(response);

                    if (result.Success)
                    {
                        usdkzt = result.Quotes["USDKZT"];
                        usdeur = result.Quotes["USDEUR"];
                        usdrub = result.Quotes["USDRUB"];
                        usdgbp = result.Quotes["USDGBP"];
                        //labelInfo.Text = $"Данные получены {currentDateTime}";
                        labelInfoAnimation($"Данные получены {currentDateTime}");
                    }
                    else
                    {
                        //labelInfo.Text = "Ошибка при получении данных.";
                        labelInfoAnimation("Ошибка при получении данных.");
                    }
                }
                catch (Exception ex)
                {
                    //labelInfo.Text = $"Ошибка: {ex.Message}";
                    labelInfoAnimation($"Ошибка: {ex.Message}");
                }
            }
        }

        private async void Form1_Load(object sender, EventArgs e)
        {
            animation();

            // Ожидание завершения загрузки данных
            await LoadCurrencies();

            // Добавление столбцов
            dataGridView1.Columns.Add("valuta", "Валюта");
            dataGridView1.Columns.Add("Kurs", "Курс");

            // Добавление строк
            dataGridView1.Rows.Add("USDKZT", Math.Round(usdkzt, 2).ToString());
            dataGridView1.Rows.Add("USDEUR", Math.Round(usdeur, 2).ToString());
            dataGridView1.Rows.Add("USDRUB", Math.Round(usdrub, 2).ToString());
            dataGridView1.Rows.Add("USDGBP", Math.Round(usdgbp, 2).ToString());

            // Заполнение ComboBox списком валют
            comboBox_From.Items.AddRange(new string[] { "USD", "EUR", "KZT", "RUB", "GBP" });
            comboBox_From.SelectedIndex = 2; // Выбор первого элемента по умолчанию
            comboBox_To.Items.AddRange(new string[] { "USD", "EUR", "KZT", "RUB", "GBP" });
            comboBox_To.SelectedIndex = 0; // Выбор первого элемента по умолчанию

            
        }

        private void comboBox_From_SelectedIndexChanged(object sender, EventArgs e)
        {
            // Получение выбранной валюты
            string selectedCurrency = comboBox_From.SelectedItem.ToString();
            // Отображение курса выбранной валюты
            moneyFrom = DisplayCurrencyRate(selectedCurrency);

        }

        private void comboBox_To_SelectedIndexChanged(object sender, EventArgs e)
        {
            // Получение выбранной валюты
            string selectedCurrency = comboBox_From.SelectedItem.ToString();
            // Отображение курса выбранной валюты
            moneyTo = DisplayCurrencyRate(selectedCurrency);
        }

        private void textBox1_TextChanged(object sender, EventArgs e)
        {
            moneyFrom = Convert.ToDecimal(textBox1.Text);
            if (usdkzt != 0)
                textBox2.Text = Math.Round((moneyFrom / usdkzt), 2).ToString();
        }

        private decimal DisplayCurrencyRate(string currency)
        {
            decimal rate = 0;

            // Получение курса валюты
            switch (currency)
            {
                case "USD":
                    rate = usdkzt; // Пример: курс USD/KZT
                    break;
                case "EUR":
                    rate = usdeur; // Пример: курс USD/EUR
                    break;
                //case "KZT":
                //rate = 1 / usdkzt; // Пример: курс KZT/USD
                //break;
                case "RUB":
                    rate = usdrub; // Пример: курс USD/RUB
                    break;
                case "GBP":
                    rate = usdgbp; // Пример: курс USD/GBP
                    break;
            }
            return rate;
        }

        async void animation()
        {
            // 50 46 156   219,226,233    129 180 77    13 18 8
            while (true)
            {
                for (byte r = 50, g = 46, b = 156; r <= 219 & g <= 226 & b <= 233; r += 13, g += 18, b += 8)
                {
                    label1.ForeColor = Color.FromArgb(r, g, b);
                    await Task.Delay(100); // Задержка на 1 секунду
                }

                for (byte r = 219, g = 226, b = 233; r >= 90 & g >= 46 & b >= 156; r -= 13, g -= 18, b -= 8)
                {
                    label1.ForeColor = Color.FromArgb(r, g, b);
                    await Task.Delay(100); // Задержка на 1 секунду
                }
                label1.ForeColor = Color.FromArgb(50, 46, 156);
                await Task.Delay(100);


            }
        }

        async void labelInfoAnimation(string line)
        {
            char[] info = line.ToCharArray();
            foreach (char c in info)
            {
                labelInfo.Text += c.ToString();
                await Task.Delay(100);
            }

        }
    }

    public class CurrencyLayerResponse
    {
        public bool Success { get; set; }
        public string Terms { get; set; }
        public string Privacy { get; set; }
        public long Timestamp { get; set; }
        public string Source { get; set; }
        public Dictionary<string, decimal> Quotes { get; set; }
    }
}

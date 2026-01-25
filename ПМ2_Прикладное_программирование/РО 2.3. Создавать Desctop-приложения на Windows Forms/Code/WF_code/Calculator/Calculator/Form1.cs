namespace Calculator
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private string currentNumber = "";
        private string firstNumber = "";
        private string operation = "";

        private void button_Click(object sender, EventArgs e)
        {
            Button button = (Button)sender;

            if (char.IsDigit(button.Text[0])) // Если нажата цифра
            {
                currentNumber += button.Text;
                textBox1.Text = currentNumber; // Отображаем на дисплее
            }
            else if (button.Text == "=") // Если нажато равно
            {
                double result = Calculate();
                textBox1.Text = result.ToString();
                firstNumber = result.ToString();
                operation = "";
            }
            else // Если нажат оператор
            {
                if (firstNumber != "")
                {
                    double result = Calculate();
                    firstNumber = result.ToString();
                }
                firstNumber = currentNumber;
                operation = button.Text;
                currentNumber = "";
            }
        }

        private double Calculate()
        {
            double num1 = Convert.ToDouble(firstNumber);
            double num2 = Convert.ToDouble(currentNumber);
            double result = 0;

            switch (operation)
            {
                case "+":
                    result = num1 + num2;
                    break;
                case "-":
                    result = num1 - num2;
                    break;
                case "*":
                    result = num1 * num2;
                    break;
                case "/":
                    if (num2 == 0)
                    {
                        MessageBox.Show("Деление на ноль!");
                        return 0;
                    }
                    result = num1 / num2;
                    break;
            }

            return result;
        }

        private void buttonC_Click(object sender, EventArgs e)
        {
            // Очищаем поля ввода
            textBox1.Text = ""; // Предполагаем, что textBox1 - это поле для вывода результата
            currentNumber = "";
            firstNumber = "";
            operation = "";
        }

        private void buttonComma_Click(object sender, EventArgs e)
        {
            if (!currentNumber.Contains(","))
            {
                currentNumber += ",";
                textBox1.Text = currentNumber;
            }
        }
    }
}

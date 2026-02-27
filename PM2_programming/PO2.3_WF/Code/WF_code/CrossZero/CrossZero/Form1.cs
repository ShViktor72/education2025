using System.Diagnostics.Metrics;
using System.Windows.Forms;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;
using Button = System.Windows.Forms.Button;

namespace CrossZero
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private char[,] matrix = new char[3, 3]; // Игровое поле
        private bool isCrossTurn = true; // Флаг хода крестика
        int n, x, y;
        int countX = 0;
        int countO = 0;


        private void button_Click(object sender, EventArgs e)
        {
            if (!isCrossTurn)
            {
                textBoxX.BackColor = Color.Green;
                textBoxO.BackColor = Color.FromArgb(198, 19, 179);
            }
            else
            {
                textBoxX.BackColor = Color.FromArgb(198, 19, 179);
                textBoxO.BackColor = Color.Green;
            }

            textBoxX.Text = countX.ToString();
            textBoxO.Text = countO.ToString();

            Button clickedButton = (Button)sender; // Приводим отправителя к типу Button
            textBoxX.Text = countX.ToString();
            textBoxO.Text = countO.ToString();
            //textBoxX.Text = clickedButton.Name;
            if (clickedButton.Text == "")
            {
                if (isCrossTurn)
                {
                    clickedButton.Text = "X";
                }
                else
                {
                    clickedButton.Text = "O";
                }
                isCrossTurn = !isCrossTurn;
            }

            n = int.Parse(clickedButton.Name.ToString().Replace("button", ""));
            x = n / 3;
            y = n % 3;
            //textBoxO.Text = $"{x} {y}";
            if (isCrossTurn)
                matrix[x, y] = 'o';
            else
                matrix[x, y] = 'x';

            if (CheckWin('x'))
            {
                label1.Text = "Игрок Х выиграл!";
                countX++;
                textBoxX.Text = countX.ToString();
                DisableButtons();
            }
            if (CheckWin('o'))
            {
                label1.Text = "Игрок О выиграл!";
                countO++;
                textBoxO.Text = countO.ToString();
                DisableButtons();
            }
            //textBoxO.Text = IsmatrixFull().ToString();
            if (IsmatrixFull())
                label1.Text = "     Ничья!";
        }

        bool CheckWin(char c)
        {
            // Проверка горизонтальных рядов
            for (int i = 0; i < 3; i++)
            {
                if (matrix[i, 0] == c && matrix[i, 1] == c && matrix[i, 2] == c)
                    return true;
            }

            // Проверка вертикальных рядов
            for (int i = 0; i < 3; i++)
            {
                if (matrix[0, i] == c && matrix[1, i] == c && matrix[2, i] == c)
                    return true;
            }

            // Проверка диагоналей
            if (matrix[0, 0] == c && matrix[1, 1] == c && matrix[2, 2] == c)
                return true;
            if (matrix[0, 2] == c && matrix[1, 1] == c && matrix[2, 0] == c)
                return true;

            return false; // Если ни одно условие не выполнилось, значит, никто не выиграл

        }

        private bool IsmatrixFull()  // Проверка на ничью
        {
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    if (matrix[i, j] == '\0')
                        return false; // Если хотя бы одна клетка пуста, то игра не закончилась
                }
            }
            return true; // Все клетки заполнены, игра закончилась вничью
        }

        void NewGame()
        {
            // Обновляем текст кнопок
            foreach (Control control in this.Controls)
            {
                if (control is Button button)
                {
                    button.Text = "";
                }
            }
            buttonNew.Text = "Новая игра";
            buttonReset.Text = "Сброс";

            // Обнуляем массив игрового поля
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 3; j++)
                {
                    matrix[i, j] = '\0';
                }
            }
            EnableButtons();
            label1.Text = "     Новая Игра!";
        }

        void Form1_Load_1(object sender, EventArgs e)
        {
            ClearCount();
            if (isCrossTurn)
                textBoxX.BackColor = Color.Green;

        }

        void buttonNew_Click(object sender, EventArgs e)
        {
            NewGame();
        }

        void ClearCount()
        {
            countX = countO = 0;
            textBoxX.Text = countX.ToString();
            textBoxO.Text = countO.ToString();
            label1.Text = "Крестики - Нолики";
        }

        void buttonReset_Click(object sender, EventArgs e)
        {
            ClearCount();
        }

        void DisableButtons()
        { 
            button0.Enabled = false;
            button1.Enabled = false;
            button2.Enabled = false;
            button3.Enabled = false;
            button4.Enabled = false;
            button5.Enabled = false;
            button6.Enabled = false;
            button7.Enabled = false;
            button8.Enabled = false;
            textBoxX.SelectionStart = textBoxX.SelectionLength;
        }

        void EnableButtons()
        {
            button0.Enabled = true;
            button1.Enabled = true;
            button2.Enabled = true;
            button3.Enabled = true;
            button4.Enabled = true;
            button5.Enabled = true;
            button6.Enabled = true;
            button7.Enabled = true;
            button8.Enabled = true;
        }
    }
}

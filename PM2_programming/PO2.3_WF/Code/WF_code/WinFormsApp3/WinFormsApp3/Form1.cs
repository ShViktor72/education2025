namespace WinFormsApp3
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            // устанавливаем фокус на кнопку
            this.ActiveControl = buttonCalc;
            textBoxA.Text = "a = ";
            textBoxB.Text = "b = ";
            textBoxC.Text = "c = ";
            textBoxD.Text = "D = ";
            textBoxX1.Text = "x1 = ";
            textBoxX2.Text = "x2 = ";
        }


        private void textBoxA_Enter(object sender, EventArgs e)
        {
            if (textBoxA.Text == "a = ")
                textBoxA.Text = "";
        }

        private void textBoxB_Enter(object sender, EventArgs e)
        {
            if (textBoxB.Text == "b = ")
                textBoxB.Text = "";
        }

        private void textBoxC_Enter(object sender, EventArgs e)
        {
            if (textBoxC.Text == "c = ")
                textBoxC.Text = "";
        }

        private void buttonCalc_Click(object sender, EventArgs e)
        {
            try
            {
                double a = double.Parse(textBoxA.Text);
                double b = double.Parse(textBoxB.Text);
                double c = double.Parse(textBoxC.Text);

                double d = b * b - 4 * a * c;
                double x1, x2;
                if (d > 0)
                {
                    x1 = (-b - Math.Sqrt(d)) / (2 * a);
                    x2 = (-b + Math.Sqrt(d)) / (2 * a);
                    textBoxD.Text = (a + b + c).ToString();
                    textBoxX1.Text = x1.ToString();
                    textBoxX2.Text = x2.ToString();
                }
                else
                {
                    textBoxD.Text = d.ToString();
                    textBoxX1.Text = "Решений ";
                    textBoxX2.Text = "нет";
                }
            }
            catch (Exception ex)
            {
                Clear();
            }


        }

        private void buttonClear_Click(object sender, EventArgs e)
        {
            Clear();
        }

        private void Clear()
        {
            textBoxA.Text = "a = ";
            textBoxB.Text = "b = ";
            textBoxC.Text = "c = ";
            textBoxD.Text = "D = ";
            textBoxX1.Text = "x1 = ";
            textBoxX2.Text = "x2 = ";
        }
    }
}

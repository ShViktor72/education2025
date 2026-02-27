namespace WinFormsApp4
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void buttonNo_MouseEnter(object sender, EventArgs e)
        {
            ButtonMove();
        }


        private void buttonNo_Click(object sender, EventArgs e)
        {
            ButtonMove();
        }

        void ButtonMove()
        {
            //Point location = buttonNo.Location;
            //label1.Text = $"X={location.X}, Y={location.Y}";
            int[] lsX = { 0, 100, 200, 300, 400, 450 };
            int[] lsY = { 0, 100, 200, 300, 350 };
            Random rnd = new Random();
            int x = lsX[rnd.Next(lsX.Length)];
            int y = lsY[rnd.Next(lsY.Length)];

            buttonNo.Location = new Point(x, y);
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void buttonYes_Click(object sender, EventArgs e)
        {
            // Создаём экземпляр второй формы
            Form2 form2 = new Form2();
            form2.Show();
            //this.Close();
        }
    }
}

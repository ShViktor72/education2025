namespace WinFormsApp3
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            panel1 = new Panel();
            buttonClear = new Button();
            textBoxX1 = new TextBox();
            textBoxX2 = new TextBox();
            textBoxD = new TextBox();
            label4 = new Label();
            buttonCalc = new Button();
            label3 = new Label();
            textBoxB = new TextBox();
            textBoxC = new TextBox();
            textBoxA = new TextBox();
            label2 = new Label();
            label1 = new Label();
            panel1.SuspendLayout();
            SuspendLayout();
            // 
            // panel1
            // 
            panel1.BackColor = Color.FromArgb(7, 79, 240);
            panel1.Controls.Add(buttonClear);
            panel1.Controls.Add(textBoxX1);
            panel1.Controls.Add(textBoxX2);
            panel1.Controls.Add(textBoxD);
            panel1.Controls.Add(label4);
            panel1.Controls.Add(buttonCalc);
            panel1.Controls.Add(label3);
            panel1.Controls.Add(textBoxB);
            panel1.Controls.Add(textBoxC);
            panel1.Controls.Add(textBoxA);
            panel1.Controls.Add(label2);
            panel1.Controls.Add(label1);
            panel1.Dock = DockStyle.Fill;
            panel1.Location = new Point(0, 0);
            panel1.Name = "panel1";
            panel1.Size = new Size(584, 461);
            panel1.TabIndex = 0;
            // 
            // buttonClear
            // 
            buttonClear.BackColor = Color.FromArgb(79, 240, 7);
            buttonClear.Cursor = Cursors.Hand;
            buttonClear.FlatAppearance.BorderColor = Color.FromArgb(3, 64, 30);
            buttonClear.FlatAppearance.MouseDownBackColor = Color.FromArgb(240, 7, 79);
            buttonClear.FlatAppearance.MouseOverBackColor = Color.FromArgb(244, 200, 12);
            buttonClear.FlatStyle = FlatStyle.Flat;
            buttonClear.Font = new Font("Arial", 14.25F, FontStyle.Bold, GraphicsUnit.Point, 204);
            buttonClear.Location = new Point(24, 392);
            buttonClear.Name = "buttonClear";
            buttonClear.Size = new Size(531, 47);
            buttonClear.TabIndex = 11;
            buttonClear.Text = "Очистить все поля";
            buttonClear.UseVisualStyleBackColor = false;
            buttonClear.Click += buttonClear_Click;
            // 
            // textBoxX1
            // 
            textBoxX1.Font = new Font("Arial", 15.75F, FontStyle.Bold, GraphicsUnit.Point, 204);
            textBoxX1.ForeColor = Color.FromArgb(240, 7, 79);
            textBoxX1.Location = new Point(212, 338);
            textBoxX1.Name = "textBoxX1";
            textBoxX1.Size = new Size(162, 32);
            textBoxX1.TabIndex = 10;
            // 
            // textBoxX2
            // 
            textBoxX2.Font = new Font("Arial", 15.75F, FontStyle.Bold, GraphicsUnit.Point, 204);
            textBoxX2.ForeColor = Color.FromArgb(240, 7, 79);
            textBoxX2.Location = new Point(396, 338);
            textBoxX2.Name = "textBoxX2";
            textBoxX2.Size = new Size(159, 32);
            textBoxX2.TabIndex = 9;
            // 
            // textBoxD
            // 
            textBoxD.Font = new Font("Arial", 15.75F, FontStyle.Bold, GraphicsUnit.Point, 204);
            textBoxD.ForeColor = Color.FromArgb(240, 7, 79);
            textBoxD.Location = new Point(24, 338);
            textBoxD.Name = "textBoxD";
            textBoxD.Size = new Size(159, 32);
            textBoxD.TabIndex = 8;
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Font = new Font("Arial", 14.25F, FontStyle.Bold, GraphicsUnit.Point, 204);
            label4.ForeColor = Color.FromArgb(79, 240, 7);
            label4.Location = new Point(240, 286);
            label4.Name = "label4";
            label4.Size = new Size(112, 22);
            label4.TabIndex = 7;
            label4.Text = "Результат:";
            // 
            // buttonCalc
            // 
            buttonCalc.BackColor = Color.FromArgb(79, 240, 7);
            buttonCalc.Cursor = Cursors.Hand;
            buttonCalc.FlatAppearance.BorderColor = Color.FromArgb(3, 64, 30);
            buttonCalc.FlatAppearance.MouseDownBackColor = Color.FromArgb(240, 7, 79);
            buttonCalc.FlatAppearance.MouseOverBackColor = Color.FromArgb(244, 200, 12);
            buttonCalc.FlatStyle = FlatStyle.Flat;
            buttonCalc.Font = new Font("Arial", 14.25F, FontStyle.Bold, GraphicsUnit.Point, 204);
            buttonCalc.Location = new Point(24, 209);
            buttonCalc.Name = "buttonCalc";
            buttonCalc.Size = new Size(531, 47);
            buttonCalc.TabIndex = 6;
            buttonCalc.Text = "Найти корни уравнения";
            buttonCalc.UseVisualStyleBackColor = false;
            buttonCalc.Click += buttonCalc_Click;
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Font = new Font("Arial", 14.25F, FontStyle.Bold, GraphicsUnit.Point, 204);
            label3.ForeColor = Color.FromArgb(79, 240, 7);
            label3.Location = new Point(240, 62);
            label3.Name = "label3";
            label3.Size = new Size(144, 22);
            label3.TabIndex = 5;
            label3.Text = "a*x^2 + b*x + c";
            // 
            // textBoxB
            // 
            textBoxB.Font = new Font("Arial", 15.75F, FontStyle.Bold, GraphicsUnit.Point, 204);
            textBoxB.Location = new Point(212, 141);
            textBoxB.Name = "textBoxB";
            textBoxB.Size = new Size(159, 32);
            textBoxB.TabIndex = 4;
            textBoxB.Enter += textBoxB_Enter;
            // 
            // textBoxC
            // 
            textBoxC.Font = new Font("Arial", 15.75F, FontStyle.Bold, GraphicsUnit.Point, 204);
            textBoxC.Location = new Point(396, 141);
            textBoxC.Name = "textBoxC";
            textBoxC.Size = new Size(159, 32);
            textBoxC.TabIndex = 3;
            textBoxC.Enter += textBoxC_Enter;
            // 
            // textBoxA
            // 
            textBoxA.Font = new Font("Arial", 15.75F, FontStyle.Bold, GraphicsUnit.Point, 204);
            textBoxA.Location = new Point(24, 141);
            textBoxA.Name = "textBoxA";
            textBoxA.Size = new Size(159, 32);
            textBoxA.TabIndex = 2;
            textBoxA.Enter += textBoxA_Enter;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Font = new Font("Arial", 14.25F, FontStyle.Bold, GraphicsUnit.Point, 204);
            label2.ForeColor = Color.FromArgb(79, 240, 7);
            label2.Location = new Point(140, 98);
            label2.Name = "label2";
            label2.Size = new Size(360, 22);
            label2.TabIndex = 1;
            label2.Text = "Введите коэффициенты уравнения:";
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Arial", 14.25F, FontStyle.Bold, GraphicsUnit.Point, 204);
            label1.ForeColor = Color.FromArgb(79, 240, 7);
            label1.Location = new Point(87, 19);
            label1.Name = "label1";
            label1.Size = new Size(476, 22);
            label1.TabIndex = 0;
            label1.Text = "Программа для решения квадратного уравнения";
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(584, 461);
            Controls.Add(panel1);
            Name = "Form1";
            Text = "Quadrate Solution";
            panel1.ResumeLayout(false);
            panel1.PerformLayout();
            ResumeLayout(false);
        }

        #endregion

        private Panel panel1;
        private Label label1;
        private TextBox textBoxA;
        private Label label2;
        private TextBox textBoxX1;
        private TextBox textBoxX2;
        private TextBox textBoxD;
        private Label label4;
        private Button buttonCalc;
        private Label label3;
        private TextBox textBoxB;
        private TextBox textBoxC;
        private Button buttonClear;
    }
}

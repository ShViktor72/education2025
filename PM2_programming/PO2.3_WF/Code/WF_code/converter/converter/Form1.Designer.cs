namespace converter
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
            label1 = new Label();
            comboBox_From = new ComboBox();
            textBox1 = new TextBox();
            dataGridView1 = new DataGridView();
            pictureBox1 = new PictureBox();
            comboBox_To = new ComboBox();
            pictureBox2 = new PictureBox();
            textBox2 = new TextBox();
            labelInfo = new Label();
            ((System.ComponentModel.ISupportInitialize)dataGridView1).BeginInit();
            ((System.ComponentModel.ISupportInitialize)pictureBox1).BeginInit();
            ((System.ComponentModel.ISupportInitialize)pictureBox2).BeginInit();
            SuspendLayout();
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Arial", 14.25F, FontStyle.Bold, GraphicsUnit.Point, 204);
            label1.ForeColor = Color.FromArgb(50, 46, 156);
            label1.Location = new Point(45, 22);
            label1.Name = "label1";
            label1.Size = new Size(177, 22);
            label1.TabIndex = 0;
            label1.Text = "Конвертер валют";
            // 
            // comboBox_From
            // 
            comboBox_From.Font = new Font("Arial", 14.25F, FontStyle.Bold);
            comboBox_From.FormattingEnabled = true;
            comboBox_From.Location = new Point(12, 213);
            comboBox_From.Name = "comboBox_From";
            comboBox_From.Size = new Size(100, 30);
            comboBox_From.TabIndex = 1;
            comboBox_From.SelectedIndexChanged += comboBox_From_SelectedIndexChanged;
            // 
            // textBox1
            // 
            textBox1.Font = new Font("Arial", 14.25F, FontStyle.Bold);
            textBox1.Location = new Point(12, 280);
            textBox1.Name = "textBox1";
            textBox1.Size = new Size(100, 29);
            textBox1.TabIndex = 7;
            textBox1.TextChanged += textBox1_TextChanged;
            // 
            // dataGridView1
            // 
            dataGridView1.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridView1.Location = new Point(12, 47);
            dataGridView1.Name = "dataGridView1";
            dataGridView1.Size = new Size(240, 150);
            dataGridView1.TabIndex = 9;
            // 
            // pictureBox1
            // 
            pictureBox1.Image = Properties.Resources.arrow;
            pictureBox1.Location = new Point(118, 213);
            pictureBox1.Name = "pictureBox1";
            pictureBox1.Size = new Size(30, 39);
            pictureBox1.SizeMode = PictureBoxSizeMode.Zoom;
            pictureBox1.TabIndex = 10;
            pictureBox1.TabStop = false;
            // 
            // comboBox_To
            // 
            comboBox_To.Font = new Font("Arial", 14.25F, FontStyle.Bold);
            comboBox_To.FormattingEnabled = true;
            comboBox_To.Location = new Point(152, 213);
            comboBox_To.Name = "comboBox_To";
            comboBox_To.Size = new Size(100, 30);
            comboBox_To.TabIndex = 11;
            comboBox_To.SelectedIndexChanged += comboBox_To_SelectedIndexChanged;
            // 
            // pictureBox2
            // 
            pictureBox2.Image = Properties.Resources.calculator_equal;
            pictureBox2.Location = new Point(116, 280);
            pictureBox2.Name = "pictureBox2";
            pictureBox2.Size = new Size(30, 39);
            pictureBox2.SizeMode = PictureBoxSizeMode.Zoom;
            pictureBox2.TabIndex = 12;
            pictureBox2.TabStop = false;
            // 
            // textBox2
            // 
            textBox2.Font = new Font("Arial", 14.25F, FontStyle.Bold);
            textBox2.Location = new Point(152, 280);
            textBox2.Name = "textBox2";
            textBox2.Size = new Size(100, 29);
            textBox2.TabIndex = 13;
            // 
            // labelInfo
            // 
            labelInfo.AutoSize = true;
            labelInfo.ForeColor = SystemColors.Control;
            labelInfo.Location = new Point(12, 337);
            labelInfo.Name = "labelInfo";
            labelInfo.Size = new Size(0, 15);
            labelInfo.TabIndex = 14;
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = Color.FromArgb(50, 46, 156);
            ClientSize = new Size(264, 361);
            Controls.Add(labelInfo);
            Controls.Add(textBox2);
            Controls.Add(pictureBox2);
            Controls.Add(comboBox_To);
            Controls.Add(pictureBox1);
            Controls.Add(dataGridView1);
            Controls.Add(textBox1);
            Controls.Add(comboBox_From);
            Controls.Add(label1);
            Name = "Form1";
            Text = "Конвертер валют";
            Load += Form1_Load;
            ((System.ComponentModel.ISupportInitialize)dataGridView1).EndInit();
            ((System.ComponentModel.ISupportInitialize)pictureBox1).EndInit();
            ((System.ComponentModel.ISupportInitialize)pictureBox2).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Label label1;
        private ComboBox comboBox_From;
        private TextBox textBox1;
        private DataGridView dataGridView1;
        private PictureBox pictureBox1;
        private ComboBox comboBox_To;
        private PictureBox pictureBox2;
        private TextBox textBox2;
        private Label labelInfo;
    }
}

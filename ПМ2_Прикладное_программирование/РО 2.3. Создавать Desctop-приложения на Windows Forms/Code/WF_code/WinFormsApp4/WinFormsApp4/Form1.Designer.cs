namespace WinFormsApp4
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
            buttonYes = new Button();
            buttonNo = new Button();
            label1 = new Label();
            SuspendLayout();
            // 
            // buttonYes
            // 
            buttonYes.BackColor = Color.LimeGreen;
            buttonYes.Font = new Font("Arial", 14.25F, FontStyle.Bold);
            buttonYes.Location = new Point(99, 249);
            buttonYes.Name = "buttonYes";
            buttonYes.Size = new Size(149, 82);
            buttonYes.TabIndex = 0;
            buttonYes.Text = "ДА";
            buttonYes.UseVisualStyleBackColor = false;
            buttonYes.Click += buttonYes_Click;
            // 
            // buttonNo
            // 
            buttonNo.BackColor = Color.LimeGreen;
            buttonNo.Font = new Font("Arial", 14.25F, FontStyle.Bold, GraphicsUnit.Point, 204);
            buttonNo.Location = new Point(315, 249);
            buttonNo.Name = "buttonNo";
            buttonNo.Size = new Size(149, 82);
            buttonNo.TabIndex = 1;
            buttonNo.Text = "НЕТ";
            buttonNo.UseVisualStyleBackColor = false;
            buttonNo.Click += buttonNo_Click;
            buttonNo.MouseEnter += buttonNo_MouseEnter;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Arial", 20.25F, FontStyle.Bold, GraphicsUnit.Point, 204);
            label1.Location = new Point(66, 80);
            label1.Name = "label1";
            label1.Size = new Size(458, 32);
            label1.TabIndex = 2;
            label1.Text = "Вы довольны своей зарплатой?";
            // 
            // Form1
            // 
            AutoScaleDimensions = new SizeF(7F, 15F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = Color.FromArgb(0, 192, 192);
            ClientSize = new Size(584, 461);
            Controls.Add(buttonNo);
            Controls.Add(buttonYes);
            Controls.Add(label1);
            Name = "Form1";
            Text = "Salary";
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Button buttonYes;
        private Button buttonNo;
        private Label label1;
    }
}

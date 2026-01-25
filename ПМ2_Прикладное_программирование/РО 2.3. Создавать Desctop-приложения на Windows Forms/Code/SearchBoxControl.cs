using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Text;
using System.Windows.Forms;

namespace usercontrols
{
    public partial class SearchBoxControl : UserControl
    {
        // Событие, которое мы выставим наружу для формы
        public event EventHandler SearchClicked;
        public SearchBoxControl()
        {
            InitializeComponent();
            // Подписываемся на клик внутренней кнопки
            btnSearch.Click += (s, e) => {
                // Генерируем внешнее событие
                SearchClicked?.Invoke(this, EventArgs.Empty);
            };
        }
        // Свойство для получения текста из внутреннего TextBox
        public string SearchText => txtQuery.Text;
    }
}
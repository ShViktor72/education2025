using System;
using System.Collections.Generic;
using System.Text;
using System.Drawing.Drawing2D; // Для сглаживания
using System.ComponentModel;

namespace classcontrol
{
    public class LedIndicator : Control
    {
        private bool _isOn = false;

        // Свойство: включен или выключен свет
        [Category("Appearance")] // свойство - Внешний вид
        [DefaultValue(false)] // Сообщаем дизайнеру значение по умолчанию
        public bool IsOn
        {
            get => _isOn;
            set
            {
                _isOn = value;
                Invalidate(); // Важно! Говорим системе перерисовать элемент
            }
        }

        public LedIndicator()
        {
            // Включаем двойную буферизацию, чтобы не было мерцания
            this.DoubleBuffered = true;
            this.Size = new Size(50, 50); // Размер по умолчанию
        }

        // Главный метод отрисовки
        protected override void OnPaint(PaintEventArgs e)
        {
            base.OnPaint(e);
            Graphics g = e.Graphics;
            // Включаем сглаживание, чтобы круг был ровным, а не "лесенкой"
            g.SmoothingMode = SmoothingMode.AntiAlias;
            // Определяем цвет: если включен — красный, если нет — темно-серый
            Color ledColor = _isOn ? Color.Red : Color.DimGray;
            // Рисуем тело индикатора (заливка круга)
            using (Brush brush = new SolidBrush(ledColor))
            {
                // Рисуем круг, вписанный в границы контрола (с небольшим отступом)
                g.FillEllipse(brush, 2, 2, Width - 5, Height - 5);
            }
            // Рисуем контур (черная рамка)
            using (Pen pen = new Pen(Color.Black, 2))
            {
                g.DrawEllipse(pen, 2, 2, Width - 5, Height - 5);
            }
        }

        // Обработка клика: переключаем состояние
        protected override void OnClick(EventArgs e)
        {
            base.OnClick(e);
            IsOn = !IsOn; // Инвертируем состояние при нажатии
        }
    }
}
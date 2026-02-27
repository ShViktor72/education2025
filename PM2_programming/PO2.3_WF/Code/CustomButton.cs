using System;
using System.ComponentModel;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Windows.Forms;

namespace CustomButton
{
    // Кастомная кнопка со скруглёнными углами.
    public class CustomButton : Control
    {
        // Признак: курсор мыши находится над кнопкой
        private bool _hovered;

        // Признак: кнопка нажата (удерживается левая кнопка мыши)
        private bool _pressed;

        // Радиус скругления углов (по умолчанию)
        private int _cornerRadius = 15;

        // Конструктор кнопки.
        // Устанавливает начальные визуальные параметры и стили отрисовки.
        public CustomButton()
        {
            // Размер кнопки по умолчанию
            Size = new Size(120, 40);

            // Шрифт и цвета
            Font = new Font("Segoe UI", 9f);
            ForeColor = Color.White;
            BackColor = Color.SteelBlue;

            // Позволяет получать фокус с клавиатуры (Tab)
            TabStop = true;

            // Включаем пользовательскую отрисовку и двойную буферизацию
            SetStyle(
                ControlStyles.UserPaint |              // Вся отрисовка выполняется вручную
                ControlStyles.AllPaintingInWmPaint |   // Исключаем мерцание
                ControlStyles.OptimizedDoubleBuffer |  // Двойная буферизация
                ControlStyles.ResizeRedraw,             // Перерисовка при изменении размера
                true
            );
        }

        // Радиус скругления углов кнопки.
        // Отображается в дизайнере Visual Studio.
        [Category("Appearance")]
        [DefaultValue(15)]
        public int CornerRadius
        {
            get => _cornerRadius;
            set
            {
                // Запрещаем отрицательные значения
                _cornerRadius = Math.Max(0, value);

                // Обновляем форму контрола
                UpdateRegion();

                // Запрашиваем перерисовку
                Invalidate();
            }
        }

        // Вызывается при изменении размеров кнопки.
        // Необходимо пересчитать Region, иначе скругление будет некорректным.
        protected override void OnSizeChanged(EventArgs e)
        {
            base.OnSizeChanged(e);
            UpdateRegion();
        }

        // Основной метод пользовательской отрисовки.
        protected override void OnPaint(PaintEventArgs e)
        {
            base.OnPaint(e);

            // Включаем сглаживание
            e.Graphics.SmoothingMode = SmoothingMode.AntiAlias;

            // Определяем цвет фона в зависимости от состояния кнопки
            Color backColor = BackColor;

            if (_pressed)
                backColor = ControlPaint.Dark(backColor);
            else if (_hovered)
                backColor = ControlPaint.Light(backColor);

            // Создаём путь со скруглёнными углами и закрашиваем его
            using (var path = CreateRoundedPath(ClientRectangle, GetEffectiveRadius()))
            using (var brush = new SolidBrush(backColor))
            {
                e.Graphics.FillPath(brush, path);
            }

            // Отрисовка текста по центру кнопки
            TextRenderer.DrawText(
                e.Graphics,
                Text,
                Font,
                ClientRectangle,
                ForeColor,
                TextFormatFlags.HorizontalCenter |
                TextFormatFlags.VerticalCenter
            );
        }

        // Обновляет Region контрола.
        // Благодаря этому кнопка имеет реально скруглённую форму,
        // а не только визуальную имитацию.
        private void UpdateRegion()
        {
            using (var path = CreateRoundedPath(ClientRectangle, GetEffectiveRadius()))
            {
                Region = new Region(path);
            }
        }

        // Вычисляет допустимый радиус скругления,
        // чтобы он не превышал половину ширины или высоты кнопки.
        private int GetEffectiveRadius()
        {
            return Math.Min(
                _cornerRadius,
                Math.Min(Width, Height) / 2
            );
        }

        // Мышь вошла в пределы кнопки.
        protected override void OnMouseEnter(EventArgs e)
        {
            _hovered = true;
            Invalidate();
            base.OnMouseEnter(e);
        }

        // Мышь покинула кнопку.
        protected override void OnMouseLeave(EventArgs e)
        {
            _hovered = false;
            _pressed = false;
            Invalidate();
            base.OnMouseLeave(e);
        }

        // Нажатие кнопки мыши.
        protected override void OnMouseDown(MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Left)
            {
                _pressed = true;
                Invalidate();
            }
            base.OnMouseDown(e);
        }

        // Отпускание кнопки мыши.
        // Генерирует событие Click.
        protected override void OnMouseUp(MouseEventArgs e)
        {
            if (_pressed)
            {
                _pressed = false;
                Invalidate();

                // Ручной вызов события Click
                OnClick(EventArgs.Empty);
            }
            base.OnMouseUp(e);
        }

        // Создаёт GraphicsPath для прямоугольника
        // со скруглёнными углами.
        private GraphicsPath CreateRoundedPath(Rectangle rect, int radius)
        {
            GraphicsPath path = new GraphicsPath();

            // Если радиус равен 0 — обычный прямоугольник
            if (radius <= 0)
            {
                path.AddRectangle(rect);
                return path;
            }

            int d = radius * 2;

            // Добавляем дуги по всем углам
            path.AddArc(rect.Left, rect.Top, d, d, 180, 90);
            path.AddArc(rect.Right - d, rect.Top, d, d, 270, 90);
            path.AddArc(rect.Right - d, rect.Bottom - d, d, d, 0, 90);
            path.AddArc(rect.Left, rect.Bottom - d, d, d, 90, 90);

            path.CloseFigure();

            return path;
        }
    }
}

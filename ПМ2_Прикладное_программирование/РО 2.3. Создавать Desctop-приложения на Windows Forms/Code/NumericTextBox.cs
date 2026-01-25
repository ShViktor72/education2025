using System;
using System.Collections.Generic;
using System.Text;

namespace usercontrols
{
    // Наследуемся от TextBox, чтобы получить все его свойства 
    public class NumericTextBox : TextBox
    {
        protected override void OnKeyPress(KeyPressEventArgs e)
        {
            // Вызываем базовый метод, чтобы стандартные функции работали
            base.OnKeyPress(e);

            // Проверяем: если символ НЕ цифра И НЕ клавиша Backspace (удаление)
            if (!char.IsDigit(e.KeyChar) && e.KeyChar != (char)Keys.Back)
            {
                // Устанавливаем флаг "Обработано". 
                // Символ будет заблокирован и не появится в поле.
                e.Handled = true;
            }
        }
    }
}
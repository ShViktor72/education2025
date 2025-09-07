// Example 1
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    const data = { id: 1, name: 'Sample Data' };
    const success = true; // Имитируем успешное завершение

    if (success) {
      resolve(data); // Успех
    } else {
      reject(new Error('Failed to fetch data')); // Ошибка
    }
  }, 2000); // Задержка 2 секунды
});


fetchData
  .then(result => {
    // Этот код выполняется, если промис успешен
    console.log('Данные успешно получены:', result);
    result.name = "New data";
    return result; // Возвращает новый промис с этим значением
  })
  .then(newValue => {
    // Этот код получает 'Новое значение' из предыдущего then
    console.log('Продолжение цепочки:', newValue);
  })
  .catch(error => {console.log('Error: ', error)})
  .finally(() => {
    // Этот код выполнится всегда
    // Закрываем соединение с БД
    console.log('Операция завершена.');
  })
  
  
// Example 2

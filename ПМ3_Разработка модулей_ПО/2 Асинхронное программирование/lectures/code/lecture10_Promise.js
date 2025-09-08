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
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = Math.random() > 0.3; // 70% успеха
        if (success) resolve("Успех!");
        else reject("Ошибка!");
    }, 1000);
});

promise
    .then((result) => { console.log("Результат:", result); })
    .catch((error) => { console.error("Ошибка:", error); })
    .finally(() => { console.log("Завершено"); });

// Example 3
// пример использования цепочки then с передачей измененных данных
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = Math.random() > 0.3; // 70% успеха
        if (success) resolve(5); // Начальное значение
        else reject("Ошибка!");
    }, 1000);
});

promise
    .then((value) => {
        console.log("Начальное значение:", value);
        return value * 2; // Увеличиваем значение в 2 раза
    })
    .then((newValue) => {
        console.log("Увеличенное значение:", newValue);
        return newValue + 3; // Добавляем 3
    })
    .then((finalValue) => {
        console.log("Финальное значение:", finalValue);
    })
    .catch((error) => {
        console.error("Ошибка:", error);
    })
    .finally(() => {
        console.log("Завершено");
    });
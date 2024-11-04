# Выполнение тестового задания

### Требования:
Чтобы запустить приложение, на Вашем ПК должен быть установлен Docker.

### Порядок действий:
1. Склонировать этот проект себе:

``` git clone https://github.com/mant1ssa/moiClass.git ```

2. Запустить Docker на ПК
3. Открыть консоль в папкуе с проектом
4. Ввести команды друг за другом

``` docker compose build ```

```docker compose up ```

Приложение запустит два контейнера, один запустит БД, второй по порту 5000 будет слушать запросы по адресу http://localhost:5000/api/lesson
Так же он ждет строку запроса (http://localhost:5000/api/lesson?date=2019-09-03,2019-09-04&status=1&teachersId=[3, 4]&studentsCount&page=2&lessonsPerPage=10)
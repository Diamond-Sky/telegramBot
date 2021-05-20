const TelegramBot = require('node-telegram-bot-api'); // подключаем node-telegram-bot-api

const token = '1814636486:AAGW58luC5d76pmYRwlaTMIfCGqcX3B0P7s';

const bot = new TelegramBot(token,{polling: true});

//клавиатура видео
const keyboardVideo = [
    [
        {
            text: 'Презентация услуги',
            url: 'https://drive.google.com/file/d/1O05wQJ9DFj1Pzglta5SK5BvQ1XPaAxQb/view?usp=sharing'
        }
    ]
]

//клавиатура скрипты
const keyboardScript = [
    [
        {
            text: 'Первый звонок собственнику',
            url: 'https://drive.google.com/file/d/13z6zgwN1ujDjmhPg1gzqfhdwdsfC3Gom/view?usp=sharing'
        }
    ],
    [
        {
            text: 'Назначение встречи для презентации',
            url: 'https://docs.google.com/document/d/1TU71xY3n3RXt33DWg-MKtnHO2scOnwFsm5KAVFMV8Zw/edit?usp=sharing'
        }
    ],
    [
        {
            text: 'Входящий звонок по рекламе объекта',
            url: 'https://drive.google.com/file/d/14buylgB9QgLTfety9JSPt7renQiyQjIB/view?usp=sharing'
        }
    ]
]

//конфиг клавиатуры
const keyboard = [
    [
      {
        text: 'Хочу скрипт', // текст на кнопке
        callback_data: 'moreKeks' // данные для обработчика событий
      }
    ],
    [
        {
          text: 'Хочу видео',
          callback_data: 'morePes'
        }
    ],
    [
        {
          text: 'Хочу проходить курсы',
          url: 'https://edu.century21.ru/' //внешняя ссылка
        }
      ]
  ];

// обработчик события присылания нам любого сообщения
bot.on('message', (msg) => {
  const chatId = msg.chat.id; //получаем идентификатор диалога, чтобы отвечать именно тому пользователю, который нам что-то прислал

  // отправляем сообщение
  bot.sendMessage(chatId, 'Привет, Друг! чего хочешь?', { // прикрутим клаву
        reply_markup: {
            inline_keyboard: keyboard
        }
    });
});

// обработчик событий нажатий на клавиатуру
bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;

    if(!query.data) {
        bot.sendMessage(chatId, 'Непонятно, давай попробуем ещё раз?', { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboard
            }
        });
    }

    if (query.data === 'moreKeks') { // если нужен скрипт
        bot.sendMessage(chatId, 'Какой скрипт хочешь?', { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboardScript
            }
        });
    }

    if (query.data === 'morePes') { // если нужно видео
        bot.sendMessage(chatId, 'Какое видео хочешь?', { // прикрутим клаву
            reply_markup: {
                inline_keyboard: keyboardVideo
            }
        });
    }
  });
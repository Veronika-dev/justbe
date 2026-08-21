from telegram import (
    Update,
    ReplyKeyboardMarkup,
    ReplyKeyboardRemove,
)
from telegram.ext import (
    Application,
    CommandHandler,
    MessageHandler,
    ContextTypes,
    ConversationHandler,
    filters,
)

import os
from dotenv import load_dotenv

load_dotenv()

BOT_TOKEN = os.getenv("BOT_TOKEN")
ADMIN_ID = int(os.getenv("ADMIN_ID"))


# Состояния диалога
(
    MENU,
    BUG_DESCRIPTION,
    BUG_SYSTEM,
    BUG_SCREENSHOT,
    IMPROVEMENT_TEXT,
    CONTACT_TEXT,
    CONFIRM,
) = range(7)


main_keyboard = ReplyKeyboardMarkup(
    [
        ["Сообщить об ошибке"],
        ["Предложить улучшение"],
        ["Связаться с нами"],
    ],
    resize_keyboard=True,
)

skip_keyboard = ReplyKeyboardMarkup(
    [["Пропустить"]],
    resize_keyboard=True,
)

confirm_keyboard = ReplyKeyboardMarkup(
    [
        ["Отправить"],
        ["Отменить"],
    ],
    resize_keyboard=True,
)


async def start(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE,
):
    context.user_data.clear()

    await update.message.reply_text(
        "Привет! Выбери, что ты хочешь сделать:",
        reply_markup=main_keyboard,
    )

    return MENU


async def menu(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE,
):
    text = update.message.text

    if text == "Сообщить об ошибке":
        context.user_data.clear()
        context.user_data["type"] = "bug"

        await update.message.reply_text(
            "Спасибо за участие в развитии проекта! 💜\n\n"
            "Чтобы мы быстрее могли исправить проблему, "
            "ответь, пожалуйста, на несколько вопросов.\n\n"
            "1. Что тебя беспокоит?\n"
            "Опиши, что произошло и что ты делал перед этим.",
            reply_markup=ReplyKeyboardRemove(),
        )

        return BUG_DESCRIPTION

    if text == "Предложить улучшение":
        context.user_data.clear()
        context.user_data["type"] = "improvement"

        await update.message.reply_text(
            "Спасибо, что помогаешь делать проект лучше! 💜\n\n"
            "Расскажи, пожалуйста, что ты хотел бы "
            "изменить или добавить.",
            reply_markup=ReplyKeyboardRemove(),
        )

        return IMPROVEMENT_TEXT

    if text == "Связаться с нами":
        context.user_data.clear()
        context.user_data["type"] = "contact"

        await update.message.reply_text(
            "Напиши свой вопрос или сообщение.",
            reply_markup=ReplyKeyboardRemove(),
        )

        return CONTACT_TEXT

    await update.message.reply_text(
        "Выбери один из вариантов:",
        reply_markup=main_keyboard,
    )

    return MENU


# ----------------------------
# Ошибка
# ----------------------------

async def bug_description(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE,
):
    context.user_data["description"] = update.message.text

    await update.message.reply_text(
        "2. Какой операционной системой и браузером "
        "ты пользуешься?\n\n"
        "Например: macOS + Safari или Windows 11 + Chrome."
    )

    return BUG_SYSTEM

screenshot_keyboard = ReplyKeyboardMarkup(
    [
        ["Готово"],
        ["Пропустить"],
    ],
    resize_keyboard=True,
)

async def bug_system(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE,
):
    context.user_data["system"] = update.message.text
    context.user_data["screenshots"] = []

    await update.message.reply_text(
        "3. Если можешь, приложи скриншоты проблемы.\n\n"
        "Можно отправить несколько изображений подряд.\n"
        "Когда закончишь — нажми «Готово».\n\n"
        "Если скриншотов нет — нажми «Пропустить».",
        reply_markup=screenshot_keyboard,
    )

    return BUG_SCREENSHOT


async def bug_screenshot(
        update: Update,
        context: ContextTypes.DEFAULT_TYPE,
):
    # Пользователь отправил фото
    if update.message.photo:
        file_id = update.message.photo[-1].file_id

        context.user_data["screenshots"].append(file_id)

        count = len(context.user_data["screenshots"])

        await update.message.reply_text(
            f"Скриншот добавлен ({count}).\n\n"
            "Можешь отправить ещё или нажать «Готово».",
            reply_markup=screenshot_keyboard,
        )

        return BUG_SCREENSHOT

    # Скриншотов нет
    if update.message.text == "Пропустить":
        context.user_data["screenshots"] = []

    # Скриншоты уже добавлены
    elif update.message.text == "Готово":
        if not context.user_data["screenshots"]:
            await update.message.reply_text(
                "Сначала приложи хотя бы один скриншот "
                "или нажми «Пропустить».",
                reply_markup=screenshot_keyboard,
            )
            return BUG_SCREENSHOT

    else:
        await update.message.reply_text(
            "Отправь изображение или нажми «Готово» / «Пропустить».",
            reply_markup=screenshot_keyboard,
        )
        return BUG_SCREENSHOT

    description = context.user_data["description"]
    system = context.user_data["system"]
    screenshots = context.user_data["screenshots"]

    preview = (
        "Проверь обращение:\n\n"
        "🐛 Сообщение об ошибке\n\n"
        f"1. Проблема:\n{description}\n\n"
        f"2. Система и браузер:\n{system}\n\n"
        f"3. Скриншоты: {len(screenshots)}"
    )

    await update.message.reply_text(
        preview,
        reply_markup=confirm_keyboard,
    )

    return CONFIRM


# ----------------------------
# Улучшение
# ----------------------------

async def improvement(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE,
):
    context.user_data["message"] = update.message.text

    await update.message.reply_text(
        "Проверь обращение:\n\n"
        "💡 Предложение по улучшению\n\n"
        f"{update.message.text}",
        reply_markup=confirm_keyboard,
    )

    return CONFIRM


# ----------------------------
# Связаться
# ----------------------------

async def contact(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE,
):
    context.user_data["message"] = update.message.text

    await update.message.reply_text(
        "Проверь сообщение:\n\n"
        f"{update.message.text}",
        reply_markup=confirm_keyboard,
    )

    return CONFIRM


# ----------------------------
# Финальная отправка
# ----------------------------

async def confirm(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE,
):
    if update.message.text == "Отменить":
        context.user_data.clear()

        await update.message.reply_text(
            "Обращение отменено.",
            reply_markup=main_keyboard,
        )

        return MENU

    if update.message.text != "Отправить":
        await update.message.reply_text(
            "Нажми «Отправить» или «Отменить».",
            reply_markup=confirm_keyboard,
        )
        return CONFIRM

    user = update.effective_user

    username = (
        f"@{user.username}"
        if user.username
        else "не указан"
    )

    request_type = context.user_data["type"]

    user_info = (
        f"👤 {user.full_name}\n"
        f"Username: {username}\n"
        f"Telegram ID: {user.id}"
    )

    if request_type == "bug":
        text = (
            "🐛 НОВАЯ ОШИБКА\n\n"
            f"{user_info}\n\n"
            "1. Что произошло:\n"
            f"{context.user_data['description']}\n\n"
            "2. ОС и браузер:\n"
            f"{context.user_data['system']}"
        )

        await context.bot.send_message(
            chat_id=ADMIN_ID,
            text=text,
        )

        screenshots = context.user_data.get("screenshots", [])

        for i, screenshot in enumerate(screenshots, start=1):
            await context.bot.send_photo(
                chat_id=ADMIN_ID,
                photo=screenshot,
                caption=f"Скриншот {i} к обращению",
            )

    elif request_type == "improvement":
        await context.bot.send_message(
            chat_id=ADMIN_ID,
            text=(
                "💡 ПРЕДЛОЖЕНИЕ ПО УЛУЧШЕНИЮ\n\n"
                f"{user_info}\n\n"
                f"{context.user_data['message']}"
            ),
        )

    elif request_type == "contact":
        await context.bot.send_message(
            chat_id=ADMIN_ID,
            text=(
                "💬 НОВОЕ СООБЩЕНИЕ\n\n"
                f"{user_info}\n\n"
                f"{context.user_data['message']}"
            ),
        )

    context.user_data.clear()

    await update.message.reply_text(
        "Спасибо! Сообщение отправлено 💜\n\n"
        "Если понадобится что-то уточнить, "
        "мы свяжемся с тобой.",
        reply_markup=main_keyboard,
    )

    return MENU


async def cancel(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE,
):
    context.user_data.clear()

    await update.message.reply_text(
        "Обращение отменено.",
        reply_markup=main_keyboard,
    )

    return MENU


conversation = ConversationHandler(
    entry_points=[
        CommandHandler("start", start),
    ],
    states={
        MENU: [
            MessageHandler(
                filters.TEXT & ~filters.COMMAND,
                menu,
            )
        ],

        BUG_DESCRIPTION: [
            MessageHandler(
                filters.TEXT & ~filters.COMMAND,
                bug_description,
            )
        ],

        BUG_SYSTEM: [
            MessageHandler(
                filters.TEXT & ~filters.COMMAND,
                bug_system,
            )
        ],

        BUG_SCREENSHOT: [
            MessageHandler(
                filters.PHOTO
                | (filters.TEXT & ~filters.COMMAND),
                bug_screenshot,
            )
        ],

        IMPROVEMENT_TEXT: [
            MessageHandler(
                filters.TEXT & ~filters.COMMAND,
                improvement,
            )
        ],

        CONTACT_TEXT: [
            MessageHandler(
                filters.TEXT & ~filters.COMMAND,
                contact,
            )
        ],

        CONFIRM: [
            MessageHandler(
                filters.TEXT & ~filters.COMMAND,
                confirm,
            )
        ],
    },
    fallbacks=[
        CommandHandler("start", start),
        CommandHandler("cancel", cancel),
    ],
)


app = Application.builder().token(BOT_TOKEN).build()

app.add_handler(conversation)

app.run_polling()

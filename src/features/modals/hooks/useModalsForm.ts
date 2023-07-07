import { FormInputValues, useAppForm, ValidateFieldsType } from 'common'
import { useAppSelector } from 'app'
import { modalStateSelector } from 'features/modals/modals.selector'
import { useCallback } from 'react'

/**
 * Кастомный хук для работы с формой в модальных окнах.
 *
 * @param {Function} onSubmit - Функция, вызываемая при сабмите формы. Принимает объект данных формы.
 * @param {ValidateFieldsType[]} [validateFields] - Массив полей, подлежащих валидации.
 * @returns {Object} - Объект, содержащий функции и свойства для работы с формой в модальных окнах.
 * @property {Object} modalState - Состояние модального окна.
 * @property {Function} register - Функция регистрации полей формы.
 * @property {Object} errors - Объект, содержащий ошибки валидации для полей формы.
 * @property {Function} handleSubmit - Функция обработки сабмита формы.
 * @property {Function} onSubmitHandler - Обработчик сабмита формы, вызывает переданную функцию onSubmit и сбрасывает значения полей формы.
 * @property {Object} control - Объект, содержащий методы для управления значениями формы.
 */

export const useModalsForm = (
    onSubmit: (data: FormInputValues) => void,
    validateFields?: ValidateFieldsType[]
) => {
    const modalState = useAppSelector(modalStateSelector)
    const { register, errors, reset, handleSubmit, control } = useAppForm(validateFields)

    const onSubmitHandler = useCallback(
        (data: FormInputValues) => {
            onSubmit(data)
            reset()
        },
        [onSubmit, reset]
    )

    return {
        modalState,
        register,
        errors,
        handleSubmit,
        onSubmitHandler,
        control,
    }
}

import { thunkErrorHandler } from '../thunkErrorHandler'

describe('thunkErrorHandler', () => {
    it('should handle AxiosError with response data', () => {
        const axiosError = {
            response: {
                data: {
                    error: 'Sample error message',
                },
            },
            isAxiosError: true,
        }

        const result = thunkErrorHandler(axiosError)

        expect(result).toBe('Sample error message')
    })

    it('should handle AxiosError without response data', () => {
        const axiosError = {
            isAxiosError: true,
            message: 'Some error',
        }

        const result = thunkErrorHandler(axiosError)
        expect(result).toBe('Some error')
    })

    it('should handle generic Error', () => {
        const genericError = new Error('Sample error message')

        const result = thunkErrorHandler(genericError)

        expect(result).toBe('Some error Sample error message')
    })
})

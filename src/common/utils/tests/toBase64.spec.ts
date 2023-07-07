import { convertFileToBase64 } from '../toBase64'

describe('convertFileToBase64', () => {
    it('should convert the file to base64 and call the callback with the result', () => {
        const file = new File(['Test content'], 'test.txt', { type: 'text/plain' })
        const expectedResult = 'data:text/plain;base64,VGVzdCBjb250ZW50'

        convertFileToBase64(file, value => expect(value).toBe(expectedResult))
    })

    it('should handle empty file and call the callback with an empty result', () => {
        // Arrange
        const file = new File([], 'empty.txt', { type: 'text/plain' })
        const expectedEmptyResult = 'data:text/plain;base64,'

        convertFileToBase64(file, result => expect(result).toBe(expectedEmptyResult))
    })
})

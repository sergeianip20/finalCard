import * as React from 'react'
import { ChangeEvent, memo } from 'react'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import Box from '@mui/material/Box'
import { UseFormRegister } from 'react-hook-form/dist/types/form'
import { FieldErrors } from 'react-hook-form'
import { FormInputValues, convertFileToBase64 } from 'common'
import noFile from 'assets/img/no-file.svg'

type EditorPacksModalPropsType = {
    packName: string
    errors: FieldErrors<FormInputValues>
    register: UseFormRegister<FormInputValues>
    img: string
    setImg: (img: string) => void
    defaultImg?: string
}
export const EditorPacksModal: React.FC<EditorPacksModalPropsType> = memo(
    ({ register, errors, packName, img, setImg, defaultImg }) => {
        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.currentTarget.files) convertFileToBase64(e.currentTarget.files[0], setImg)
        }

        return (
            <>
                <TextField
                    defaultValue={packName}
                    variant='standard'
                    label='Name Pack'
                    margin='normal'
                    error={!!errors.textInput}
                    helperText={`${errors.textInput ? errors.textInput.message : ''}`}
                    {...register('textInput')}
                />
                <Box component={'label'} sx={{ cursor: 'pointer', margin: '10px 0' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        Pack images:
                        <DriveFolderUploadIcon />
                        <input
                            type={'file'}
                            accept={'image/*'}
                            hidden
                            {...register('packImg', {
                                onChange: onChange,
                            })}
                        />
                    </Box>
                    <div
                        style={{
                            margin: '16px 0',
                            height: '100px',
                            background: `url(${
                                img || defaultImg || noFile
                            }) no-repeat center/contain`,
                        }}
                    />
                </Box>
                <FormControlLabel
                    sx={{ p: '30px 0' }}
                    label={'Private pack'}
                    control={<Checkbox value={true} {...register('private')} />}
                />
            </>
        )
    }
)

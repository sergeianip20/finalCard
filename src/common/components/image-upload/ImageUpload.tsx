import React, { ChangeEvent, FC, memo } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'
import { UseFormRegister } from 'react-hook-form/dist/types/form'
import Box from '@mui/material/Box'
import noFile from 'assets/img/no-file.svg'
import { convertFileToBase64 } from 'common/utils'
import { FormInputValues } from 'common/hooks'

type ImageUploadPropsType = {
    title: string
    img: string | null
    register: UseFormRegister<FormInputValues>
    inputName: 'questionImg' | 'answerImg'
    setPreviewState: (value: string) => void
}

export const ImageUpload: FC<ImageUploadPropsType> = memo(
    ({ title, img, register, inputName, setPreviewState }) => {
        const onChange = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length) {
                const file = e.target.files[0]
                if (file.size < 4000000) {
                    convertFileToBase64(file, (img: string) => {
                        setPreviewState(img)
                    })
                } else {
                    console.error('Error: ', 'the file is too large!')
                }
            }
        }

        return (
            <Grid container spacing={2} rowSpacing={2} sx={{ mt: '1px' }}>
                <Grid item md={6}>
                    <Typography>{title}</Typography>
                </Grid>
                <Grid item md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Box component={'label'} sx={{ cursor: 'pointer' }}>
                        <DriveFolderUploadIcon />
                        <input
                            type={'file'}
                            hidden
                            accept={'image/*'}
                            {...register(inputName, {
                                onChange: onChange,
                            })}
                        />
                    </Box>
                </Grid>
                <Grid
                    item
                    md={12}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: '25px',
                        height: '100px',
                    }}
                >
                    {img ? (
                        <img src={img} alt='card img' style={{ width: '100px' }} />
                    ) : (
                        <img style={{ width: '35px' }} src={noFile} alt='no-file' />
                    )}
                </Grid>
            </Grid>
        )
    }
)

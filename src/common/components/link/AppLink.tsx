import { styled } from '@mui/material/styles'

type AppLinkPropsType = {
    colorText?: string
    align?: string
    justifyContent?: string
    fontWeight?: number
}

export const AppLink = styled('span')<AppLinkPropsType>`
    display: flex;
    justify-content: ${({ justifyContent }) => justifyContent || 'center'};
    width: 100%;
    a {
        color: ${({ colorText }) => colorText || '#366EFF'};
        font-weight: ${({ fontWeight }) => fontWeight || 400};
        line-height: 24px;
        font-size: 16px;
        text-align: ${({ align }) => align || 'center'};
    }
`

import styled from 'styled-components'


export const Row = styled.div<{gap?: string}>`
    display: flex;
    align-items: center;
    gap: ${({gap}) => gap};
    @media (max-width: 572px){
        justify-content: center;
    }
`

export const RowBetween = styled.div<{gap?: string}>`
    display: flex;
    justify-content: space-between;
    gap: ${({gap}) => gap};
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`
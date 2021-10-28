import styled from 'styled-components'

export const PageHeader = styled.div`
    height: 75px;
    background: #EEF1F6;
    box-shadow: ${props => (props.images && props.images.length) ? '' : 'inset 0px -8px 8px -10px gray'};
    transition: all .5s;
`

export const PageTitle = styled.span`
    line-height: 1.2;
    letter-spacting: 0;
    position: absolute;
    left: 0;
    top: 0;
    padding: 24px 48px;
    color: #151E29;
    font-size: 24px;
    font-weight: 700;
    font-style: normal;
`

export const Title = styled.div`
    margin-bottom: 20px;
    font-size: 48px;
    line-height: 1.5;
    font-weight: 700;
`

export const HeaderTitleWrapper = styled.span`
    position: absolute;
    right: 0;
    top: 0;
    padding: 24px 48px;
`

export const Loader = styled.div`
    position: absolute;
    top: calc(100vh - .65 * 100vh);
    left: calc(50vw);
    border: 16px solid #f3f3f3; /* Light grey */
    border-top: 16px solid #3498db; /* Blue */
    border-radius: 50%;
    width: 120px;
    height: 120px;
    animation: spin 2s linear infinite;
`

export const SearchBarWrapper = styled.div`
    top: 0;
`

export const ErrorMessage = styled.div`
    margin-top: 8px;
    font-size: 12px;
    color: red;
`

export const SearchBar = styled.input`
    padding: 6px 14px;
    width: 300px;
    margin: 0px 8px;
    border-radius: 5px;
    outline: none;
    border: 1px solid gray;
    line-height: 1.75;
    transition: all .5s;
    font-size: 20px;
`

export const DefaultButton = styled.button`
    background-color: #018BFF;
    padding: 12px 28px;
    border-radius: 5px;
    color: #FFFFFF;
    font-family: Nunito Sans, Helvetica Neue;
    font-size: 14px;
    font-weight: 700;
    border: 1px solid transparent;
    cursor: pointer;
`

export const DefaultBody = styled.div`
    background-color: white;
    position: absolute;
    left: calc(50% - 180px);
    top: 360px;
    transition: all .5s;
`

export const ImageGrid = styled.div`
    height: calc(100vh - 75px);
    overflow: scroll;
    display: grid;
    grid-template-columns: repeat(auto-fill, 240px);
    grid-row-gap: 10px;
    grid-auto-rows: 10px;
    width: ${props => props.width > 1200 ? '1200px' : props.width};
    margin: auto;
    justify-content: center;
`

export const Image = styled.div`
    margin: 10px;
    grid-row-end: span ${props => props.height};
`

export const ImageModalBackground = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    overflow: none;
    background: black;
    opacity: .7;
`

export const ImageModal = styled.div`
    position: absolute;
    top: calc(50vh - 340px);
    left: calc(50vw - 290px);
    margin: 64px;
`
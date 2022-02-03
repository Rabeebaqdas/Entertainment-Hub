import React from 'react'
import Pagination from "@material-ui/lab/Pagination";
import { createTheme,ThemeProvider } from '@material-ui/core/styles';
const darkTheme = createTheme({
    palette:{
        type:"dark",
    }
})


 const CustomPagination = ({setpage , numOfPages=20}) => {
     const handlePageChange = (page) => {
         setpage(page);
         window.scroll(0,0);
     }
    return (
        <div
        style={{
            width:"100%",
            display:"flex",
            justifyContent:"center",
            marginTop:10
        }}>
            <ThemeProvider theme = {darkTheme}>
            <Pagination count={numOfPages} onClick={(e)=>{handlePageChange(e.target.textContent)}}
            hideNextButton
            hidePrevButton
            color="primary"
            />
            </ThemeProvider>
        </div>
    )
}
export default CustomPagination;

